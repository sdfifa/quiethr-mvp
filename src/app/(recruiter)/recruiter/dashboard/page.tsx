"use client";

import { useMockStore } from "@/lib/store/mock-store";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Calendar, TrendingUp, DollarSign } from "lucide-react";

export default function RecruiterDashboardPage() {
  const { candidates, events, currentUser } = useMockStore();

  const activeCandidates = candidates.length;
  const unlockedCandidates = candidates.filter(c => c.isUnlocked).length;
  const totalRevenue = events.reduce((acc, e) => acc + (e.status === 'PAID' ? e.price : 0), 0); // Simplified logic
  const eventsCount = events.length;

  return (
    <div className="p-8 text-white">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Analytics Dashboard</h1>
        <p className="text-gray-400">Overview of your recruitment pipeline and spending.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card className="bg-[#1a1a1a] border-white/10 text-white">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Candidates</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{activeCandidates}</div>
            <p className="text-xs text-muted-foreground">+12% from last month</p>
          </CardContent>
        </Card>
        
        <Card className="bg-[#1a1a1a] border-white/10 text-white">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Unlocked Profiles</CardTitle>
            <TrendingUp className="h-4 w-4 text-[#FFD700]" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-[#FFD700]">{unlockedCandidates}</div>
            <p className="text-xs text-muted-foreground">High intent signals</p>
          </CardContent>
        </Card>

        <Card className="bg-[#1a1a1a] border-white/10 text-white">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Wallet Balance</CardTitle>
            <DollarSign className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${currentUser.wallet}</div>
            <p className="text-xs text-muted-foreground">Available credits</p>
          </CardContent>
        </Card>

        <Card className="bg-[#1a1a1a] border-white/10 text-white">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Events</CardTitle>
            <Calendar className="h-4 w-4 text-blue-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{eventsCount}</div>
            <p className="text-xs text-muted-foreground">Live & Upcoming</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4 bg-[#1a1a1a] border-white/10 text-white">
          <CardHeader>
            <CardTitle>Overview</CardTitle>
          </CardHeader>
          <CardContent className="pl-2">
             <div className="h-[200px] flex items-center justify-center text-gray-500 border border-dashed border-white/10 rounded-md">
               [Chart Placeholder: Candidate Engagement]
             </div>
          </CardContent>
        </Card>
        <Card className="col-span-3 bg-[#1a1a1a] border-white/10 text-white">
          <CardHeader>
            <CardTitle>Recent Unlocks</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
               {unlockedCandidates === 0 ? (
                 <p className="text-sm text-gray-500 text-center py-4">No candidates unlocked yet.</p>
               ) : (
                 candidates.filter(c => c.isUnlocked).map(c => (
                   <div key={c.id} className="flex items-center">
                     <div className="ml-4 space-y-1">
                       <p className="text-sm font-medium leading-none">{c.name}</p>
                       <p className="text-xs text-muted-foreground">{c.headline}</p>
                     </div>
                     <div className="ml-auto font-medium text-[#FFD700]">-{250} Credits</div>
                   </div>
                 ))
               )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

