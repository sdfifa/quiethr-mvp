"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useMockStore } from "@/lib/store/mock-store";
import { Upload, Loader2, Zap } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

export default function CreatorStudioPage() {
  const { candidates, simulateUpload } = useMockStore();
  const { toast } = useToast();
  
  // Use first candidate as "me"
  const me = candidates[0];
  const [isUploading, setIsUploading] = useState(false);

  const handleUpload = async () => {
    setIsUploading(true);
    await simulateUpload();
    setIsUploading(false);
    toast({
      title: "Builder Badge Unlocked",
      description: "Market Value Score increased by 10 points!",
      className: "bg-[#FFD700] text-black border-none font-bold shadow-lg"
    });
  };

  return (
    <div className="p-8 max-w-5xl mx-auto space-y-8 text-white">
      <div>
        <h1 className="text-3xl font-bold">Creator Studio</h1>
        <p className="text-gray-400">Upload projects to boost your visibility.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Score Dial */}
        <Card className="border border-white/10 bg-white/5 backdrop-blur">
          <CardHeader>
            <CardTitle className="text-white">Market Value Score</CardTitle>
            <CardDescription className="text-gray-400">AI-Calculated Potential</CardDescription>
          </CardHeader>
          <CardContent className="flex justify-center py-8">
            <div className="relative w-48 h-48 flex items-center justify-center">
              <svg className="absolute w-full h-full -rotate-90" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="45" stroke="#333" strokeWidth="6" fill="none" />
                <motion.circle
                  cx="50" cy="50" r="45"
                  stroke="#FFD700"
                  strokeWidth="6"
                  fill="none"
                  strokeLinecap="round"
                  strokeDasharray="283"
                  initial={{ strokeDashoffset: 283 }}
                  animate={{ strokeDashoffset: 283 - (283 * me.market_value_score) / 100 }}
                  transition={{ duration: 1.5, ease: "easeOut" }}
                />
              </svg>
              <div className="text-center absolute">
                <span className="text-5xl font-bold block text-white">{me.market_value_score}</span>
                <span className="text-xs uppercase text-gray-500 tracking-widest">Score</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Dropzone */}
        <div 
          onClick={!isUploading ? handleUpload : undefined}
          className="border border-dashed border-white/20 rounded-xl bg-white/5 hover:bg-white/10 transition-all flex flex-col items-center justify-center p-12 cursor-pointer group"
        >
          {isUploading ? (
            <div className="text-center space-y-4">
              <div className="relative">
                <div className="h-16 w-16 rounded-full border-4 border-[#FFD700]/30 border-t-[#FFD700] animate-spin mx-auto" />
                <Zap className="h-6 w-6 text-[#FFD700] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-pulse" />
              </div>
              <p className="font-bold text-[#FFD700]">AI Analyzing Code...</p>
            </div>
          ) : (
            <div className="text-center space-y-2 group-hover:scale-105 transition-transform">
              <div className="h-16 w-16 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-[#FFD700] transition-colors">
                 <Upload className="h-8 w-8 text-gray-400 group-hover:text-black" />
              </div>
              <p className="font-bold text-lg">Drop Project Files</p>
              <p className="text-sm text-gray-400">
                <span className="text-[#FFD700]">+10 Points</span> per verified upload.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
