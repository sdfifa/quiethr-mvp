"use client";

import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Terminal } from "lucide-react";

export default function LiveMonitorPage() {
  const [messages, setMessages] = useState<{id: string, user: string, text: string, timestamp: string}[]>([]);
  const [showToast, setShowToast] = useState(false);
  const [toastContent, setToastContent] = useState("");

  useEffect(() => {
    // Initial Seed
    setMessages([
        { id: '1', user: 'Sarah Jenkins', text: 'Looking forward to this session! Will we cover the backend infrastructure roles?', timestamp: '10:42 AM' },
        { id: '2', user: 'Marcus Chen', text: 'Hi everyone! 👋 Joining from London.', timestamp: '10:44 AM' }
    ]);

    const interval = setInterval(() => {
      const users = ["Sarah Jenkins", "Mike Systems", "Jessica AI", "David R", "Alex Vibe", "John Doe"];
      const texts = [
        "Is this consistent with CAP theorem?",
        "Can we scale the workers independently?",
        "I used Rust for memory safety in my last project.",
        "Audio is lagging slightly.",
        "What about the database locking?",
        "Does the agent handle rate limiting?",
        "The latency on the edge nodes is impressive."
      ];
      
      const randomUser = users[Math.floor(Math.random() * users.length)];
      const randomText = texts[Math.floor(Math.random() * texts.length)];
      
      const newMsg = {
        id: Date.now().toString(),
        user: randomUser,
        text: randomText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages(prev => [...prev.slice(-8), newMsg]);

      // Simulate AI Trigger on specific keyword
      if (randomText.includes("Rust") || randomText.includes("CAP") || randomText.includes("scale")) {
        setToastContent(`Candidate ${randomUser} demonstrates high technical signal.`);
        setShowToast(true);
        setTimeout(() => setShowToast(false), 4000);
      }

    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex h-full w-full bg-[#111621] p-4 lg:p-8 justify-center items-center">
      {/* Component Container: Chat Stream */}
      <div className="relative flex w-full max-w-[480px] flex-col overflow-hidden bg-[#1a202c] shadow-2xl rounded-xl border border-gray-800 h-[800px] max-h-[90vh]">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-gray-800 px-6 py-4 bg-[#1a202c]/90 backdrop-blur-sm z-10 sticky top-0">
            <div>
                <h1 className="text-white text-lg font-bold leading-tight tracking-[-0.015em]">Live Chat</h1>
                <p className="text-gray-400 text-xs font-medium leading-normal">Engineering Recruitment Q3</p>
            </div>
            <div className="flex items-center gap-2 px-2 py-1 bg-red-900/20 rounded-lg border border-red-900/30">
                <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
                </span>
                <span className="text-red-400 text-[10px] font-bold tracking-wide uppercase">Live</span>
            </div>
        </div>

        {/* Scrollable Message Stream */}
        <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-6 relative scrollbar-hide">
            {/* System Message */}
            <div className="flex justify-center w-full">
                <div className="px-4 py-1.5 rounded-full bg-gray-800 border border-gray-700">
                    <p className="text-gray-400 text-xs font-medium leading-normal flex items-center gap-2">
                        <span className="material-symbols-outlined text-[16px]">info</span>
                        Webinar has started
                    </p>
                </div>
            </div>

            {/* Messages */}
            <AnimatePresence initial={false}>
                {messages.map((msg) => (
                    <motion.div 
                        key={msg.id} 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                        className="flex items-start gap-3 group"
                    >
                        <div className="relative shrink-0">
                            <Avatar className="h-10 w-10 border-2 border-gray-700 shadow-sm">
                                <AvatarFallback className="bg-gradient-to-tr from-purple-400 to-pink-400 text-white font-bold">{msg.user.substring(0,2)}</AvatarFallback>
                            </Avatar>
                        </div>
                        <div className="flex flex-1 flex-col gap-1.5 items-start">
                            <div className="flex items-baseline gap-2">
                                <p className="text-white text-sm font-bold leading-none">{msg.user}</p>
                                <p className="text-[#9ca3af] text-[11px] font-normal">{msg.timestamp}</p>
                            </div>
                            <div className="relative rounded-2xl rounded-tl-none bg-gray-800 px-4 py-3 text-gray-200 text-sm leading-relaxed max-w-[90%] border border-gray-700/50">
                                <p>{msg.text}</p>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </AnimatePresence>

            {/* AI Toast Overlay (Inside Chat for Context) */}
            <AnimatePresence>
                {showToast && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        className="sticky bottom-4 left-0 right-0 mx-auto w-[90%] bg-[#f2c10d] text-black p-3 rounded-xl shadow-lg border-2 border-white z-30 flex items-start gap-3"
                    >
                        <div className="bg-black/10 p-1.5 rounded-full">
                            <span className="material-symbols-outlined text-black text-[20px]">bolt</span>
                        </div>
                        <div>
                            <h4 className="font-bold text-xs uppercase tracking-wider">High Signal Detected</h4>
                            <p className="text-xs font-medium mt-0.5 leading-snug">{toastContent}</p>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>

        {/* Input Area */}
        <div className="p-4 bg-[#1a202c] border-t border-gray-800 z-20">
            <div className="flex items-end gap-3">
                <div className="relative flex-1 group/input">
                    <textarea 
                        className="w-full bg-gray-800 border-2 border-transparent focus:border-[#16439c]/50 rounded-xl pl-4 pr-10 py-3 text-sm text-white placeholder-[#9ca3af] focus:ring-0 focus:bg-gray-900 transition-all resize-none shadow-inner" 
                        placeholder="Type a message..." 
                        rows={1}
                    ></textarea>
                    <button aria-label="Add emoji" className="absolute right-2 bottom-2 p-1.5 text-gray-400 hover:text-[#16439c] transition-colors rounded-full">
                        <span className="material-symbols-outlined text-[20px]">sentiment_satisfied</span>
                    </button>
                </div>
                <button aria-label="Send message" className="h-[48px] w-[48px] flex items-center justify-center bg-[#16439c] hover:bg-[#11357d] text-white rounded-xl transition-all shadow-md active:scale-95">
                    <span className="material-symbols-outlined text-[20px] ml-0.5">send</span>
                </button>
            </div>
        </div>

      </div>
    </div>
  );
}
