"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { useMockStore } from "@/lib/store/mock-store";

export function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const { currentUser, toggleRole } = useMockStore();

  const handleSidebarToggle = () => {
    const newRole = currentUser.role === 'recruiter' ? 'candidate' : 'recruiter';
    toggleRole(newRole);
    if (newRole === 'candidate') {
      router.push('/candidate/studio');
    } else {
      router.push('/recruiter/shop');
    }
  };

  const handleLogout = () => {
    // #region agent log
    fetch('http://127.0.0.1:7242/ingest/036c062f-3f55-468a-b71c-bda78627eb97',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'Sidebar.tsx:25',message:'handleLogout called',data:{currentRole:currentUser.role},timestamp:Date.now(),sessionId:'debug-session',runId:'run2',hypothesisId:'A'})}).catch(()=>{});
    // #endregion
    router.push('/');
  };

  const recruiterLinks = [
    { href: "/recruiter/shop", label: "Talent Shop", icon: "storefront" },
    { href: "/recruiter/events/live", label: "Live Monitor", icon: "video_camera_front" },
    { href: "/recruiter/dashboard", label: "Analytics", icon: "analytics" },
  ];

  const candidateLinks = [
    { href: "/candidate/studio", label: "Creator Studio", icon: "palette" },
    { href: "/candidate/events", label: "The Gauntlet", icon: "swords" },
    { href: "/candidate/dashboard", label: "My Wallet", icon: "account_balance_wallet" },
  ];

  const links = currentUser.role === 'recruiter' ? recruiterLinks : candidateLinks;

  return (
    <aside className="group/sidebar flex flex-col h-full w-72 bg-[#111621] border-r border-slate-800 transition-all duration-300 relative shrink-0">
      {/* Header */}
      <div className="flex items-center justify-between p-6 pb-2">
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center size-10 rounded-xl bg-[#16439c] shadow-lg shadow-blue-900/20 text-white">
            <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>all_inclusive</span>
          </div>
          <div className="flex flex-col">
            <h1 className="text-xl font-bold text-white tracking-tight">QuietHR</h1>
            <span className="text-xs text-slate-400 font-medium">Enterprise Suite</span>
          </div>
        </div>
      </div>

      {/* Role Indicator */}
      <div className="px-6 py-4">
        <div 
          onClick={handleSidebarToggle}
          className="flex items-center justify-between p-3 rounded-xl bg-slate-800/50 border border-slate-700/50 backdrop-blur-sm cursor-pointer hover:bg-slate-800 transition-colors group/role"
        >
          <div className="flex items-center gap-3">
            <div className="size-8 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-xs font-bold text-white border border-white/10 group-hover/role:scale-105 transition-transform">
              {currentUser.role === 'recruiter' ? 'R' : 'C'}
            </div>
            <div className="flex flex-col">
              <span className="text-xs font-semibold text-slate-300 uppercase tracking-wider">Workspace</span>
              <div className="flex items-center gap-2">
                <span className="text-sm font-bold text-white capitalize">{currentUser.role}</span>
                <span className="flex h-2 w-2 relative">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                </span>
              </div>
            </div>
          </div>
          <span className="material-symbols-outlined text-slate-500 text-sm group-hover/role:text-white transition-colors">swap_horiz</span>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 overflow-y-auto py-2 space-y-8">
        <div>
          <div className="px-4 mb-2 text-xs font-bold text-slate-500 uppercase tracking-widest">Main Menu</div>
          <ul className="flex flex-col gap-1">
            {links.map((link) => {
              const isActive = pathname.startsWith(link.href);
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={cn(
                      "flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group",
                      isActive 
                        ? "bg-[#16439c] text-white shadow-md shadow-blue-900/10" 
                        : "text-slate-400 hover:text-white hover:bg-slate-800/50"
                    )}
                  >
                    <span className={cn(
                      "material-symbols-outlined text-[22px] transition-colors",
                      isActive ? "fill-current" : "group-hover:text-[#16439c]"
                    )} style={{ fontVariationSettings: isActive ? "'FILL' 1" : "'FILL' 0" }}>
                      {link.icon}
                    </span>
                    <span className="font-medium text-sm">{link.label}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-slate-800">
        <div 
          onClick={handleLogout}
          className="flex items-center gap-3 p-3 rounded-xl hover:bg-slate-800/50 transition-colors group cursor-pointer"
        >
          <div className="relative">
            <div className="size-10 rounded-full bg-slate-700 bg-cover bg-center border-2 border-slate-600 group-hover:border-[#16439c] transition-colors" 
                 style={{ backgroundImage: "url('https://api.dicebear.com/7.x/avataaars/svg?seed=Felix')" }}></div>
            <div className="absolute bottom-0 right-0 size-3 bg-green-500 border-2 border-[#111621] rounded-full"></div>
          </div>
          <div className="flex flex-col flex-1 overflow-hidden">
            <span className="text-sm font-semibold text-white truncate">Demo User</span>
            <span className="text-xs text-slate-400 truncate">Online</span>
          </div>
          <span className="material-symbols-outlined text-slate-500 group-hover:text-white">logout</span>
        </div>
      </div>
    </aside>
  );
}
