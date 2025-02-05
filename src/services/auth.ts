"use server";

import { cookies } from "next/headers";

const VALID_USERNAME = process.env.NEXT_PUBLIC_VALID_USERNAME
const VALID_PASSWORD = process.env.NEXT_PUBLIC_VALID_PASSWORD

export async function signIn(username: string, password: string) {

  if (username !== VALID_USERNAME || password !== VALID_PASSWORD) {
    return { success: false, message: "Invalid credentials" };
  }

  // Set a secure, HTTP-only cookie
  (await cookies()).set({
    name: "isAuthenticated",
    value: "true",
    httpOnly: true, // Prevents client-side access
    secure: process.env.NODE_ENV === "production", // Secure in production
    path: "/", // Available for all pages
    maxAge: 60 * 60 * 24 * 7, // 7 days
    sameSite: "strict", // Prevent CSRF attacks
  });

  return { success: true };
}






// ✅ Logout function
export async function logout() {

  // Remove the authentication cookie
  (await cookies()).delete("isAuthenticated");

  return { success: true };
}