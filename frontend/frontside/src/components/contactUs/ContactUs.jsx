import { Mail, Send, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';
import { useState } from 'react';

export default function ContactUs() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Message sent!');
    setForm({ name: '', email: '', message: '' });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-100 flex flex-col items-center p-6">
      <h1 className="text-4xl font-bold mb-4 text-center">Contact Us</h1>
      <p className="text-gray-600 mb-8 text-center max-w-md">
        We'd love to hear from you! Please fill out the form below or connect with us on social media.
      </p>

      <form
        onSubmit={handleSubmit}
        className="w-full max-w-lg bg-white shadow-xl p-6 rounded-2xl space-y-4"
      >
        <input
          type="text"
          name="name"
          placeholder="Your Name"
          className="w-full p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={form.name}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Your Email"
          className="w-full p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={form.email}
          onChange={handleChange}
          required
        />
        <textarea
          name="message"
          placeholder="Your Message"
          rows="5"
          className="w-full p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={form.message}
          onChange={handleChange}
          required
        />
        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-xl flex items-center justify-center gap-2 transition"
        >
          <Send size={18} /> Send Message
        </button>
      </form>

      <div className="mt-10 text-center">
        <h2 className="text-xl font-semibold mb-2">Or reach us via</h2>
        <p className="flex justify-center items-center gap-2 text-gray-700">
          <Mail size={20} />
          contact@example.com
        </p>

        <div className="flex justify-center gap-6 mt-4 text-gray-600">
          <a href="https://facebook.com" target="_blank" rel="noreferrer">
            <Facebook className="hover:text-blue-600 transition" />
          </a>
          <a href="https://twitter.com" target="_blank" rel="noreferrer">
            <Twitter className="hover:text-sky-500 transition" />
          </a>
          <a href="https://instagram.com" target="_blank" rel="noreferrer">
            <Instagram className="hover:text-pink-500 transition" />
          </a>
          <a href="https://linkedin.com" target="_blank" rel="noreferrer">
            <Linkedin className="hover:text-blue-700 transition" />
          </a>
        </div>
      </div>
    </div>
  );
}
