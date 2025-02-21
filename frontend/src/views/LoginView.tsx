import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import ErrorMessage from "../components/ErrorMessage";
import { LoginForm } from "../types";
//import api from "../config/axios";
import { toast } from "sonner";
import { isAxiosError } from "axios";
import { useMutation } from "@tanstack/react-query";
import { login } from "../api/DevTreeaPI";

export default function LoginView() {
  const navigate = useNavigate();
  const defaultValues: LoginForm = {
    email: "",
    password: "",
  };
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ defaultValues });

  // mutacion para los enlaces
  const { mutate } = useMutation({
    mutationFn: login,
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess: (data) => {
      localStorage.setItem("AUTH_TOKEN", data);
      navigate("/admin");
    },
  });

  const handleLogin = async (formData: LoginForm) => {
    try {
      mutate(formData);
      reset();
    } catch (error) {
      if (isAxiosError(error) && error.response) {
        console.log("error", error.response.data.error);
        toast.error(error.response.data.error);
      }
    }
  };
  return (
    <>
      <h1 className=" text-4xl text-white font-bold">Iniciar sesion</h1>
      <form
        onSubmit={handleSubmit(handleLogin)}
        className="bg-white px-5 py-20 rounded-lg space-y-10 mt-10"
        noValidate
      >
        <div className="grid grid-cols-1 space-y-3">
          <label htmlFor="email" className="text-2xl text-slate-500">
            E-mail
          </label>
          <input
            id="email"
            type="email"
            placeholder="Email de Registro"
            className="bg-slate-100 border-none p-3 rounded-lg placeholder-slate-400"
            {...register("email", {
              required: "El Email es obligatorio",
              pattern: {
                value: /\S+@\S+\.\S+/,
                message: "E-mail no válido",
              },
            })}
          />
          {errors.email && <ErrorMessage>{errors.email.message}</ErrorMessage>}
        </div>
        <div className="grid grid-cols-1 space-y-3">
          <label htmlFor="password" className="text-2xl text-slate-500">
            Password
          </label>
          <input
            id="password"
            type="password"
            placeholder="Password de Registro"
            className="bg-slate-100 border-none p-3 rounded-lg placeholder-slate-400"
            {...register("password", {
              required: "El Password es obligatorio",
            })}
          />
          {errors.password && (
            <ErrorMessage>{errors.password.message}</ErrorMessage>
          )}
        </div>

        <input
          type="submit"
          className="bg-cyan-400 p-3 text-lg w-full uppercase text-slate-600 rounded-lg font-bold cursor-pointer"
          value="Iniciar Sesión"
        />
      </form>
      <nav className=" mt-10">
        <Link
          className=" text-center text-white text-lg block"
          to={"/auth/register"}
        >
          No tienes cuenta?. Crea una
        </Link>
      </nav>
    </>
  );
}
