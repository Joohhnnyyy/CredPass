import { ArrowUp, ChevronLeft } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { TypewriterText } from "@/components/ui/typewriter-text";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="grid min-h-screen w-full lg:grid-cols-2">
      {/* Left Column - Auth Form */}
      <div className="flex flex-col justify-center bg-black px-4 py-12 sm:px-6 lg:px-20 xl:px-24 relative">
        <div className="absolute top-8 left-8 lg:left-12 flex items-center gap-6">
           <Link href="/" className="flex items-center gap-2 text-zinc-400 hover:text-white transition-colors group">
              <ChevronLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
              <span className="text-sm font-medium">Back</span>
           </Link>
           <Image 
             src="/CredPass_logo.png" 
             alt="CredPass Logo" 
             width={160} 
             height={160} 
             className="h-20 w-auto rounded-lg object-contain"
           />
        </div>
        <div className="w-full max-w-md mx-auto lg:mx-0">
            {children}
        </div>
      </div>

      {/* Right Column - Visual */}
      <div className="hidden lg:flex flex-col items-center justify-center bg-[#010107] p-12 relative overflow-hidden">
        {/* Background Gradient from Preloader */}
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
            <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] bg-[#a855f7] rounded-full mix-blend-screen filter blur-[80px] opacity-70 animate-blob-1" />
            <div className="absolute top-[-10%] right-[-10%] w-[50vw] h-[50vw] bg-[#ff3e88] rounded-full mix-blend-screen filter blur-[80px] opacity-60 animate-blob-2" />
            <div className="absolute bottom-[-20%] left-[20%] w-[60vw] h-[60vw] bg-[#3b82f6] rounded-full mix-blend-screen filter blur-[100px] opacity-60 animate-blob-3" />
            <div className="absolute bottom-[-10%] right-[-10%] w-[50vw] h-[50vw] bg-[#c084fc] rounded-full mix-blend-screen filter blur-[80px] opacity-70 animate-blob-4" />
            <div className="absolute top-[20%] left-[30%] w-[40vw] h-[40vw] bg-[#ec4899] rounded-full mix-blend-screen filter blur-[90px] opacity-50 animate-blob-5" />
            <div className="absolute bottom-[20%] right-[30%] w-[45vw] h-[45vw] bg-[#3d318c] rounded-full mix-blend-screen filter blur-[90px] opacity-50 animate-blob-6" />
            <div className="absolute inset-0 bg-black/10 backdrop-blur-[2px]" />
        </div>

        <div className="w-full max-w-lg relative z-10">
             <div className="relative rounded-2xl bg-white/90 p-2 shadow-2xl backdrop-blur-sm">
                <div className="flex items-center justify-between pl-4 pr-2 py-2">
                   <div className="flex items-center gap-1">
                     <TypewriterText 
                       texts={[
"CredPass to carry your financial trust",
"CredPass to make trust portable",
"CredPass to unlock global credibility",
"CredPass to move forward, not restart",
"CredPass to share proof, not data",
"CredPass to verify without exposure",
"CredPass to explain your financial story",
"CredPass to simplify verification",
"CredPass to start strong anywhere",
"CredPass to protect what matters",
"CredPass to control your financial data",
"CredPass to turn history into trust",
"CredPass to build trust without oversharing",
"CredPass to accelerate onboarding",
"CredPass to verify once, use everywhere"

                       ]}
                       className="text-zinc-800 font-medium text-lg"
                     />
                     <div className="w-[2px] h-5 bg-blue-500 animate-pulse ml-0.5"></div>
                   </div>
                   <div className="h-10 w-10 bg-black rounded-full flex items-center justify-center shadow-lg transform transition-transform hover:scale-105 cursor-pointer">
                      <ArrowUp className="text-white w-5 h-5" />
                   </div>
                </div>
             </div>
        </div>
      </div>
    </div>
  );
}
