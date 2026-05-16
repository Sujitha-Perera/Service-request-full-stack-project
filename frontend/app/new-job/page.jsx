"use client";

import { useState } from "react";
import API from "../../lib/api";
import { useRouter } from "next/navigation";

export default function NewJob() {
  const router = useRouter();
  const [form, setForm] = useState({
    title: "",
    description: "",
    category: "",
    location: "",
    contactName: "",
    contactEmail: "",
  });

  const submit = async (e) => {
    e.preventDefault();
    await API.post("/jobs", form);
    router.push("/");
  };

  return (
    <div className="max-w-2xl mx-auto bg-white/10 border border-white/15 p-6 rounded-2xl shadow-xl shadow-purple-900/30 backdrop-blur-xl space-y-4">
      <h1 className="text-2xl font-semibold text-white">Create Job</h1>

      <form onSubmit={submit} className="space-y-3">
        <input
          className="bg-white/10 border border-white/15 text-white placeholder:text-slate-300 p-2.5 w-full rounded-xl"
          placeholder="Title"
          onChange={(e) => setForm({ ...form, title: e.target.value })}
        />

        <textarea
          className="bg-white/10 border border-white/15 text-white placeholder:text-slate-300 p-2.5 w-full rounded-xl"
          placeholder="Description"
          onChange={(e) => setForm({ ...form, description: e.target.value })}
        />

        <input
          className="bg-white/10 border border-white/15 text-white placeholder:text-slate-300 p-2.5 w-full rounded-xl"
          placeholder="Category"
          onChange={(e) => setForm({ ...form, category: e.target.value })}
        />

        <input
          className="bg-white/10 border border-white/15 text-white placeholder:text-slate-300 p-2.5 w-full rounded-xl"
          placeholder="Location"
          onChange={(e) => setForm({ ...form, location: e.target.value })}
        />

        <input
          className="bg-white/10 border border-white/15 text-white placeholder:text-slate-300 p-2.5 w-full rounded-xl"
          placeholder="Name"
          onChange={(e) => setForm({ ...form, contactName: e.target.value })}
        />

        <input
          className="bg-white/10 border border-white/15 text-white placeholder:text-slate-300 p-2.5 w-full rounded-xl"
          placeholder="Email"
          onChange={(e) => setForm({ ...form, contactEmail: e.target.value })}
        />

        <button className="bg-gradient-to-r from-purple-500 via-fuchsia-500 to-indigo-500 text-white w-full p-2.5 rounded-xl shadow-lg shadow-purple-900/30 hover:opacity-90 transition">
          Submit
        </button>
      </form>
    </div>
  );
}
