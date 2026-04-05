import Conversation from "../models/conversation.model.js";
import Message from "../models/message.model.js";

// @desc    Get all conversations for user
// @route   GET /api/messages/conversations
// @access  Private
export const getConversations = async (req, res) => {
  try {
    const userId = req.user._id;
    const conversations = await Conversation.find({
      participants: { $in: [userId] },
    })
      .populate("participants", "name profilePhoto")
      .populate("post", "title price location")
      .populate("lastMessage")
      .sort({ updatedAt: -1 });

    // Append unread counts to Each conversation
    const conversationWithUnreads = await Promise.all(
        conversations.map(async (conv) => {
           const unreadCount = await Message.countDocuments({
              conversationId: conv._id,
              sender: { $ne: userId },
              isRead: false
           });
           return { ...conv._doc, unreadCount };
        })
    );

    res.json(conversationWithUnreads);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get messages for a conversation
// @route   GET /api/messages/:id
// @access  Private
export const getMessages = async (req, res) => {
  try {
    const userId = req.user._id;
    const conversationId = req.params.id;

    // Mark messages as read when fetched
    await Message.updateMany(
      { conversationId, sender: { $ne: userId }, isRead: false },
      { isRead: true }
    );

    const messages = await Message.find({ conversationId })
      .populate("sender", "name profilePhoto")
      .sort({ createdAt: 1 });

    res.json(messages);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Send a message
// @route   POST /api/messages/:id
// @access  Private
export const sendMessage = async (req, res) => {
  try {
    const { content } = req.body;
    const conversationId = req.params.id;

    const message = await Message.create({
      conversationId,
      sender: req.user._id,
      content,
    });

    const conversation = await Conversation.findByIdAndUpdate(
      conversationId,
      { lastMessage: message._id },
      { new: true }
    );

    // Socket.io push (using 'io' from app.get('io'))
    const io = req.app.get("io");
    io.to(conversationId).emit("receive_message", {
       ...message._doc,
       sender: { _id: req.user._id, name: req.user.name, profilePhoto: req.user.profilePhoto }
    });
    
    // Also notify about new message
    io.emit("new_message_notification", { conversationId, to: conversation.participants });

    res.status(201).json(message);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Start or get a conversation
// @route   POST /api/messages/start
// @access  Private
export const startConversation = async (req, res) => {
  try {
    const { recipientId, postId } = req.body;
    const senderId = req.user._id;

    // Check if conversation already exists for this post
    let conversation = await Conversation.findOne({
      participants: { $all: [senderId, recipientId] },
      post: postId,
    });

    if (!conversation) {
      conversation = await Conversation.create({
        participants: [senderId, recipientId],
        post: postId,
      });
    }

    res.status(201).json(conversation);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Toggle resolved status
// @route   PUT /api/messages/conversations/:id/resolve
// @access  Private
export const toggleResolved = async (req, res) => {
  try {
    const conversationId = req.params.id;
    const conversation = await Conversation.findById(conversationId);

    if (!conversation) return res.status(404).json({ message: "Conversation not found" });

    conversation.status = conversation.status === "Active" ? "Resolved" : "Active";
    await conversation.save();

    res.json(conversation);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get total unread count for user
// @route   GET /api/messages/unread-count
// @access  Private
export const getUnreadCount = async (req, res) => {
  try {
    const userId = req.user._id;
    const conversations = await Conversation.find({ participants: { $in: [userId] } });
    const convIds = conversations.map(c => c._id);

    const count = await Message.countDocuments({
      conversationId: { $in: convIds },
      sender: { $ne: userId },
      isRead: false
    });

    res.json({ count });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
