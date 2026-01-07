"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { motion } from "framer-motion";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const supabase = createClient();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      toast.error(error.message);
    } else {
      toast.success("Logged in successfully!");
      router.push("/");
      router.refresh();
    }
    setLoading(false);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#010107] px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md space-y-8 rounded-none bg-white/5 p-8 backdrop-blur-xl border border-white/10"
      >
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight text-white font-mono uppercase">Welcome Back</h2>
          <p className="mt-2 text-xs text-gray-400 font-mono uppercase tracking-wider">Login to your AI banking account</p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleLogin}>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label className="text-[10px] text-gray-400 font-mono uppercase tracking-[0.2em]" htmlFor="email">Email address</Label>
              <Input
                id="email"
                type="email"
                required
                className="bg-white/5 border-white/10 text-white placeholder:text-gray-600 rounded-none font-mono text-sm"
                placeholder="YOU@EXAMPLE.COM"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label className="text-[10px] text-gray-400 font-mono uppercase tracking-[0.2em]" htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                required
                className="bg-white/5 border-white/10 text-white placeholder:text-gray-600 rounded-none font-mono text-sm"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <Button
            type="submit"
            className="w-full bg-white text-black hover:bg-white/90 rounded-none font-mono uppercase tracking-widest h-12"
            disabled={loading}
          >
            {loading ? "AUTHENTICATING..." : "LOGIN"}
          </Button>
        </form>
        <div className="text-center pt-4">
          <p className="text-[10px] text-gray-500 font-mono uppercase tracking-widest">
            Don&apos;t have an account?{" "}
            <Link href="/auth/signup" className="text-white hover:underline">
              Sign up
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
}
