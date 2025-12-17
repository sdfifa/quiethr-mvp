"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ArrowRight, Code, Users } from "lucide-react";
import { useMockStore } from "@/lib/store/mock-store";

export default function MarketingPage() {
  const router = useRouter();
  const { toggleRole } = useMockStore();

  const handleNavigation = (role: 'recruiter' | 'candidate', path: string) => {
    toggleRole(role);
    router.push(path);
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-4 relative overflow-hidden">
      {/* Background Gradients */}
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-primary/20 blur-[120px] rounded-full -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-blue-900/20 blur-[120px] rounded-full translate-x-1/2 translate-y-1/2" />

      <div className="z-10 text-center max-w-4xl space-y-8">
        <div className="space-y-4">
          <h1 className="text-6xl md:text-8xl font-bold tracking-tighter">
            Quiet<span className="text-[#FFD700]">HR</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-400 font-light tracking-wide">
            Quietly Hire the Top 1%.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-2xl mx-auto pt-12">
          {/* Recruiter CTA */}
          <div 
            onClick={() => handleNavigation('recruiter', '/recruiter/shop')}
            className="group cursor-pointer"
          >
            <div className="h-full bg-white/5 border border-white/10 p-8 rounded-2xl hover:bg-white/10 transition-all flex flex-col items-center gap-4 text-center">
              <div className="h-16 w-16 bg-white/10 rounded-full flex items-center justify-center group-hover:bg-[#FFD700] group-hover:text-black transition-colors">
                <Users className="h-8 w-8" />
              </div>
              <div>
                <h3 className="text-xl font-bold">I'm Hiring</h3>
                <p className="text-sm text-gray-400 mt-2">
                  Access the pre-vetted talent pool.
                </p>
              </div>
              <Button variant="link" className="text-[#FFD700] p-0 group-hover:underline">
                Enter Shop <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Candidate CTA */}
          <div 
            onClick={() => handleNavigation('candidate', '/candidate/studio')}
            className="group cursor-pointer"
          >
             <div className="h-full bg-[#FFD700] border border-[#FFD700] p-8 rounded-2xl hover:bg-[#FFD700]/90 transition-all flex flex-col items-center gap-4 text-center">
              <div className="h-16 w-16 bg-black/10 rounded-full flex items-center justify-center text-black">
                <Code className="h-8 w-8" />
              </div>
              <div className="text-black">
                <h3 className="text-xl font-bold">I'm Building</h3>
                <p className="text-sm text-black/70 mt-2">
                  Showcase your work & get headhunted.
                </p>
              </div>
              <Button variant="link" className="text-black font-bold p-0 group-hover:underline">
                Join Studio <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
      
      <div className="absolute bottom-8 text-xs text-gray-600">
         High-Fidelity Simulation • v0.1.0-mvp
      </div>
    </div>
  );
}
