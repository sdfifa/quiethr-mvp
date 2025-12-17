"use client";

import { useState } from "react";
import { useMockStore } from "@/lib/store/mock-store";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Lock, Unlock, CheckCircle, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function GauntletPage() {
  const { events, simulateGauntletSubmit, simulatePayment } = useMockStore();
  const { toast } = useToast();
  
  const [selectedEventId, setSelectedEventId] = useState<string | null>(null);
  const [isQuizOpen, setIsQuizOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isPaying, setIsPaying] = useState(false);

  // Filter for upcoming events that are locked
  const lockedEvents = events.filter(e => e.status !== 'ended');

  const handleStartGauntlet = (eventId: string) => {
    setSelectedEventId(eventId);
    setIsQuizOpen(true);
  };

  const handleSubmitQuiz = async () => {
    setIsSubmitting(true);
    await simulateGauntletSubmit({}); // Mock submit
    setIsSubmitting(false);
    setIsQuizOpen(false);
    toast({
      title: "Assessment Passed!",
      description: "You scored 95%. Payment portal unlocked.",
      variant: "default",
      className: "border-green-500 bg-green-50"
    });
  };

  const handlePayment = async (eventId: string) => {
    setIsPaying(true);
    await simulatePayment(eventId);
    setIsPaying(false);
    toast({
      title: "Ticket Purchased",
      description: "See you at the event!",
      className: "bg-primary text-black border-black"
    });
  };

  return (
    <div className="p-8 max-w-5xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">The Gauntlet</h1>
        <p className="text-muted-foreground">Prove your skills to unlock exclusive masterclasses.</p>
      </div>

      <div className="grid gap-6">
        {lockedEvents.map((event) => (
          <Card key={event.id} className="relative overflow-hidden border-2 transition-all hover:border-black/20">
            <div className="absolute top-0 right-0 p-4">
               {event.ticket_status === 'LOCKED' && <Lock className="text-muted-foreground h-6 w-6" />}
               {event.ticket_status === 'AVAILABLE' && <Unlock className="text-primary h-6 w-6" />}
               {event.ticket_status === 'PAID' && <CheckCircle className="text-green-500 h-6 w-6" />}
            </div>

            <CardHeader>
              <CardTitle className="text-xl">{event.title}</CardTitle>
              <CardDescription className="flex items-center gap-2">
                <span>{event.status === 'live' ? '🔴 Live Now' : '📅 Upcoming'}</span>
                <span>•</span>
                <span>${event.price}</span>
              </CardDescription>
            </CardHeader>

            <CardContent>
              <p className="text-sm text-gray-600 max-w-xl">
                This high-level session covers distributed systems patterns. 
                Prerequisite: Pass the 3-question architectural assessment.
              </p>
            </CardContent>

            <CardFooter>
              {event.ticket_status === 'LOCKED' && (
                <Button onClick={() => handleStartGauntlet(event.id)} className="w-full md:w-auto">
                  Take Assessment
                </Button>
              )}
              
              {event.ticket_status === 'AVAILABLE' && (
                <Button 
                  onClick={() => handlePayment(event.id)} 
                  disabled={isPaying}
                  className="w-full md:w-auto bg-primary text-black hover:bg-primary/90"
                >
                  {isPaying ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                  Pay ${event.price} to Join
                </Button>
              )}

              {event.ticket_status === 'PAID' && (
                <Button variant="secondary" className="w-full md:w-auto" disabled>
                  Ticket in Wallet
                </Button>
              )}
            </CardFooter>
          </Card>
        ))}
      </div>

      {/* Quiz Modal */}
      <Dialog open={isQuizOpen} onOpenChange={setIsQuizOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Pre-Screening Assessment</DialogTitle>
            <DialogDescription>
              Answer correctly to prove you're ready for this level.
            </DialogDescription>
          </DialogHeader>
          
          <div className="py-4 space-y-4">
             <div className="space-y-2">
               <label className="text-sm font-medium">1. What is the Big O time complexity of accessing a hash map element?</label>
               <div className="grid grid-cols-1 gap-2">
                  <Button variant="outline" className="justify-start">A) O(n)</Button>
                  <Button variant="outline" className="justify-start border-primary/50 bg-primary/5">B) O(1)</Button>
                  <Button variant="outline" className="justify-start">C) O(log n)</Button>
               </div>
             </div>
          </div>

          <DialogFooter>
            <Button onClick={handleSubmitQuiz} disabled={isSubmitting} className="w-full">
              {isSubmitting ? "Grading..." : "Submit Answers"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

