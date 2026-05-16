import Link from "next/link";

export default function JobCard({ job }) {
  const createdAtLabel = job.createdAt
    ? new Date(job.createdAt).toLocaleString()
    : "Not available";

  return (
    <Link href={`/jobs/${job._id}`}>
      <div className="bg-white/10 border border-white/15 rounded-2xl p-5 shadow-lg shadow-purple-900/20 backdrop-blur-xl hover:-translate-y-1 hover:shadow-purple-700/30 transition">
        <div className="flex items-start justify-between gap-3">
          <h2 className="text-lg font-semibold text-white">{job.title}</h2>
          <span className="text-xs bg-white/15 text-white px-2.5 py-1 rounded-full">
            {job.status}
          </span>
        </div>

        <p className="text-sm text-slate-200 mt-2">{job.description}</p>

        <div className="mt-4 space-y-1 text-sm text-slate-200">
          <p>
            <span className="text-slate-300">Category:</span> {job.category}
          </p>
          <p>
            <span className="text-slate-300">Location:</span> {job.location}
          </p>
          <p>
            <span className="text-slate-300">Contact:</span> {job.contactName}
          </p>
          <p>
            <span className="text-slate-300">Email:</span> {job.contactEmail}
          </p>
        </div>

        <p className="text-xs text-slate-400 mt-4">Created: {createdAtLabel}</p>
      </div>
    </Link>
  );
}
