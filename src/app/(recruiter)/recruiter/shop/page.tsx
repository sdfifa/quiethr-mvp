"use client";

import { useState } from "react";
import { useMockStore } from "@/lib/store/mock-store";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";

export default function TalentShopPage() {
  const { candidates, unlockCandidate } = useMockStore();
  const { toast } = useToast();
  const [loadingId, setLoadingId] = useState<string | null>(null);

  const handleUnlock = async (id: string) => {
    setLoadingId(id);
    await unlockCandidate(id);
    setLoadingId(null);
    toast({
        title: "Candidate Unlocked",
        description: "Contact details are now visible.",
        className: "bg-green-900 border-green-800 text-white"
    });
  };

  return (
    <div className="flex-1 w-full max-w-7xl mx-auto px-6 pb-20 pt-8">
      {/* Header */}
      <div className="w-full py-8 flex flex-col items-center justify-center gap-4 text-center">
        <h1 className="text-3xl font-bold tracking-tight text-white">Candidate Profiles</h1>
        <p className="text-slate-400 max-w-2xl">
            Review top 1% talent matches. Unlock full profiles to view contact details and schedule interviews.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        {candidates.map((candidate) => (
          <div key={candidate.id} className="relative w-full bg-[#1c190d] rounded-2xl shadow-lg border border-neutral-800 overflow-hidden group hover:border-[#f2c10d]/30 transition-all duration-300">
            
            {/* Status Header Line */}
            <div className={`absolute top-0 left-0 w-full h-1 ${candidate.isUnlocked ? 'bg-emerald-500' : 'bg-gradient-to-r from-transparent via-[#f2c10d] to-transparent opacity-50'}`}></div>
            
            <div className="p-6 md:p-8 flex flex-col gap-6">
                {/* Top Row */}
                <div className="flex justify-between items-start">
                    <div className="flex flex-col gap-1">
                        <div className="flex items-center gap-2">
                            {candidate.isUnlocked ? (
                                <span className="bg-emerald-900/30 text-emerald-400 text-xs font-bold px-2 py-1 rounded uppercase tracking-wider">Unlocked</span>
                            ) : (
                                <>
                                    <span className="bg-[#f2c10d]/10 text-[#f2c10d] text-xs font-bold px-2 py-1 rounded uppercase tracking-wider">Top Match</span>
                                    <span className="material-symbols-outlined text-[#f2c10d] text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>bolt</span>
                                </>
                            )}
                        </div>
                        <h2 className="text-3xl font-bold text-white tracking-tight">{candidate.market_value_score}% Match</h2>
                    </div>
                    
                    {candidate.isUnlocked ? (
                        <div className="flex gap-2">
                            <button className="w-8 h-8 flex items-center justify-center rounded-full bg-slate-800 hover:bg-slate-700 text-slate-400 transition-colors">
                                <span className="material-symbols-outlined text-lg">link</span>
                            </button>
                            <button className="w-8 h-8 flex items-center justify-center rounded-full bg-slate-800 hover:bg-slate-700 text-slate-400 transition-colors">
                                <span className="material-symbols-outlined text-lg">download</span>
                            </button>
                        </div>
                    ) : (
                        <button aria-label="Save Candidate" className="text-slate-400 hover:text-[#f2c10d] transition-colors">
                            <span className="material-symbols-outlined">bookmark</span>
                        </button>
                    )}
                </div>

                {/* Identity Section */}
                <div className="flex flex-col md:flex-row gap-6 items-center md:items-start text-center md:text-left">
                    <div className="relative shrink-0">
                        <div className={`w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden border-4 border-neutral-800 relative bg-slate-900 ${!candidate.isUnlocked && 'border-[#f2c10d]/20'}`}>
                            <img 
                                alt="Candidate Avatar" 
                                className={`w-full h-full object-cover ${!candidate.isUnlocked ? 'blur-md scale-110 opacity-80' : ''}`}
                                src={candidate.avatar}
                            />
                            {!candidate.isUnlocked && (
                                <div className="absolute inset-0 flex items-center justify-center bg-black/40">
                                    <span className="material-symbols-outlined text-white drop-shadow-md text-4xl">lock</span>
                                </div>
                            )}
                            {candidate.isUnlocked && (
                                <div className="absolute bottom-1 right-1 w-6 h-6 bg-green-500 border-2 border-[#1c190d] rounded-full"></div>
                            )}
                        </div>
                    </div>

                    <div className="flex flex-col gap-2 w-full">
                        <div className="flex flex-col md:flex-row items-center md:items-baseline gap-2 justify-center md:justify-start">
                            <h3 className="text-xl font-bold text-white flex items-center gap-2">
                                {candidate.isUnlocked ? candidate.name : `Hidden Candidate #${candidate.id.split('-')[1]}`}
                            </h3>
                            {candidate.isUnlocked && (
                                <span className="text-sm text-slate-400 flex items-center gap-1">
                                    <span className="material-symbols-outlined text-sm">location_on</span> San Francisco, CA
                                </span>
                            )}
                        </div>
                        <p className="text-slate-400 font-medium text-lg">{candidate.headline}</p>
                        
                        <div className="flex flex-wrap gap-2 mt-2 justify-center md:justify-start">
                            {candidate.badges.map(badge => (
                                <span key={badge} className="px-3 py-1 bg-neutral-800 text-slate-200 text-xs font-semibold rounded-lg">{badge}</span>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Stats Row */}
                <div className="grid grid-cols-3 gap-2 border-t border-b border-neutral-800 py-4">
                    <div className="flex flex-col gap-1 px-2 border-r border-neutral-800 last:border-0">
                        <span className="text-white font-bold text-lg md:text-xl">5 Yrs</span>
                        <span className="text-slate-500 text-xs uppercase font-medium tracking-wide">Experience</span>
                    </div>
                    <div className="flex flex-col gap-1 px-2 border-r border-neutral-800 last:border-0">
                        <span className="text-white font-bold text-lg md:text-xl">$140k</span>
                        <span className="text-slate-500 text-xs uppercase font-medium tracking-wide">Expected</span>
                    </div>
                    <div className="flex flex-col gap-1 px-2 border-r border-neutral-800 last:border-0">
                        <span className="text-white font-bold text-lg md:text-xl">Now</span>
                        <span className="text-slate-500 text-xs uppercase font-medium tracking-wide">Availability</span>
                    </div>
                </div>

                {/* CTA Section */}
                <div className="flex gap-3">
                    {candidate.isUnlocked ? (
                        <>
                            <button className="flex-1 h-12 flex items-center justify-center gap-2 bg-white hover:bg-slate-200 text-slate-900 font-bold rounded-lg transition-all duration-200 shadow-sm active:scale-[0.98]">
                                <span className="material-symbols-outlined text-xl">chat_bubble</span>
                                <span>Message</span>
                            </button>
                            <button className="w-12 h-12 flex items-center justify-center rounded-lg border-2 border-neutral-700 text-slate-300 hover:border-[#f2c10d] hover:text-[#f2c10d] transition-colors">
                                <span className="material-symbols-outlined text-xl">calendar_month</span>
                            </button>
                        </>
                    ) : (
                        <div className="flex flex-col gap-3 w-full">
                            <button 
                                onClick={() => handleUnlock(candidate.id)}
                                disabled={loadingId === candidate.id}
                                className="group/btn relative w-full h-12 flex items-center justify-center gap-2 bg-[#f2c10d] hover:bg-[#d9ad0b] text-slate-900 font-bold rounded-lg transition-all duration-200 shadow-sm active:scale-[0.98]"
                            >
                                {loadingId === candidate.id ? (
                                    <span>Processing...</span>
                                ) : (
                                    <>
                                        <span className="material-symbols-outlined text-xl group-hover/btn:animate-pulse">lock_open</span>
                                        <span>Unlock Profile • $250</span>
                                    </>
                                )}
                            </button>
                            <p className="text-center text-xs text-slate-500">100% Satisfaction Guarantee. Credits refunded if no reply.</p>
                        </div>
                    )}
                </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
