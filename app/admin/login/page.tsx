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
    <main className="min-h-screen bg-neutral-50 flex items-center justify-center py-20">
      <Container>
        <div className="max-w-md mx-auto bg-white p-12 shadow-sm border border-neutral-100">
          <div className="text-center mb-10">
            <h1 className="font-serif text-3xl mb-2">Admin Login</h1>
            <p className="text-neutral-400 text-sm uppercase tracking-widest">DesignOne Studio</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="bg-red-50 text-red-500 p-4 text-sm border border-red-100">
                {error}
              </div>
            )}
            <div>
              <label className="block text-[10px] uppercase tracking-widest text-neutral-400 mb-2">Email Address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border-b border-neutral-200 py-3 focus:border-neutral-900 outline-none transition-colors font-light"
                required
              />
            </div>
            <div>
              <label className="block text-[10px] uppercase tracking-widest text-neutral-400 mb-2">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full border-b border-neutral-200 py-3 focus:border-neutral-900 outline-none transition-colors font-light"
                required
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-neutral-900 text-white py-4 text-[11px] uppercase tracking-widest hover:bg-neutral-800 transition-colors disabled:bg-neutral-400"
            >
              {loading ? "Authenticating..." : "Login"}
            </button>
          </form>
        </div>
      </Container>
    </main>
  );
}
