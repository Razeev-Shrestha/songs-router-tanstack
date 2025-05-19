import { registerUser } from "@/supabase/services";
import type { AuthError, AuthResponse } from "@supabase/supabase-js";
import { useMutation } from "@tanstack/react-query";
import { z } from "zod";

export const registerSchema = z
  .object({
    email: z.string().email("Invalid email."),
    password: z.string().min(6, "Minimum 6 characters is required."),
    confirmPassword: z.string().min(6, "Password is required."),
  })
  .superRefine((val, ctx) => {
    if (val.password !== val.confirmPassword) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Passwords do not match",
        path: ["confirmPassword"],
      });
    }
  });

export type RegisterType = z.infer<typeof registerSchema>;

export const useRegisterUser = () => {
  return useMutation<AuthResponse, AuthError, RegisterType>({
    mutationKey: ["register-user"],
    mutationFn: ({ email, password }) => registerUser(email, password),
  });
};
