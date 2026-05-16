"use client";

import { useContext, useEffect, useState } from "react";
import API from "../../../lib/api";
import { useParams, useRouter } from "next/navigation";
import { AuthContext } from "../../../context/AuthContext";

const isCanceledError = (error) =>
  error?.code === "ERR_CANCELED" ||
  error?.code === "ECONNABORTED" ||
  error?.name === "CanceledError";

export default function JobDetail() {
  const { id } = useParams();
  const router = useRouter();
  const { user } = useContext(AuthContext);
  const [job, setJob] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const controller = new AbortController();

    const fetchJob = async () => {
      try {
        const res = await API.get(`/jobs/${id}`, {
          signal: controller.signal,
        });
        setJob(res.data);
      } catch (err) {
        if (isCanceledError(err)) return;
        setError(err?.response?.data?.message || "Failed to load job.");
      }
    };

    void fetchJob();

    return () => controller.abort();
  }, [id]);

  const updateStatus = async (status) => {
    try {
      setError("");
      const res = await API.patch(`/jobs/${id}`, { status });
      setJob(res.data);
    } catch (err) {
      setError(
        err?.response?.data?.message || "Only the creator can update this job.",
      );
    }
  };

  const deleteJob = async () => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this job?",
    );
    if (!confirmed) return;
    try {
      setError("");
      await API.delete(`/jobs/${id}`);
      router.push("/");
    } catch (err) {
      setError(
        err?.response?.data?.message || "Only the creator can delete this job.",
      );
    }
  };

  if (!job) return <p className="p-4 text-slate-200">Loading...</p>;

  const isOwner = user && job && String(job.createdBy) === String(user._id);

  return (
    <div className="max-w-2xl mx-auto bg-white/10 border border-white/15 p-6 rounded-2xl shadow-xl shadow-purple-900/30 backdrop-blur-xl space-y-4">
      <h1 className="text-3xl font-semibold text-white">{job.title}</h1>
      <p className="text-slate-200">{job.description}</p>

      {error ? (
        <p className="text-sm text-amber-200 bg-amber-500/10 border border-amber-500/30 p-2 rounded-lg">
          {error}
        </p>
      ) : null}

      {user && isOwner ? (
        <>
          <select
            value={job.status}
            onChange={(e) => updateStatus(e.target.value)}
            className="bg-white/10 border border-white/15 text-white p-2.5 rounded-xl w-full"
          >
            <option>Open</option>
            <option>In Progress</option>
            <option>Closed</option>
          </select>

          <button
            onClick={deleteJob}
            className="bg-rose-500 text-white w-full p-2.5 rounded-xl shadow-lg shadow-rose-900/30 hover:opacity-90 transition"
          >
            Delete
          </button>
        </>
      ) : user ? (
        <p className="text-sm text-amber-200">
          Only the creator can update or delete this job.
        </p>
      ) : (
        <p className="text-sm text-slate-300">
          Log in to update status or delete this job.
        </p>
      )}
    </div>
  );
}
