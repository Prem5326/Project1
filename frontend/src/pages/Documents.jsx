import React, { useEffect, useState } from "react";

export default function Documents() {
  const [docs, setDocs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");

  const token = localStorage.getItem("token");

  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch((import.meta.env.VITE_API_URL || "http://localhost:5000") + "/api/docs", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const body = await res.json();
        if (!res.ok) throw new Error(body.message || "Failed to load");
        setDocs(body.documents || []);
      } catch (e) {
        setErr(e.message || "Error");
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [token]);

  if (loading) return <div>Loading...</div>;
  if (err) return <div className="text-red-600">{err}</div>;
  if (!docs.length) return <div>No documents available.</div>;

  return (
    <div>
      <h2 className="text-lg font-bold mb-4">Documents</h2>
      <ul className="space-y-3">
        {docs.map((d) => (
          <li key={d._id} className="p-3 border rounded flex justify-between items-center">
            <div>
              <div className="font-medium">{d.originalName}</div>
              <div className="text-sm text-gray-500">Uploaded by: {d.uploadedBy?.name || "Unknown"}</div>
            </div>
            <div className="space-x-2">
              <a
                href={(import.meta.env.VITE_API_URL || "http://localhost:5000") + `/api/docs/${d._id}/download`}
                className="px-3 py-1 border rounded text-sm"
                target="_blank"
                rel="noopener noreferrer"
              >
                Download
              </a>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
