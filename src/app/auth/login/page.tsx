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
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-8"
    >
      <div className="space-y-2">
        <h2 className="text-3xl font-bold tracking-tight text-white font-display">Log in</h2>
        <p className="text-sm text-zinc-400 font-light">Login to your CredPass account</p>
      </div>

      <div className="grid grid-cols-4 gap-4">
        <Button
          type="button"
          variant="outline"
          onClick={() => supabase.auth.signInWithOAuth({ provider: 'google', options: { redirectTo: `${window.location.origin}/auth/callback` } })}
          className="bg-zinc-900 border-white/10 hover:bg-white/10 hover:text-white h-12 rounded-full transition-all"
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24">
            <path
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              fill="#4285F4"
            />
            <path
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              fill="#34A853"
            />
            <path
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              fill="#FBBC05"
            />
            <path
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              fill="#EA4335"
            />
          </svg>
        </Button>
        <Button
          type="button"
          variant="outline"
          onClick={() => supabase.auth.signInWithOAuth({ provider: 'apple', options: { redirectTo: `${window.location.origin}/auth/callback` } })}
          className="bg-zinc-900 border-white/10 hover:bg-white/10 hover:text-white h-12 rounded-full transition-all"
        >
          <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
            <path d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.403-2.363-2.006-.155-3.688 1.04-4.649 1.04zm4.961-4.474c.831-1.006 1.39-2.408 1.234-3.811-1.195.052-2.643.798-3.5 1.791-.766.896-1.448 2.338-1.273 3.714 1.338.104 2.715-.681 3.539-1.694z" />
          </svg>
        </Button>
        <Button
          type="button"
          variant="outline"
          onClick={() => supabase.auth.signInWithOAuth({ provider: 'facebook', options: { redirectTo: `${window.location.origin}/auth/callback` } })}
          className="bg-zinc-900 border-white/10 hover:bg-white/10 hover:text-white h-12 rounded-full transition-all"
        >
          <svg className="w-5 h-5 fill-current text-[#1877F2]" viewBox="0 0 24 24">
            <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
          </svg>
        </Button>
        <Button
          type="button"
          variant="outline"
          onClick={() => supabase.auth.signInWithOAuth({ provider: 'twitter', options: { redirectTo: `${window.location.origin}/auth/callback` } })}
          className="bg-zinc-900 border-white/10 hover:bg-white/10 hover:text-white h-12 rounded-full transition-all"
        >
          <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
          </svg>
        </Button>
      </div>

      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t border-white/10" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-black px-2 text-zinc-500 font-medium tracking-wider">OR</span>
        </div>
      </div>

      <form className="space-y-6" onSubmit={handleLogin}>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label className="text-xs text-zinc-400 font-medium" htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              required
              className="bg-zinc-900/50 border-white/10 text-white placeholder:text-zinc-600 rounded-2xl h-11 focus:border-white/20 focus:ring-0 transition-all"
              placeholder="name@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label className="text-xs text-zinc-400 font-medium" htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              required
              className="bg-zinc-900/50 border-white/10 text-white placeholder:text-zinc-600 rounded-2xl h-11 focus:border-white/20 focus:ring-0 transition-all"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        </div>

        <Button
          type="submit"
          className="w-full bg-white text-black hover:bg-zinc-200 rounded-full font-medium h-11 text-sm transition-all"
          disabled={loading}
        >
          {loading ? "Authenticating..." : "Login"}
        </Button>
      </form>
      
      <div className="text-center space-y-2">
        <p className="text-xs text-zinc-500">
          Don&apos;t have an account?{" "}
          <Link href="/auth/signup" className="text-white hover:underline">
            Create your account
          </Link>
        </p>
        <p className="text-xs text-zinc-600">
          <span className="opacity-70">SSO available on</span> <Link href="#" className="underline hover:text-zinc-500">Business and Enterprise</Link> <span className="opacity-70">plans</span>
        </p>
      </div>
    </motion.div>
  );
}
