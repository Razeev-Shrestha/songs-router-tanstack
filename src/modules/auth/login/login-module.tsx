import { Icon } from "@/components/icon";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Link, useRouter } from "@tanstack/react-router";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { loginSchema, useLoginUser, type LoginType } from "./login.service";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { useLocalStorage } from "@/hooks/use-local-storage";
export const LoginModule = () => {
  const [showPassword, setShowPassword] = useState(false);
  const form = useForm<LoginType>({
    defaultValues: { email: "", password: "" },
    resolver: zodResolver(loginSchema),
  });
  const router = useRouter();

  const { mutate, isPending } = useLoginUser();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_accessToken, setAccessToken] = useLocalStorage("accessToken");
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_refreshToken, setRefreshToken] = useLocalStorage("refreshToken");
  const onFormSubmit = form.handleSubmit((data) =>
    mutate(data, {
      onSuccess: (payload) => {
        if (payload.error) return toast.error(payload.error.message);

        toast.success("User logged in successfully.");
        console.log(payload.data.session);
        setAccessToken(payload.data.session?.access_token);
        setRefreshToken(payload.data.session?.refresh_token);

        router.navigate({ to: "/dashboard", reloadDocument: true });
      },
    })
  );

  return (
    <Card className="w-full max-w-md">
      <CardHeader className="space-y-1">
        <Link to="/" className="flex items-center justify-center mb-2">
          <Icon icon="music" className="h-10 w-10 text-primary" />
        </Link>
        <CardTitle className="text-2xl font-bold text-center">Login</CardTitle>
        <CardDescription className="text-center">
          Enter your email and password.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={onFormSubmit} className="space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="name@example.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <div className="relative">
                    <FormControl>
                      <Input
                        type={showPassword ? "text" : "password"}
                        placeholder="••••••••"
                        {...field}
                      />
                    </FormControl>
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="absolute right-0 top-0 h-full px-3 py-2 text-gray-400 hover:text-gray-600"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      <Icon
                        icon={showPassword ? "eyeOff" : "eye"}
                        className="h-4 w-4"
                      />
                      <span className="sr-only">
                        {showPassword ? "Hide password" : "Show password"}
                      </span>
                    </Button>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex items-center justify-between">
              <Link
                to="/forgot-password"
                className="text-sm font-medium text-primary hover:underline"
              >
                Forgot password?
              </Link>
            </div>

            <Button
              type="submit"
              className="w-full"
              disabled={form.formState.isSubmitting}
            >
              {isPending ? "Signing in..." : "Sign in"}
            </Button>
          </form>
        </Form>
      </CardContent>
      <CardFooter className="flex flex-col space-y-4">
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-200"></div>
          </div>
        </div>
        <div className="text-center text-sm">
          Don't have an account?{" "}
          <Link
            to="/register"
            className="font-medium text-primary hover:underline"
          >
            Register
          </Link>
        </div>
      </CardFooter>
    </Card>
  );
};
