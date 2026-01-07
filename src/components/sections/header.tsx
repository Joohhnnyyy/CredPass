"use client";

import React, { useState, useEffect } from "react";
import { ArrowUp, ArrowRight, X, LogOut, LogIn, User } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { sliderData } from "./HeroSlider";
import { createClient } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import Link from "next/link";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [user, setUser] = useState<any>(null);
  const router = useRouter();
  const supabase = createClient();

  useEffect(() => {
    const fetchUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
    };
    fetchUser();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, [supabase.auth]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.refresh();
  };

  const scrollToTop = (e: React.MouseEvent) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <header className="fixed top-0 left-0 w-full h-[100px] z-[100] transition-colors duration-500 bg-transparent mix-blend-difference pointer-events-none">
      <div className="relative flex items-center justify-between h-full px-[20px] lg:px-[40px] text-white w-full">
        {/* Left: Scroll to Top */}
        <div className="flex items-center gap-4 pointer-events-auto">
          <button
            onClick={scrollToTop}
            className={`flex items-center justify-center w-[40px] h-[40px] border border-white/20 rounded-none bg-transparent hover:bg-white hover:text-black transition-all duration-300 ${
              isScrolled ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4 pointer-events-none"
            }`}
            aria-label="Scroll to top"
          >
            <ArrowUp size={16} />
          </button>
        </div>

        {/* Center: Dynamic Island Menu */}
        <div className="absolute left-1/2 top-[30px] -translate-x-1/2 pointer-events-auto">
          <motion.div
            layout
            initial={false}
            animate={isOpen ? "open" : "closed"}
            variants={{
              closed: {
                width: "120px",
                height: "40px",
                borderRadius: "0px",
                backgroundColor: "rgba(255, 255, 255, 1)",
                color: "#000",
                scale: 1,
              },
              open: {
                width: "min(90vw, 400px)",
                height: "min(85vh, 600px)",
                borderRadius: "0px",
                backgroundColor: "rgba(0, 0, 0, 1)",
                color: "#fff",
                scale: 1,
              },
            }}
            transition={{
              type: "spring",
              stiffness: 26.7,
              damping: 4.1,
              mass: 0.2,
              restDelta: 0.001,
            }}
            className="relative overflow-hidden shadow-2xl flex flex-col items-center"
          >
            {/* Header of the Island */}
            <div className="flex items-center justify-center w-full h-[40px] shrink-0">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full h-full flex items-center justify-center font-mono text-[12px] uppercase tracking-widest"
              >
                {isOpen ? "Close" : "Menu"}
              </button>
            </div>

            {/* Expanded Content */}
            <AnimatePresence>
              {isOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ delay: 0.1 }}
                    className="w-full flex-1 overflow-hidden flex flex-col"
                  >
                    {/* User Auth Section */}
                    <div className="px-6 pt-6 pb-2 border-b border-white/10">
                      {user ? (
                            <div className="flex items-center justify-between p-4 rounded-none bg-white/5 border border-white/10">
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 rounded-none bg-white/10 flex items-center justify-center">
                                <User size={20} className="text-white/60" />
                              </div>
                              <div>
                                <p className="text-[13px] font-mono font-medium text-white">{user.email}</p>
                                <p className="text-[11px] font-mono text-white/40">Active Session</p>
                              </div>
                            </div>
                            <button
                              onClick={handleSignOut}
                              className="p-2 rounded-none hover:bg-white/10 transition-colors text-white/60 hover:text-white"
                              title="Sign Out"
                            >
                              <LogOut size={18} />
                            </button>
                          </div>
                        ) : (
                          <div className="grid grid-cols-2 gap-3">
                            <Link
                              href="/auth/login"
                              className="flex items-center justify-center gap-2 py-3 px-4 rounded-none bg-white text-black font-mono text-[11px] uppercase tracking-wider hover:bg-white/90 transition-all pointer-events-auto"
                              onClick={() => setIsOpen(false)}
                            >
                              <LogIn size={14} />
                              Login
                            </Link>
                            <Link
                              href="/auth/signup"
                              className="flex items-center justify-center gap-2 py-3 px-4 rounded-none bg-white/5 border border-white/10 text-white font-mono text-[11px] uppercase tracking-wider hover:bg-white/10 transition-all pointer-events-auto"
                              onClick={() => setIsOpen(false)}
                            >
                              Signup
                            </Link>
                          </div>
                        )}
                      </div>
  
                      <div className="px-6 py-4 flex-1 overflow-y-auto custom-scrollbar">
  
                      <div className="flex flex-col gap-4">
                        {sliderData.map((item) => (
                          <div
                            key={item.id}
                            className="group flex items-center gap-6 p-4 rounded-none hover:bg-white/5 transition-colors cursor-pointer border-b border-white/10"
                          >
                            <span className="text-[32px] font-mono font-bold text-white/20 group-hover:text-white transition-colors leading-none shrink-0 w-8">
                              {item.id}
                            </span>
                            <div className="flex-1 flex items-center justify-between">
                              <h3 className="text-[13px] font-mono font-medium leading-snug whitespace-pre-line group-hover:text-white transition-colors">
                                {item.title.replace(/\n/g, " ")}
                              </h3>
                              <div className="w-12 h-12 rounded-none overflow-hidden shrink-0 border border-white/10">
                                <img src={item.image} alt="" className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all" />
                              </div>
                            </div>
                          </div>
                        ))}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>

        {/* Right: Branding & Full Article CTA */}
        <div className="flex items-center gap-6 pointer-events-auto">
          <a
            href="https://videinfra.com/"
            className="hidden md:flex items-center gap-2 group"
          >
            <span className="text-[14px] text-white/60 font-medium lowercase italic">by</span>
            <span className="text-[14px] font-bold tracking-tight uppercase group-hover:text-white/80 transition-colors duration-300">
              Vide Infra
            </span>
          </a>

          <a
            href="https://videinfra.com/blog/17-ai-powered-features-that-will-revolutionize-banking-ux"
            className="flex items-center justify-center h-[40px] px-6 bg-white text-black font-mono text-[11px] uppercase tracking-widest hover:opacity-80 transition-all duration-500"
          >
            Full Article
          </a>
        </div>
      </div>
    </header>
  );
};

export default Header;
