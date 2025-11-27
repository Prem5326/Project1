import React from "react";
import { useNavigate } from "react-router-dom";
import AuthForm from "../components/AuthForm";
import { loginUser } from "../api";


export default function Login() {
const nav = useNavigate();


const handleLogin = async (data) => {
const res = await loginUser(data);
if (res.status === 200) {
localStorage.setItem("token", res.body.token);
nav("/profile");
} else {
throw new Error(res.body?.message || "Login failed");
}
};


return (
<div>
<h2 className="text-lg font-bold mb-4">Login</h2>
<AuthForm
fields={[
{ name: "email", label: "Email", type: "email" },
{ name: "password", label: "Password", type: "password" },
]}
onSubmit={handleLogin}
submitLabel={"Login"}
/>
</div>
);
}