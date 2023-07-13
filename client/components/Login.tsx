'use client'
import Image from 'next/image';
import googleLogo from '../public/google-logo.png';
import githubLogo from '../public/github-logo.png';
import { signIn } from "next-auth/react";
import { useSearchParams, useRouter } from "next/navigation";
import { ChangeEvent, useState } from "react";


const Login = () => {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [formValues, setFormValues] = useState({
      email: "",
      password: "",
    });
    const [error, setError] = useState("");
  
    const searchParams = useSearchParams();
    const callbackUrl = searchParams.get("callbackUrl") || "/";
  
    const onSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      try {
        setLoading(true);
        setFormValues({ email: "", password: "" });
  
        const res = await signIn("credentials", {
          redirect: false,
          email: formValues.email,
          password: formValues.password,
          callbackUrl,
        });
  
        setLoading(false);
  
        console.log(res);
        if (!res?.error) {
          router.push(callbackUrl);
        } else {
          setError("invalid email or password");
        }
      } catch (error: any) {
        setLoading(false);
        setError(error);
      }
    };
  
    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
      const { name, value } = event.target;
      setFormValues({ ...formValues, [name]: value });
    };
  
    return (
      <div className="bg-gray-900 mx-auto w-96 p-8 rounded-lg flex items-center justify-center">
        <form onSubmit={onSubmit}>
          {error && (
            <p className="text-center bg-red-300 py-4 mb-6 rounded">{error}</p>
          )}
          <div className="mb-4">
            <label className="text-gray-400 text-sm font-bold mb-2" htmlFor="email">
              Email
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="email"
              type="email"
              placeholder="Ingresa tu email"
              value={formValues.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-400 text-sm font-bold mb-2" htmlFor="password">
              Password
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="password"
              type="password"
              placeholder="Ingresa tu password"
              value={formValues.password}
              onChange={handleChange}
              required
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Ingresar
            </button>
            <p className="text-sm text-white">
              Soy nuevo, <a href="/userForm" className="text-blue-500">Registrarse</a>
            </p>
          </div>
          <div className="mt-4 text-center">
            <p className="text-sm text-gray-400">O ingresa con:</p>
            <div className="flex justify-center mt-2">
              <button
                className="bg-white hover:bg-gray-200 text-black font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline mr-2"
                type="button"
                onClick={() => signIn("google", { callbackUrl })}
              >
                <div className="flex items-center">
                  <Image src={googleLogo} alt="Google Logo" width={16} height={16} className="mr-2" />
                  Google
                </div>
              </button>
              <button
                className="bg-black hover:bg-gray-900 text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline ml-2"
                type="button"
                onClick={() => signIn("github", { callbackUrl })}
              >
                <div className="flex items-center">
                  <Image src={githubLogo} alt="GitHub Logo" width={16} height={16} className="mr-2" />
                  GitHub
                </div>
              </button>
            </div>
          </div>
        </form>
      </div>
    );
  };
  
  export default Login;