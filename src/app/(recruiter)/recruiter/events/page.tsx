"use client";

import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useMockStore } from "@/lib/store/mock-store";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area"; // Assume installed or use div overflow
import { Sparkles } from "lucide-react";

export default function EventsMonitorPage() {
  const { events } = useMockStore();
  const liveEvent = events.find(e => e.status === 'live');
  const [messages, setMessages] = useState(liveEvent?.chat_log || []);
  const [toasts, setToasts] = useState<{id: string, text: string}[]>([]);

  // Simulation: Add new messages periodically
  useEffect(() => {
    if (!liveEvent) return;

    const interval = setInterval(() => {
      const newMsg = {
        id: `new-${Date.now()}`,
        user: Math.random() > 0.5 ? "Jian Yang" : "Erlich",
        message: Math.random() > 0.5 ? "What about the compression algorithm?" : "This scales perfectly.",
        sentiment: Math.random() > 0.5 ? "positive" as const : "neutral" as const,
        timestamp: Date.now()
      };
      
      setMessages(prev => [...prev, newMsg]);

      // Trigger AI Toast if positive
      if (newMsg.sentiment === 'positive') {
         const toastId = Date.now().toString();
         setToasts(prev => [...prev, { id: toastId, text: `${newMsg.user} asked a high-value question.` }]);
         
         // Remove toast after 3s
         setTimeout(() => {
            setToasts(prev => prev.filter(t => t.id !== toastId));
         }, 3000);
      }

    }, 4000);

    return () => clearInterval(interval);
  }, [liveEvent]);

  if (!liveEvent) return <div className="p-8">No live events currently.</div>;

  return (
    <div className="flex h-[calc(100vh-64px)] overflow-hidden">
       {/* Main Video Area */}
       <div className="flex-1 bg-black relative flex items-center justify-center">
          <div className="text-white text-center opacity-50">
             <div className="text-6xl mb-4">🎥</div>
             <h2 className="text-2xl font-bold">{liveEvent.title}</h2>
             <p>Live Stream Placeholder</p>
          </div>

          {/* AI Toasts Overlay */}
          <div className="absolute top-8 right-8 space-y-4 w-80 pointer-events-none">
            <AnimatePresence>
               {toasts.map(toast => (
                 <motion.div
                   key={toast.id}
                   initial={{ opacity: 0, x: 50 }}
                   animate={{ opacity: 1, x: 0 }}
                   exit={{ opacity: 0, scale: 0.9 }}
                   className="bg-[#FFD700] text-black p-4 rounded-lg shadow-lg border-2 border-white flex items-start gap-3"
                 >
                    <Sparkles className="h-5 w-5 flex-shrink-0" />
                    <div>
                      <h4 className="font-bold text-sm">AI Insight</h4>
                      <p className="text-xs">{toast.text}</p>
                    </div>
                 </motion.div>
               ))}
            </AnimatePresence>
          </div>
       </div>

       {/* Right Sidebar: Chat */}
       <div className="w-96 border-l bg-white flex flex-col">
          <div className="p-4 border-b">
            <h3 className="font-bold">Live Chat</h3>
            <span className="text-xs text-green-600 flex items-center gap-1">
              <span className="h-2 w-2 rounded-full bg-green-600 animate-pulse"/> 
              1.2k Online
            </span>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-4">
             {messages.map((msg) => (
               <div key={msg.id} className="flex gap-3">
                 <Avatar className="h-8 w-8">
                   <AvatarFallback>{msg.user[0]}</AvatarFallback>
                 </Avatar>
                 <div>
                   <div className="flex items-baseline gap-2">
                     <span className="text-sm font-bold">{msg.user}</span>
                     <span className="text-[10px] text-gray-400">
                       {new Date(msg.timestamp).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                     </span>
                   </div>
                   <p className="text-sm text-gray-700">{msg.message}</p>
                 </div>
               </div>
             ))}
          </div>

          <div className="p-4 border-t bg-gray-50">
             <input 
               disabled 
               placeholder="Chat is read-only for Recruiters" 
               className="w-full text-sm p-2 border rounded bg-white text-gray-400 cursor-not-allowed"
             />
          </div>
       </div>
    </div>
  );
}

