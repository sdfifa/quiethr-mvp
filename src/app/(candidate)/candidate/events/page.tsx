"use client";

import { useState } from "react";
import { useMockStore } from "@/lib/store/mock-store";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Lock, Unlock, CheckCircle, ShieldCheck } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function CandidateEventsPage() {
  const { events, purchaseTicket } = useMockStore();
  const { toast } = useToast();
  
  const [isQuizOpen, setIsQuizOpen] = useState(false);
  const [quizPassed, setQuizPassed] = useState(false);

  const event = events[0];

  const handleStart = () => setIsQuizOpen(true);

  const handleSubmitQuiz = () => {
    setIsQuizOpen(false);
    setQuizPassed(true);
    toast({
      title: "Assessment Passed! Top 5%",
      description: "You have proven your architectural knowledge.",
      className: "bg-green-900 border-green-700 text-white"
    });
  };

  const handlePay = async () => {
    await purchaseTicket(event.id);
    toast({
      title: "Ticket Purchased",
      description: "Access granted to the Masterclass.",
      className: "bg-[#FFD700] text-black border-none font-bold"
    });
  };

  return (
    <div className="p-8 max-w-4xl mx-auto text-white">
      <h1 className="text-3xl font-bold mb-8">The Gauntlet</h1>

      <Card className="border border-white/10 bg-[#1a1a1a] overflow-hidden shadow-2xl">
        <div className="h-64 bg-gradient-to-b from-gray-900 to-black flex flex-col items-center justify-center relative">
           <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20"></div>
           <span className="text-8xl filter drop-shadow-[0_0_15px_rgba(255,215,0,0.5)]">🏛️</span>
            {event.ticket_status === 'PAID' && (
             <div className="absolute top-4 right-4 bg-green-900/80 text-green-400 px-4 py-1 rounded-full text-sm font-bold border border-green-700 flex items-center gap-2">
               <ShieldCheck className="h-4 w-4" /> ACCESS GRANTED
             </div>
           )}
        </div>
        
        <CardHeader className="space-y-4">
          <div className="flex justify-between items-start">
            <div>
               <h2 className="text-3xl font-bold text-white tracking-tight">{event.title}</h2>
               <p className="text-[#FFD700] font-medium mt-1">Live Masterclass • ${event.price}</p>
            </div>
            {event.ticket_status !== 'PAID' && (
              <span className="bg-white/5 text-gray-400 px-3 py-1 rounded text-xs font-bold border border-white/10 flex items-center gap-2 uppercase tracking-widest">
                <Lock className="h-3 w-3" /> Locked
              </span>
            )}
          </div>
        </CardHeader>
        
        <CardContent>
          <p className="text-gray-400 leading-relaxed">
            This high-intensity session covers <span className="text-white font-bold">distributed systems patterns</span>, <span className="text-white font-bold">Rust memory management</span>, and <span className="text-white font-bold">AI agent orchestration</span>. 
            <br/><br/>
            Access is restricted to the top 5% of candidates. Pass the architectural assessment to unlock the payment gate.
          </p>
        </CardContent>

        <CardFooter className="bg-black/40 border-t border-white/5 p-8">
          {event.ticket_status === 'PAID' ? (
             <Button disabled className="w-full h-12 bg-green-900/20 text-green-400 border border-green-900/50">
               <CheckCircle className="mr-2 h-5 w-5" /> Ticket in Wallet
             </Button>
          ) : quizPassed ? (
             <Button onClick={handlePay} className="w-full h-12 bg-[#FFD700] text-black hover:bg-[#FFD700]/90 text-lg font-bold shadow-[0_0_20px_rgba(255,215,0,0.3)] transition-all hover:scale-[1.02]">
               Purchase Ticket ($50)
             </Button>
          ) : (
             <Button onClick={handleStart} className="w-full h-12 bg-white text-black hover:bg-gray-200 text-lg font-bold">
               Attempt Screening
             </Button>
          )}
        </CardFooter>
      </Card>

      <Dialog open={isQuizOpen} onOpenChange={setIsQuizOpen}>
        <DialogContent className="bg-[#1a1a1a] border-white/10 text-white sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle className="text-2xl">Pre-Screening Assessment</DialogTitle>
          </DialogHeader>
          <div className="py-6 space-y-6">
            <div className="space-y-4">
              <p className="font-medium text-lg">Question 1: Which pattern provides the highest consistency for a distributed ledger?</p>
              <div className="space-y-3">
                <Button variant="outline" className="w-full justify-start h-auto py-3 text-left border-white/10 hover:bg-white/5 hover:text-white text-gray-400">
                  A) Eventual Consistency with Gossip Protocol
                </Button>
                <Button variant="outline" className="w-full justify-start h-auto py-3 text-left border-[#FFD700]/50 bg-[#FFD700]/10 text-[#FFD700] hover:bg-[#FFD700]/20 hover:text-[#FFD700]">
                  B) Raft Consensus Algorithm
                </Button>
                <Button variant="outline" className="w-full justify-start h-auto py-3 text-left border-white/10 hover:bg-white/5 hover:text-white text-gray-400">
                  C) Round-Robin Load Balancing
                </Button>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button onClick={handleSubmitQuiz} className="w-full bg-white text-black hover:bg-gray-200">Submit Answer</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
