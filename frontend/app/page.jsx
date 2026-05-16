"use client";

import { useEffect, useState } from "react";
import API from "../lib/api";
import JobCard from "../components/JobCard";

const isCanceledError = (error) =>
  error?.code === "ERR_CANCELED" ||
  error?.code === "ECONNABORTED" ||
  error?.name === "CanceledError";

export default function HomePage() {
  const [jobs, setJobs] = useState([]);
  const [category, setCategory] = useState("");
  const [keyword, setKeyword] = useState("");
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const controller = new AbortController();

    const fetchCategories = async () => {
      try {
        const res = await API.get("/categories", {
          signal: controller.signal,
        });
        setCategories(res.data);
      } catch (error) {
        if (isCanceledError(error)) return;
        console.error("Fetch categories failed:", error);
      }
    };

    void fetchCategories();

    return () => controller.abort();
  }, []);

  useEffect(() => {
    const controller = new AbortController();

    const fetchJobs = async () => {
      try {
        const params = new URLSearchParams();
        if (keyword) params.set("keyword", keyword);
        if (category) params.set("category", category);

        const queryString = params.toString();
        const url = queryString ? `/jobs?${queryString}` : "/jobs";

        const res = await API.get(url, { signal: controller.signal });
        setJobs(res.data);
      } catch (error) {
        if (isCanceledError(error)) return;
        console.error("Fetch jobs failed:", error);
      }
    };

    void fetchJobs();

    return () => controller.abort();
  }, [category, keyword]);

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div className="text-center md:text-left">
          <p className="text-sm text-purple-200/80">Dashboard</p>
          <h1 className="text-3xl md:text-4xl font-semibold text-white">
            Service Requests
          </h1>
          <p className="mt-2 text-sm text-slate-300">
            ServiceBoard keeps service requests organized with clear ownership,
            status tracking, and easy search.
          </p>
        </div>

        <div className="flex flex-col gap-3 md:flex-row md:items-center">
          <input
            className="bg-white/10 border border-white/15 text-white placeholder:text-slate-300 px-4 py-2 rounded-xl shadow-lg shadow-purple-900/20 focus:outline-none focus:ring-2 focus:ring-purple-400/60 text-center md:text-left"
            placeholder="Search by title or description"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
          />
          <select
            className="bg-white/10 border border-white/15 text-white px-4 py-2 rounded-xl shadow-lg shadow-purple-900/20 focus:outline-none focus:ring-2 focus:ring-purple-400/60 text-center md:text-left"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="">All categories</option>
            {categories.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {jobs.map((job) => (
          <JobCard key={job._id} job={job} />
        ))}
      </div>
    </div>
  );
}
