import React, { useState, useEffect } from "react";

export default function AdminUpload() {
  const [file, setFile] = useState(null);
  const [msg, setMsg] = useState("");
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;
    fetch((import.meta.env.VITE_API_URL || "http://localhost:5000") + "/api/auth/me", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((r) => r.json())
      .then((b) => {
        if (b.user) setUser(b.user);
      })
      .catch(() => {});
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMsg("");
    if (!file) return setMsg("Please pick a file");
    const token = localStorage.getItem("token");
    const formData = new FormData();
    formData.append("file", file);

    const res = await fetch((import.meta.env.VITE_API_URL || "http://localhost:5000") + "/api/docs/upload", {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` },
      body: formData,
    });
    const body = await res.json();
    if (!res.ok) {
      setMsg(body.message || "Upload failed");
    } else {
      setMsg("Uploaded successfully");
      setFile(null);
    }
  };

  if (!user) return <div>Checking permissions...</div>;
  if (user.role !== "admin") return <div className="text-red-600">Access denied. Admins only.</div>;

  return (
    <div>
      <h2 className="text-lg font-bold mb-4">Upload Document</h2>
      {msg && <div className="mb-3 text-sm">{msg}</div>}
      <form onSubmit={handleSubmit} className="space-y-3">
        <input type="file" onChange={(e) => setFile(e.target.files?.[0])} />
        <button type="submit" className="px-4 py-2 bg-indigo-600 text-white rounded">Upload</button>
      </form>
    </div>
  );
}
