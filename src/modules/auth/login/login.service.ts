import { loginUser } from "@/supabase/services";
import type { AuthError, AuthResponse } from "@supabase/supabase-js";
import { useMutation } from "@tanstack/react-query";
import { z } from "zod";
export const loginSchema = z.object({
  email: z
    .string({ message: "Email is required" })
    .email({ message: "Invalid Email provided" }),
  password: z.string({ message: "Password is required" }),
});

export type LoginType = z.infer<typeof loginSchema>;

export const useLoginUser = () => {
  return useMutation<AuthResponse, AuthError, LoginType>({
    mutationKey: ["register-user"],
    mutationFn: ({ email, password }) => loginUser(email, password),
  });
};
