"use client";

import { useState, useContext } from "react";
import API from "../../lib/api";
import { AuthContext } from "../../context/AuthContext";
import { useRouter } from "next/navigation";

export default function Login() {
  const { login } = useContext(AuthContext);
  const router = useRouter();

  const [form, setForm] = useState({ email: "", password: "" });

  const submit = async (e) => {
    e.preventDefault();
    const res = await API.post("/auth/login", form);

    login(res.data);
    router.push("/");
  };

  return (
    <div className="max-w-md mx-auto bg-white/10 border border-white/15 p-6 rounded-2xl shadow-xl shadow-purple-900/30 backdrop-blur-xl space-y-4 text-center">
      <h1 className="text-2xl font-semibold text-white">Login</h1>
      <p className="text-sm text-slate-300">
        Welcome back to ServiceBoard, your hub for service requests.
      </p>
      <p className="text-xs text-slate-400">
        Track requests, update statuses, and keep teams aligned in one place.
      </p>

      <form className="space-y-3" onSubmit={submit}>
        <input
          className="bg-white/10 border border-white/15 text-white placeholder:text-slate-300 p-2.5 w-full rounded-xl text-center"
          placeholder="Email"
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />

        <input
          className="bg-white/10 border border-white/15 text-white placeholder:text-slate-300 p-2.5 w-full rounded-xl text-center"
          type="password"
          placeholder="Password"
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />

        <button className="bg-gradient-to-r from-purple-500 via-fuchsia-500 to-indigo-500 text-white w-full p-2.5 rounded-xl shadow-lg shadow-purple-900/30 hover:opacity-90 transition">
          Login
        </button>
      </form>
      <p className="text-sm text-slate-300">
        New here?{" "}
        <a
          className="text-purple-200 hover:text-white transition"
          href="/register"
        >
          Create an account
        </a>
      </p>
    </div>
  );
}
