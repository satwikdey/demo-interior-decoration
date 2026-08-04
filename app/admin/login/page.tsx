"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Container } from "@/components/Container";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (result?.error) {
      setError("Invalid credentials");
      setLoading(false);
    } else {
      router.push("/admin/dashboard");
      router.refresh();
    }
  };

  return (
    <main className="min-h-screen bg-[#DFD6CD] flex items-center justify-center py-20">
      <Container>
        <div className="max-w-md mx-auto bg-[#DFD6CD] p-12 shadow-sm border border-[#9A8E84]/20">
          <div className="text-center mb-10">
            <h1 className="font-serif text-3xl mb-2">Admin Login</h1>
            <p className="text-[#9A8E84] text-sm uppercase tracking-widest">DesignOne Studio</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="bg-[#9A8E84]/15 text-[#6A5A49] p-4 text-sm border border-[#9A8E84]/35">
                {error}
              </div>
            )}
            <div>
              <label className="block text-[10px] uppercase tracking-widest text-[#9A8E84] mb-2">Email Address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border-b border-[#9A8E84]/35 py-3 focus:border-[#6A5A49] outline-none transition-colors font-light"
                required
              />
            </div>
            <div>
              <label className="block text-[10px] uppercase tracking-widest text-[#9A8E84] mb-2">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full border-b border-[#9A8E84]/35 py-3 focus:border-[#6A5A49] outline-none transition-colors font-light"
                required
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#B08E68] text-[#DFD6CD] py-4 text-[11px] uppercase tracking-widest hover:bg-[#9A8E84] transition-colors disabled:bg-[#9A8E84]"
            >
              {loading ? "Authenticating..." : "Login"}
            </button>
          </form>
        </div>
      </Container>
    </main>
  );
}
