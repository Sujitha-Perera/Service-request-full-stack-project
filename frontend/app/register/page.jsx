"use client";

import { useState } from "react";
import API from "../../lib/api";
import { useRouter } from "next/navigation";

export default function Register() {
  const router = useRouter();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const submit = async (e) => {
    e.preventDefault();

    try {
      await API.post("/auth/register", form);
      router.push("/login");
    } catch (err) {
      alert(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white/10 border border-white/15 p-6 rounded-2xl shadow-xl shadow-purple-900/30 backdrop-blur-xl space-y-4 text-center">
      <h1 className="text-2xl font-semibold text-white">Register</h1>
      <p className="text-sm text-slate-300">
        Join ServiceBoard to create and track service requests in real time.
      </p>
      <p className="text-xs text-slate-400">
        Stay organized with category filtering, status updates, and clear
        ownership.
      </p>

      <form onSubmit={submit} className="space-y-3">
        <input
          className="bg-white/10 border border-white/15 text-white placeholder:text-slate-300 p-2.5 w-full rounded-xl text-center"
          placeholder="Name"
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />

        <input
          className="bg-white/10 border border-white/15 text-white placeholder:text-slate-300 p-2.5 w-full rounded-xl text-center"
          placeholder="Email"
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />

        <input
          type="password"
          className="bg-white/10 border border-white/15 text-white placeholder:text-slate-300 p-2.5 w-full rounded-xl text-center"
          placeholder="Password"
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />

        <button className="bg-gradient-to-r from-purple-500 via-fuchsia-500 to-indigo-500 text-white w-full p-2.5 rounded-xl shadow-lg shadow-purple-900/30 hover:opacity-90 transition">
          Create Account
        </button>
      </form>
      <p className="text-sm text-slate-300">
        Already have an account?{" "}
        <a
          className="text-purple-200 hover:text-white transition"
          href="/login"
        >
          Sign in
        </a>
      </p>
    </div>
  );
}
