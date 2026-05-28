import React, { useState, useEffect, useRef } from "react";
import { 
  Search, 
  Send, 
  Phone, 
  Mail, 
  CheckCircle2, 
  MoreVertical, 
  User, 
  MessageSquare,
  ChevronLeft,
  Loader2,
  ShieldCheck,
  Clock
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import io from "socket.io-client";

const socket = io(`${window.location.origin}`);

const Messages = () => {
  const [conversations, setConversations] = useState([]);
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [chatLoading, setChatLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  const userId = userInfo?._id;

  // Real-time listener
  useEffect(() => {
    socket.on("receive_message", (data) => {
      if (selectedConversation && data.conversationId === selectedConversation._id) {
        setMessages((prev) => [...prev, data]);
      }
      // Refresh inbox to show last message
      fetchConversations();
    });

    socket.on("new_message_notification", (data) => {
       if (data.to.includes(userId)) {
          fetchConversations();
       }
    });

    return () => {
      socket.off("receive_message");
      socket.off("new_message_notification");
    };
  }, [selectedConversation, userId]);

  useEffect(() => {
    fetchConversations();
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const fetchConversations = async () => {
    try {
      const response = await fetch(`${window.location.origin}/api/messages/conversations`, {
        headers: { Authorization: `Bearer ${userInfo.token}` },
      });
      const data = await response.json();
      if (response.ok) {
        setConversations(data);
      }
    } catch (err) {
      console.error("Failed to fetch conversations");
    } finally {
      setLoading(false);
    }
  };

  const fetchMessages = async (conversationId) => {
    setChatLoading(true);
    try {
      const response = await fetch(`${window.location.origin}/api/messages/${conversationId}`, {
        headers: { Authorization: `Bearer ${userInfo.token}` },
      });
      const data = await response.json();
      if (response.ok) {
        setMessages(data);
        socket.emit("join_room", conversationId);
      }
    } catch (err) {
      console.error("Failed to fetch messages");
    } finally {
      setChatLoading(false);
    }
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    try {
      const response = await fetch(`${window.location.origin}/api/messages/${selectedConversation._id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
        body: JSON.stringify({ content: newMessage }),
      });

      if (response.ok) {
        setNewMessage("");
        fetchConversations(); // Update preview in sidebar
      }
    } catch (err) {
      console.error("Failed to send message");
    }
  };

  const toggleResolved = async () => {
    try {
      const response = await fetch(`${window.location.origin}/api/messages/conversations/${selectedConversation._id}/resolve`, {
        method: "PUT",
        headers: { Authorization: `Bearer ${userInfo.token}` },
      });
      if (response.ok) {
        const updated = await response.json();
        setSelectedConversation(prev => ({ ...prev, status: updated.status }));
        fetchConversations();
      }
    } catch (err) {
      console.error("Failed to toggle status");
    }
  };

  const shareContact = (type) => {
    const content = type === "phone" ? `My phone number is: ${userInfo.phone || "(Not set)"}` : `My email is: ${userInfo.email}`;
    setNewMessage(content);
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px]">
        <Loader2 className="animate-spin text-indigo-600 mb-4" size={40} />
        <p className="text-slate-500 font-bold animate-pulse">Syncing your inbox...</p>
      </div>
    );
  }

  return (
    <div className="flex bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden h-[calc(100vh-180px)] min-h-[500px]">
      
      {/* Sidebar: Inbox List */}
      <div className={`w-full lg:w-80 border-r border-slate-50 flex flex-col ${selectedConversation ? "hidden lg:flex" : "flex"}`}>
        <div className="p-6 border-b border-slate-50">
          <h2 className="text-xl font-black text-slate-800 uppercase tracking-tight mb-4">Inbox</h2>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
            <input 
              type="text" placeholder="Search chats..."
              className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border-none rounded-xl text-sm focus:ring-2 focus:ring-indigo-100 outline-none"
            />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto overflow-x-hidden">
          {conversations.length === 0 ? (
            <div className="p-10 text-center space-y-3 opacity-40">
              <MessageSquare size={40} className="mx-auto text-slate-300" />
              <p className="text-xs font-bold uppercase tracking-widest text-slate-500">No active chats</p>
            </div>
          ) : (
            conversations.map((conv) => {
              const otherParticipant = conv.participants.find(p => p._id !== userId);
              const isActive = selectedConversation?._id === conv._id;
              
              return (
                <button
                  key={conv._id}
                  onClick={() => { 
                    setSelectedConversation(conv); 
                    fetchMessages(conv._id); 
                    // Clear unread count locally for better UX
                    setConversations(prev => prev.map(c => c._id === conv._id ? { ...c, unreadCount: 0 } : c));
                  }}
                  className={`w-full p-4 flex gap-3 transition-all border-b border-slate-50/50 ${isActive ? "bg-indigo-50/50" : "hover:bg-slate-50"}`}
                >
                  <div className="relative shrink-0">
                    <img 
                      src={otherParticipant?.profilePhoto || `https://api.dicebear.com/7.x/avataaars/svg?seed=${otherParticipant?.name}`} 
                      className="w-12 h-12 rounded-2xl object-cover border border-slate-100" 
                      alt="Avatar"
                    />
                    {conv.status === "Resolved" && (
                       <div className="absolute -top-1 -right-1 bg-emerald-500 text-white p-0.5 rounded-full border-2 border-white">
                          <CheckCircle2 size={10} />
                       </div>
                    )}
                  </div>
                  <div className="flex-1 text-left min-w-0">
                    <div className="flex justify-between items-start mb-1">
                      <div className="flex items-center gap-2">
                        <h4 className="font-black text-slate-800 text-sm truncate uppercase tracking-tighter">
                          {otherParticipant?.name}
                        </h4>
                        {conv.unreadCount > 0 && (
                          <span className="bg-indigo-600 text-white text-[9px] font-black px-1.5 py-0.5 rounded-full animate-bounce">
                            {conv.unreadCount}
                          </span>
                        )}
                      </div>
                      <span className="text-[10px] font-bold text-slate-400">
                        {new Date(conv.updatedAt).toLocaleDateString([], { month: 'short', day: 'numeric' })}
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 truncate font-medium">
                       {conv.lastMessage?.content || "Starting a conversation..."}
                    </p>
                    {conv.post && (
                      <div className="mt-1 flex items-center gap-1">
                        <div className="w-1 h-1 bg-indigo-400 rounded-full"></div>
                        <span className="text-[9px] font-black text-indigo-500 uppercase tracking-widest truncate">{conv.post.title}</span>
                      </div>
                    )}
                  </div>
                </button>
              );
            })
          )}
        </div>
      </div>

      {/* Main Chat Window */}
      <div className={`flex-1 flex flex-col bg-slate-50/30 ${!selectedConversation ? "hidden lg:flex" : "flex"}`}>
        {selectedConversation ? (
          <>
            {/* Chat Header */}
            <div className="p-4 bg-white border-b border-slate-50 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <button onClick={() => setSelectedConversation(null)} className="lg:hidden p-2 text-slate-400 hover:text-slate-600 transition-all">
                  <ChevronLeft size={24} />
                </button>
                <div className="flex items-center gap-3">
                   <div className="w-10 h-10 rounded-xl bg-indigo-600 text-white flex items-center justify-center font-black text-xs uppercase">
                      {selectedConversation.participants.find(p => p._id !== userId)?.name?.charAt(0)}
                   </div>
                   <div>
                      <h3 className="font-black text-slate-800 text-sm uppercase tracking-tighter">
                        {selectedConversation.participants.find(p => p._id !== userId)?.name}
                      </h3>
                      <div className="flex items-center gap-2">
                        <span className={`w-2 h-2 rounded-full ${selectedConversation.status === "Active" ? "bg-emerald-500 animate-pulse" : "bg-slate-300"}`}></span>
                        <span className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.1em]">{selectedConversation.status}</span>
                      </div>
                   </div>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <button 
                  onClick={toggleResolved}
                  className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${
                    selectedConversation.status === "Resolved" 
                    ? "bg-emerald-50 text-emerald-600 border border-emerald-100" 
                    : "bg-white text-slate-600 border border-slate-200 hover:border-emerald-500 hover:text-emerald-600"
                  }`}
                >
                  {selectedConversation.status === "Resolved" ? "Work Resolved" : "Mark as Resolved"}
                </button>
                <button className="p-2 text-slate-300 hover:text-slate-600">
                  <MoreVertical size={20} />
                </button>
              </div>
            </div>

            {/* Message Feed */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
               {chatLoading ? (
                 <div className="flex items-center justify-center h-full opacity-20"><Loader2 className="animate-spin" /></div>
               ) : (
                 <>
                   {/* Context Card (Optional: shows what post this is about) */}
                   {selectedConversation.post && (
                     <div className="mx-auto max-w-sm bg-white p-4 rounded-2xl border border-slate-100 shadow-sm mb-10 text-center">
                        <span className="text-[9px] font-black uppercase text-indigo-400 tracking-[0.2em] block mb-2">Subject Post</span>
                        <h4 className="text-xs font-black text-slate-800 uppercase mb-1">{selectedConversation.post.title}</h4>
                        <div className="flex items-center justify-center gap-4 text-[10px] font-bold text-slate-400 italic">
                           <span>{selectedConversation.post.location?.address?.split(',')[0]}</span>
                           <span>${selectedConversation.post.price}</span>
                        </div>
                     </div>
                   )}

                   {messages.map((msg, index) => {
                     const isMine = msg.sender?._id === userId || msg.sender === userId;
                     return (
                       <motion.div 
                         initial={{ opacity: 0, y: 10 }}
                         animate={{ opacity: 1, y: 0 }}
                         key={msg._id || index}
                         className={`flex ${isMine ? "justify-end" : "justify-start"}`}
                       >
                         <div className={`max-w-[75%] p-4 rounded-3xl ${
                           isMine 
                           ? "bg-indigo-600 text-white rounded-tr-none shadow-lg shadow-indigo-100" 
                           : "bg-white text-slate-700 rounded-tl-none border border-slate-100 shadow-sm"
                         }`}>
                           <p className="text-sm font-medium leading-relaxed">{msg.content}</p>
                           <span className={`text-[9px] font-bold uppercase tracking-widest mt-2 block ${isMine ? "text-indigo-200" : "text-slate-400"}`}>
                             {new Date(msg.createdAt || Date.now()).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                           </span>
                         </div>
                       </motion.div>
                     );
                   })}
                   <div ref={messagesEndRef} />
                 </>
               )}
            </div>

            {/* Action Bar (Contact Share) */}
            <div className="px-6 py-2 flex items-center gap-2">
               <button onClick={() => shareContact("phone")} className="flex items-center gap-2 px-3 py-1.5 bg-white border border-slate-100 rounded-lg text-[9px] font-black uppercase text-slate-500 hover:text-indigo-600 transition-all">
                  <Phone size={12} /> Share Phone
               </button>
               <button onClick={() => shareContact("email")} className="flex items-center gap-2 px-3 py-1.5 bg-white border border-slate-100 rounded-lg text-[9px] font-black uppercase text-slate-500 hover:text-indigo-600 transition-all">
                  <Mail size={12} /> Share Email
               </button>
            </div>

            {/* Input Overlay */}
            <form onSubmit={handleSendMessage} className="p-6 bg-white border-t border-slate-50">
               <div className="relative">
                  <input 
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    type="text" 
                    placeholder="Type your message..."
                    className="w-full pl-6 pr-20 py-4 bg-slate-50 border-none rounded-2xl text-sm focus:ring-4 focus:ring-indigo-100 outline-none font-medium"
                  />
                  <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-2">
                    <button type="submit" disabled={!newMessage.trim()} className="w-10 h-10 bg-indigo-600 text-white rounded-xl flex items-center justify-center hover:bg-slate-900 transition-all shadow-lg active:scale-95 disabled:bg-slate-200">
                      <Send size={18} />
                    </button>
                  </div>
               </div>
            </form>
          </>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center text-center p-12 space-y-6 opacity-30">
            <div className="w-24 h-24 rounded-full bg-slate-100 flex items-center justify-center border-2 border-dashed border-slate-300">
               <MessageSquare size={40} className="text-slate-400" />
            </div>
            <div>
               <h3 className="text-xl font-black text-slate-800 uppercase tracking-tighter">Your Workspace Inbox</h3>
               <p className="text-sm font-medium text-slate-500 max-w-xs mx-auto">Select a chat from the left to start coordinating with providers and clients.</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Messages;
