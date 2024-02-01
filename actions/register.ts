"use server";

import { db } from "@/lib/db";
import bcrypt from "bcrypt";

export type registerData = {
  name: string;
  email: string;
  password: string;
};

export const register = async (
  data: registerData
): Promise<{ success?: string; error?: string }> => {
  const name = data.name;
  const email = data.email;
  const password = data.password;

  try {
    if (!name || !email || !password) {
      return { error: "Missing fields!" };
    }

    const user = await db.user.findUnique({ where: { email } });
    if (user) {
      return { error: "Email already in use!" };
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    await db.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });
    return { success: "User registered successfully!" };
  } catch (error) {
    console.error(error);
    return { error: "Something went wrong!" };
  }
};
