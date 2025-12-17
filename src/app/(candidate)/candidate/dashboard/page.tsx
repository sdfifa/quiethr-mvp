"use client";

import { useMockStore } from "@/lib/store/mock-store";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Wallet, Ticket, Trophy, Clock } from "lucide-react";

export default function CandidateDashboardPage() {
  const { currentUser, events, candidates } = useMockStore();
  const myProfile = candidates[0]; // Simulating "Me"
  const myTickets = events.filter(e => e.status === 'PAID');

  return (
    <div className="p-8 text-white">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">My Wallet & Stats</h1>
        <p className="text-gray-400">Manage your earnings and event access.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card className="bg-[#1a1a1a] border-white/10 text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4 opacity-10">
            <Wallet className="h-24 w-24 text-[#FFD700]" />
          </div>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-400">Current Balance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold text-[#FFD700]">${currentUser.wallet}</div>
            <p className="text-xs text-gray-500 mt-1">Available for withdrawal</p>
          </CardContent>
        </Card>

        <Card className="bg-[#1a1a1a] border-white/10 text-white">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-400">Market Value</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-end gap-2">
              <span className="text-4xl font-bold">{myProfile.market_value_score}</span>
              <span className="text-sm text-green-500 mb-1">/ 100</span>
            </div>
            <p className="text-xs text-gray-500 mt-1">Top 5% of candidates</p>
          </CardContent>
        </Card>

        <Card className="bg-[#1a1a1a] border-white/10 text-white">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-400">Badges Earned</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {myProfile.badges.map(b => (
                <span key={b} className="px-2 py-1 bg-white/10 rounded text-xs font-medium border border-white/5">
                  {b}
                </span>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <h2 className="text-xl font-bold mb-4">My Tickets</h2>
      <div className="grid gap-4">
        {myTickets.length === 0 ? (
          <div className="p-8 border border-dashed border-white/10 rounded-xl text-center text-gray-500">
            <Ticket className="h-8 w-8 mx-auto mb-2 opacity-50" />
            No active tickets. Visit The Gauntlet to earn access.
          </div>
        ) : (
          myTickets.map(ticket => (
            <div key={ticket.id} className="p-4 bg-[#1a1a1a] border border-white/10 rounded-xl flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 bg-green-900/20 rounded-lg flex items-center justify-center text-green-500">
                  <Ticket className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-bold">{ticket.title}</h3>
                  <p className="text-xs text-gray-400">Access Granted • Premium Seat</p>
                </div>
              </div>
              <button className="px-4 py-2 bg-white/5 hover:bg-white/10 rounded-lg text-sm font-medium transition-colors">
                View Event
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

