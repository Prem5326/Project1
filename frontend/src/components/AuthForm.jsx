import React, { useState } from "react";


export default function AuthForm({ fields, onSubmit, submitLabel }) {
const [form, setForm] = useState(
fields.reduce((acc, f) => ({ ...acc, [f.name]: "" }), {})
);
const [loading, setLoading] = useState(false);
const [error, setError] = useState("");


const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });


const handleSubmit = async (e) => {
e.preventDefault();
setError("");
setLoading(true);
try {
await onSubmit(form);
} catch (err) {
setError(err.message || "Something went wrong");
}
setLoading(false);
};


return (
<form onSubmit={handleSubmit} className="space-y-4">
{fields.map((f) => (
<div key={f.name}>
<label className="block text-sm font-medium mb-1">{f.label}</label>
<input
name={f.name}
type={f.type || "text"}
value={form[f.name]}
onChange={handleChange}
className="w-full border rounded px-3 py-2"
/>
</div>
))}


{error && <div className="text-sm text-red-600">{error}</div>}


<button
type="submit"
className="w-full py-2 rounded bg-indigo-600 text-white font-semibold disabled:opacity-60"
disabled={loading}
>
{loading ? "Please wait..." : submitLabel}
</button>
</form>
);
}