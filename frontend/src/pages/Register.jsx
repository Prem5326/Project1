import React from "react";
import { useNavigate } from "react-router-dom";
import AuthForm from "../components/AuthForm";
import { registerUser } from "../api";


export default function Register() {
const nav = useNavigate();


const handleRegister = async (data) => {
const res = await registerUser(data);
if (res.status === 201) {
// save token and redirect to profile
localStorage.setItem("token", res.body.token);
nav("/profile");
} else {
throw new Error(res.body?.message || "Register failed");
}
};


return (
<div>
<h2 className="text-lg font-bold mb-4">Register</h2>
<AuthForm
fields={[
{ name: "name", label: "Full name" },
{ name: "email", label: "Email", type: "email" },
{ name: "password", label: "Password", type: "password" },
]}
onSubmit={handleRegister}
submitLabel={"Create account"}
/>
</div>
);
}