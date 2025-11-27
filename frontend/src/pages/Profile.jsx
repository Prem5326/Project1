import React, { useEffect, useState } from "react";
import { fetchProfile } from "../api";


export default function Profile() {
const [user, setUser] = useState(null);
const [err, setErr] = useState("");


useEffect(() => {
const load = async () => {
const token = localStorage.getItem("token");
if (!token) return setErr("Not authenticated");
const res = await fetchProfile(token);
if (res.status === 200) {
setUser(res.body.user);
} else {
setErr(res.body?.message || "Could not fetch profile");
}
};
load();
}, []);


const handleLogout = () => {
localStorage.removeItem("token");
window.location.href = "/login";
};


if (err) return <div className="text-red-600">{err}</div>;
if (!user) return <div>Loading...</div>;


return (
<div>
<h2 className="text-lg font-bold mb-4">Profile</h2>
<div className="space-y-2">
<div><strong>Name:</strong> {user.name}</div>
<div><strong>Email:</strong> {user.email}</div>
</div>


<button onClick={handleLogout} className="mt-4 px-4 py-2 rounded bg-red-500 text-white">Logout</button>
</div>
);
}