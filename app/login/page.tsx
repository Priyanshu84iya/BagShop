"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/AuthContext";
import BrutalInput from "@/components/BrutalInput";
import BrutalButton from "@/components/BrutalButton";
import Link from "next/link";

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const success = login(formData.email, formData.password);

    if (success) {
      router.push("/");
    } else {
      setError("Invalid email or password. Please try again.");
    }
  };

  return (
    <div className="py-12">
      <div className="container mx-auto px-4 max-w-md">
        <div className="border-4 border-black bg-brutal-yellow p-8 shadow-brutal-lg mb-8 text-center">
          <h1 className="font-brutal text-5xl mb-4">LOGIN</h1>
          <p className="font-mono">WELCOME BACK, BRUTAL ONE!</p>
        </div>

        <div className="border-4 border-black bg-white p-8 shadow-brutal">
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="border-4 border-black bg-brutal-pink text-white p-4">
                <p className="font-mono text-sm">{error}</p>
              </div>
            )}

            <div>
              <label className="font-brutal text-lg mb-2 block">EMAIL</label>
              <BrutalInput
                name="email"
                type="email"
                placeholder="your@email.com"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <label className="font-brutal text-lg mb-2 block">PASSWORD</label>
              <BrutalInput
                name="password"
                type="password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>

            <BrutalButton type="submit" fullWidth>
              LOGIN
            </BrutalButton>
          </form>

          <div className="mt-6 text-center">
            <p className="font-mono text-sm mb-2">DON'T HAVE AN ACCOUNT?</p>
            <Link
              href="/signup"
              className="font-brutal text-lg hover:text-brutal-pink transition-colors"
            >
              CREATE ACCOUNT →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
