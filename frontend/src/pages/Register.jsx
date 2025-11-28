// src/pages/Register.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import AuthForm from "../components/AuthForm";
import { registerUser } from "../api";

export default function Register() {
  const nav = useNavigate();

  // password policy:
  // - min 8 chars
  // - at least one uppercase
  // - at least one digit
  // - at least one special character
  const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_\-+={}[\]|\\:;"'<>,.?/~`]).{8,}$/;
  // gmail check (case-insensitive)
  const isGmail = (email = "") =>
    typeof email === "string" && email.trim().toLowerCase().endsWith("@gmail.com");

  const handleRegister = async (data) => {
    const name = (data.name || "").trim();
    const email = (data.email || "").trim();
    const password = data.password || "";
    const confirmPassword = data.confirmPassword || "";

    // Basic client-side validations
    if (!name) throw new Error("Name is required.");
    if (!email) throw new Error("Email is required.");
    if (!isGmail(email)) throw new Error("Email must be a Gmail address (example@gmail.com).");
    if (!password) throw new Error("Password is required.");
    if (password !== confirmPassword) throw new Error("Passwords do not match.");
    if (!passwordRegex.test(password))
      throw new Error(
        "Password must be at least 8 characters and include 1 uppercase letter, 1 number, and 1 special character."
      );

    // Call backend
    const res = await registerUser({ name, email, password });
    if (res.status === 201 || res.status === 200) {
      // save token and redirect to profile
      localStorage.setItem("token", res.body.token);
      nav("/profile");
    } else {
      // bubble backend error message
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
          { name: "confirmPassword", label: "Confirm Password", type: "password" },
        ]}
        onSubmit={handleRegister}
        submitLabel={"Create account"}
      />

      <div className="mt-4 text-sm text-gray-600">
        Password rules: minimum 8 characters, at least one uppercase letter, one number and one special
        character. Email must be a Gmail address.
      </div>
    </div>
  );
}
