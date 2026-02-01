"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/AuthContext";
import BrutalInput from "@/components/BrutalInput";
import BrutalButton from "@/components/BrutalButton";
import Link from "next/link";

export default function SignupPage() {
  const router = useRouter();
  const { signup } = useAuth();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
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

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords don't match!");
      return;
    }

    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters!");
      return;
    }

    const success = signup(formData.name, formData.email, formData.password);

    if (success) {
      router.push("/");
    } else {
      setError("Email already exists. Please login instead.");
    }
  };

  return (
    <div className="py-12">
      <div className="container mx-auto px-4 max-w-md">
        <div className="border-4 border-black bg-brutal-cyan p-8 shadow-brutal-lg mb-8 text-center">
          <h1 className="font-brutal text-5xl mb-4">SIGN UP</h1>
          <p className="font-mono">JOIN THE BRUTAL REVOLUTION!</p>
        </div>

        <div className="border-4 border-black bg-white p-8 shadow-brutal">
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="border-4 border-black bg-brutal-pink text-white p-4">
                <p className="font-mono text-sm">{error}</p>
              </div>
            )}

            <div>
              <label className="font-brutal text-lg mb-2 block">FULL NAME</label>
              <BrutalInput
                name="name"
                type="text"
                placeholder="JOHN DOE"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>

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
                placeholder="At least 6 characters"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <label className="font-brutal text-lg mb-2 block">
                CONFIRM PASSWORD
              </label>
              <BrutalInput
                name="confirmPassword"
                type="password"
                placeholder="Re-enter password"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
              />
            </div>

            <BrutalButton type="submit" fullWidth>
              CREATE ACCOUNT
            </BrutalButton>
          </form>

          <div className="mt-6 text-center">
            <p className="font-mono text-sm mb-2">ALREADY HAVE AN ACCOUNT?</p>
            <Link
              href="/login"
              className="font-brutal text-lg hover:text-brutal-pink transition-colors"
            >
              LOGIN →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
