import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Profile from "./pages/Profile";


function App() {
return (
<div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
<div className="w-full max-w-md">
<nav className="flex justify-between mb-6">
<h1 className="text-xl font-bold">Mamta Bhojnalaya — Auth</h1>
<div className="space-x-3">
<Link to="/register" className="text-sm underline">Register</Link>
<Link to="/login" className="text-sm underline">Login</Link>
<Link to="/profile" className="text-sm underline">Profile</Link>
</div>
</nav>


<div className="bg-white shadow rounded-lg p-6">
<Routes>
<Route path="/" element={<Register />} />
<Route path="/register" element={<Register />} />
<Route path="/login" element={<Login />} />
<Route path="/profile" element={<Profile />} />
</Routes>
</div>
</div>
</div>
);
}


export default App;