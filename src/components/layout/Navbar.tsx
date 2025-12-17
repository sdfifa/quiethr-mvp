"use client";

import { useRouter } from "next/navigation";
import { useMockStore, Role } from "@/lib/store/mock-store";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown, UserCircle, Wallet } from "lucide-react";

export function Navbar() {
  const { currentUser, toggleRole } = useMockStore();
  const router = useRouter();

  const handleRoleSwitch = (role: Role) => {
    toggleRole(role);
    if (role === 'candidate') {
      router.push('/candidate/studio');
    } else {
      router.push('/recruiter/shop');
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-[#0F0F0F]/95 backdrop-blur">
      <div className="container flex h-16 items-center justify-between px-6">
        <div className="flex items-center gap-2 font-bold text-xl tracking-tighter text-white">
          Quiet<span className="text-[#FFD700]">HR</span>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex flex-col items-end text-xs">
             <span className="text-gray-400">Wallet</span>
             <span className="font-bold text-[#FFD700] flex items-center gap-1">
               <Wallet className="h-3 w-3" /> ${currentUser.wallet}
             </span>
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="gap-2 border-white/20 bg-transparent text-white hover:bg-white/10 hover:text-white">
                <UserCircle className="h-4 w-4" />
                <span className="capitalize hidden md:inline">{currentUser.role} View</span>
                <ChevronDown className="h-4 w-4 text-gray-400" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48 bg-[#1a1a1a] border-white/10 text-white">
              <DropdownMenuItem className="focus:bg-white/10 focus:text-white cursor-pointer" onClick={() => handleRoleSwitch('candidate')}>
                Act as Candidate
              </DropdownMenuItem>
              <DropdownMenuItem className="focus:bg-white/10 focus:text-white cursor-pointer" onClick={() => handleRoleSwitch('recruiter')}>
                Act as Recruiter
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
