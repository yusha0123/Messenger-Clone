"use client";

import { registerData, register as registerUser } from "@/actions/register";
import { Alert, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { FaEye, FaEyeSlash, FaGithub, FaGoogle } from "react-icons/fa";
import { GoAlertFill } from "react-icons/go";
import { toast } from "sonner";
import Logo from "./logo";
import { TextFieldError } from "./ui/text-field-error";

type Variant = "LOGIN" | "REGISTER";

const AuthForm = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [showPass1, setShowPass1] = useState<boolean>(false);
  const [showPass2, setShowPass2] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const router = useRouter();
  const [variant, setVariant] = useState<Variant>("LOGIN");
  const {
    register,
    handleSubmit,
    getValues,
    reset,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const toggleVariant = useCallback(() => {
    setVariant((variant) => {
      return variant === "REGISTER" ? "LOGIN" : "REGISTER";
    });
  }, [variant]);

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    setLoading(true);
    setError("");
    if (variant === "REGISTER") {
      const { success, error } = await registerUser(data as registerData);
      if (error) {
        setError(error);
      } else if (success) {
        toast.success("Registration successful!", {
          description: "You can login now.",
        });
        reset();
      }
      setLoading(false);
    } else {
      signIn("credentials", {
        ...data,
        redirect: false,
      })
        .then((callback) => {
          if (callback?.error) {
            setError("Invalid credentials!");
          }

          if (callback?.ok && !callback?.error) {
            toast.success("Logged in successfully!");
            router.push("/users");
          }
        })
        .finally(() => setLoading(false));
    }
  };

  const handleSocialLogin = (social: string) => {
    setLoading(true);
    signIn(social, {
      redirect: false,
    })
      .then((callback) => {
        if (callback?.error) {
          setError("Invalid credentials!");
        }

        if (callback?.ok && !callback?.error) {
          toast.success("Logged in successfully!");
        }
      })
      .finally(() => setLoading(false));
  };

  return (
    <Card
      className={cn(
        "sm:mx-auto sm:w-full sm:max-w-md",
        variant === "REGISTER" && "md:max-w-xl"
      )}
    >
      <CardHeader className="space-y-1">
        <Logo className="w-12 h-12 block mx-auto mb-2" />
        <CardTitle className="text-3xl tracking-tight font-bold text-gray-900 text-center">
          {variant === "LOGIN"
            ? "Sign in to your account"
            : "Create your account"}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-6 max-w-md mx-auto">
          <Button variant="outline" onClick={() => handleSocialLogin("github")}>
            <FaGithub className="mr-2 h-4 w-4" />
            GitHub
          </Button>
          <Button variant="outline" onClick={() => handleSocialLogin("google")}>
            <FaGoogle className="mr-2 h-4 w-4" />
            Google
          </Button>
        </div>
        {error && (
          <Alert variant="destructive" className="flex items-center">
            <GoAlertFill className="h-4 w-4" />
            <AlertTitle>{error}</AlertTitle>
          </Alert>
        )}
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-card px-2 text-muted-foreground">
              Or continue with
            </span>
          </div>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div
            className={cn(
              "grid",
              variant === "REGISTER" && "md:grid-cols-2 gap-4"
            )}
          >
            {variant === "REGISTER" && (
              <div className="space-y-1">
                <Label htmlFor="name">Name</Label>
                <Input
                  type="type"
                  placeholder="John Doe"
                  autoComplete="off"
                  disabled={loading}
                  {...register("name", {
                    required: "Name is Required",
                    minLength: {
                      value: 4,
                      message: "Enter a valid name!",
                    },
                  })}
                />
                <TextFieldError error={errors.name?.message} />
              </div>
            )}
            <div className="space-y-1">
              <Label htmlFor="email">Email</Label>
              <Input
                type="email"
                placeholder="m@example.com"
                autoComplete="off"
                disabled={loading}
                {...register("email", {
                  required: "Email Address is required",
                  pattern: {
                    value:
                      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
                    message: "Please enter a valid email address",
                  },
                })}
              />
              <TextFieldError error={errors.email?.message} />
            </div>
          </div>
          <div
            className={cn(
              "grid",
              variant === "REGISTER" && "md:grid-cols-2 gap-4"
            )}
          >
            <div className="space-y-1">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Input
                  type={showPass1 ? "text" : "password"}
                  placeholder="********"
                  autoComplete="off"
                  disabled={loading}
                  {...register("password", {
                    required: "Password is required",
                    minLength: {
                      value: 8,
                      message: "Password must be at least 8 characters",
                    },
                  })}
                />
                <Button
                  size={"icon"}
                  variant={"ghost"}
                  type="button"
                  onClick={() => setShowPass1((prev) => !prev)}
                  className="absolute top-0 right-0 flex h-full items-center px-2"
                >
                  {showPass1 ? (
                    <FaEye className="h-4 w-4" />
                  ) : (
                    <FaEyeSlash className="h-4 w-4" />
                  )}
                </Button>
              </div>
              <TextFieldError error={errors.password?.message} />
            </div>
            {variant === "REGISTER" && (
              <div className="space-y-1">
                <Label htmlFor="password">Confirm Password</Label>
                <div className="relative">
                  <Input
                    type={showPass2 ? "text" : "password"}
                    placeholder="********"
                    autoComplete="off"
                    disabled={loading}
                    {...register("confirmPassword", {
                      required: "Password confirmation is required",
                      validate: (value) =>
                        value === getValues("password") ||
                        "Passwords must match",
                    })}
                  />
                  <Button
                    size={"icon"}
                    variant={"ghost"}
                    type="button"
                    onClick={() => setShowPass2((prev) => !prev)}
                    className="absolute top-0 right-0 flex h-full items-center px-2"
                  >
                    {showPass2 ? (
                      <FaEye className="h-4 w-4" />
                    ) : (
                      <FaEyeSlash className="h-4 w-4" />
                    )}
                  </Button>
                </div>
                <TextFieldError error={errors.confirmPassword?.message} />
              </div>
            )}
          </div>
          <div className="flex items-center">
            <Button
              className="w-full max-w-sm mx-auto"
              type="submit"
              isLoading={loading}
            >
              {variant === "LOGIN" ? "Sign in" : "Register"}
            </Button>
          </div>
        </form>
        <CardFooter className="flex gap-2 justify-center text-sm mt-3 px-2 text-gray-500 py-0">
          <p>
            {variant === "LOGIN"
              ? "New to Messenger"
              : "Already have an account"}
          </p>
          <p className="underline cursor-pointer" onClick={toggleVariant}>
            {variant === "LOGIN" ? "Create an account" : "Login"}
          </p>
        </CardFooter>
      </CardContent>
    </Card>
  );
};

export default AuthForm;
