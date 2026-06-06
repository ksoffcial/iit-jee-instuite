import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Phone,
  Lock,
  LogIn,
  GraduationCap,
  ArrowRight,
} from "lucide-react";

import { loginUser } from "../authSlice";

const loginSchema = z.object({
  phoneNumber: z
    .string()
    .length(10, "Phone number must be exactly 10 digits")
    .regex(/^[0-9]+$/, "Phone number must contain only digits"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { loading, error } = useSelector((state) => state.auth);

  const onSubmit = async (data) => {
    const userData = await dispatch(loginUser(data));

    if (userData?.payload?.success) {
      navigate("/");
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-[#020617] flex items-center justify-center px-4">
      <div className="absolute top-[-120px] left-[-120px] w-80 h-80 bg-blue-600 rounded-full blur-[120px] opacity-40"></div>
      <div className="absolute bottom-[-120px] right-[-120px] w-96 h-96 bg-cyan-500 rounded-full blur-[130px] opacity-30"></div>

      <div className="relative w-full max-w-5xl grid lg:grid-cols-2 rounded-3xl overflow-hidden border border-white/10 bg-white/10 backdrop-blur-2xl shadow-2xl">
        <div className="hidden lg:flex flex-col justify-between p-10 bg-gradient-to-br from-blue-700 via-blue-900 to-slate-950 text-white">
          <div>
            <div className="flex items-center gap-3">
              <div className="w-16 h-16 rounded-full bg-white/15 flex items-center justify-center">
                {/* <GraduationCap size={28} /> */}
                <img src="/logo.png" alt="" />
              </div>

              <h1 className="text-3xl font-bold uppercase">Rakesh Physics</h1>
            </div>

            <h2 className="text-4xl font-extrabold leading-tight mt-16">
              Welcome back,
              <br />
              keep learning.
            </h2>

            <p className="text-blue-100 mt-5 leading-relaxed">
              Login to access your courses, test results, batches and learning
              dashboard.
            </p>
          </div>

          <div className="grid grid-cols-3 gap-4 mt-10">
            <div className="rounded-2xl bg-white/10 p-4">
              <h3 className="text-2xl font-bold">50+</h3>
              <p className="text-sm text-blue-100">Tests</p>
            </div>

            <div className="rounded-2xl bg-white/10 p-4">
              <h3 className="text-2xl font-bold">20+</h3>
              <p className="text-sm text-blue-100">Batches</p>
            </div>

            <div className="rounded-2xl bg-white/10 p-4">
              <h3 className="text-2xl font-bold">24/7</h3>
              <p className="text-sm text-blue-100">Access</p>
            </div>
          </div>
        </div>

        <div className="p-6 sm:p-10 bg-slate-950/80">
          <div className="lg:hidden flex items-center gap-3 mb-8 text-white">
            <div className="w-11 h-11 rounded-2xl bg-blue-600 flex items-center justify-center">
              <GraduationCap size={24} />
            </div>
            <h1 className="text-xl font-bold">Student Portal</h1>
          </div>

          <div className="mb-8">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
              Login Account
            </h2>
            <p className="text-slate-400 mt-2">
              Enter your details to continue
            </p>
          </div>

          {error && (
            <div className="alert alert-error mb-5 text-sm">
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <div>
              <label className="text-sm font-medium text-slate-300">
                Mobile Number
              </label>

              <div className="relative mt-2">
                <Phone
                  size={20}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-blue-400"
                />

                <input
                  type="text"
                  placeholder="Enter 10 digit mobile number"
                  {...register("phoneNumber")}
                  className="input w-full h-14 pl-12 rounded-2xl bg-slate-900 text-white border border-slate-700 focus:border-blue-500 focus:outline-none"
                />
              </div>

              {errors.phoneNumber && (
                <p className="text-red-400 text-sm mt-2">
                  {errors.phoneNumber.message}
                </p>
              )}
            </div>

            <div>
              <label className="text-sm font-medium text-slate-300">
                Password
              </label>

              <div className="relative mt-2">
                <Lock
                  size={20}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-blue-400"
                />

                <input
                  type="password"
                  placeholder="Enter your password"
                  {...register("password")}
                  className="input w-full h-14 pl-12 rounded-2xl bg-slate-900 text-white border border-slate-700 focus:border-blue-500 focus:outline-none"
                />
              </div>

              {errors.password && (
                <p className="text-red-400 text-sm mt-2">
                  {errors.password.message}
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn h-14 w-full rounded-2xl border-none bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 text-white text-base font-semibold shadow-lg shadow-blue-900/40"
            >
              {loading ? (
                <span className="loading loading-spinner"></span>
              ) : (
                <>
                  Login
                  <LogIn size={20} />
                </>
              )}
            </button>
          </form>

          <div className="mt-8 text-center">
            <p className="text-slate-400 text-sm">New student?</p>

            <button
              onClick={() => navigate("/register")}
              className="mt-3 group inline-flex items-center gap-2 text-blue-400 hover:text-cyan-300 font-semibold"
            >
              Create your account
              <ArrowRight
                size={18}
                className="group-hover:translate-x-1 transition"
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;