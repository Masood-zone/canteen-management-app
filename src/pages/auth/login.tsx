import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";

export default function Login() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<LoginFormProps>();
  const [showPassword, setShowPassword] = useState(false);

  const [state, setState] = useState({
    success: false,
    message: "",
  });
  const [isPending, setIsPending] = useState(false);

  const onSubmit: SubmitHandler<LoginFormProps> = async (data) => {
    setIsPending(true);
    try {
      // Call your API here
      console.log(data);
      setState({
        success: true,
        message: "Login successful",
      });
    } catch (error) {
      console.error(error);
      setState({
        success: false,
        message: "Invalid credentials",
      });
    } finally {
      setIsPending(false);
      reset();
      navigate("/admin");
    }
  };

  useEffect(() => {
    if (state.success) {
      toast(state.message);
    }
  }, [state.success, state.message]);

  return (
    <section className="w-full">
      {/* Main */}
      <main className="flex flex-col items-center justify-center h-[80dvh]">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>Login</CardTitle>
            <CardDescription>
              Welcome back! Login to your account
            </CardDescription>
          </CardHeader>
          <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
            <CardContent className="space-y-4">
              {/* Email */}
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  type="email"
                  id="email"
                  autoComplete="off"
                  className={errors.email ? "border-red-500" : "bg-transparent"}
                  placeholder="Username/Email/Phone Number"
                  {...register("email", {
                    required: true,
                    maxLength: 80,
                    pattern: /^\S+@\S+$/i,
                  })}
                />
                {errors.email && (
                  <div className="text-red-500 text-sm">
                    {errors.email.type === "required" && "Email is required"}
                    {errors.email.type === "maxLength" && "Email is too long"}
                    {errors.email.type === "pattern" && "Email is invalid"}
                  </div>
                )}
              </div>
              {/* Password */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">Password</Label>
                  <Button variant="link" className="text-sm text-primary">
                    <Link to="/forgot-password">Forgot your password?</Link>
                  </Button>
                </div>
                <div className="relative">
                  <Input
                    type={!showPassword ? "password" : "text"}
                    id="password"
                    autoComplete="off"
                    className={
                      errors.password ? "border-red-500" : "bg-transparent"
                    }
                    placeholder="Password"
                    {...register("password", {
                      required: true,
                      minLength: 6,
                      maxLength: 20,
                    })}
                  />
                  {errors.password && (
                    <div className="text-red-500 text-sm">
                      {errors.password.type === "required" &&
                        "Password is required"}
                      {errors.password.type === "minLength" &&
                        "Password is too short"}
                      {errors.password.type === "maxLength" &&
                        "Password is too long"}
                    </div>
                  )}
                  <span className="absolute top-[2px] right-0  p-2">
                    {showPassword ? (
                      <Eye
                        size={22}
                        onClick={() => setShowPassword(!showPassword)}
                        className="hover:cursor-pointer"
                      />
                    ) : (
                      <EyeOff
                        fontSize={22}
                        onClick={() => setShowPassword(!showPassword)}
                        className="hover:cursor-pointer"
                      />
                    )}
                  </span>
                </div>
              </div>
              {!state.success && state.message && (
                <div className="text-red-500 text-sm py-3">{state.message}</div>
              )}
              <Button type="submit" className="w-full" disabled={isPending}>
                {isPending ? (
                  <span className="flex items-center space-x-2">
                    <Loader2 className="animate-spin text-white" size={24} />
                    Loading...
                  </span>
                ) : (
                  "Log in"
                )}
              </Button>
            </CardContent>
            <CardFooter>
              <div className="space-x-4 text-center text-gray-500">
                <Link to="/contact-us" className="text-sm hover:text-primary">
                  <span>&copy;CMS</span> Contact
                </Link>
                <Link
                  to="/terms-and-conditions"
                  className="text-sm hover:text-primary"
                >
                  Terms & Conditions
                </Link>
              </div>
            </CardFooter>
          </form>
        </Card>
      </main>
    </section>
  );
}
