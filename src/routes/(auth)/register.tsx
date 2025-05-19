import { RegisterModule } from "@/modules/auth/register/register-module";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/(auth)/register")({
  component: RegisterPage,
});

function RegisterPage() {
  return <RegisterModule />;
}
