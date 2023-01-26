import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CountContext } from "../provider";

const Register = () => {
    const navigate = useNavigate();
    const [username, setUser] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [confirmPassword, setConfirmPassword] = useState<string>("");
    const { user } = useContext(CountContext);

    const submit = (e: React.FormEvent<EventTarget>) => {
      e.preventDefault();
       axios
        .post(`http://localhost:4000/auth/register`, {
          password,
          confirmPassword,
          username,
        })
        .then((res) => {
            console.log(res)
          navigate("/");
        })
        .catch((err: new () => any) => {
          alert("Passwords do not match");
          throw new err();
        });
    };
    useEffect(() => {
      if (user) {
        navigate("/home");
      }
    });
  return (
    <div className="h-screen">
      <div className="grid grid-cols-3 w-full h-full">
        <div className="max-w-lg w-full m-auto order-2 p-10 md:p-3 col-span-3 md:col-span-1">
          <h1 className="franger text-3xl">Register</h1>
          <p className="text-gray-600">
            Please enter your register details below
          </p>
          <form className="mt-4 space-y-6" onSubmit={(e) => submit(e)}>
            <input type="hidden" name="remember" value="true" />
            <div className="-space-y-px">
            <div className="pt-4">
                <label htmlFor="username" className="sr-only">
                Username
                </label>
                <input
                  onChange={(e) => setUser(e.target.value)}
                  id="username"
                  name="username"
                  type="username"
                  autoComplete="username"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-red-500 focus:border-red-500 focus:z-10 sm:text-sm"
                  placeholder="username"
                />
              </div>
              <div className="pt-4">
              <input
                  onChange={(e) => setPassword(e.target.value)}
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="password"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-red-500 focus:border-red-500 focus:z-10 sm:text-sm"
                  placeholder="Password"
                />
              </div>
              <div className="pt-4">
                <label htmlFor="Confirm password" className="sr-only">
                  Confirm password
                </label>
                <input
                onChange={(e) => setConfirmPassword(e.target.value)}
                  id="confirm password"
                  name="confirm password"
                  type="password"
                  autoComplete="password"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-red-500 focus:border-red-500 focus:z-10 sm:text-sm"
                  placeholder="confirm password"
                />
              </div>
            </div>
            <button
              type="submit"
              className={`w-full $ text-white text-center py-2 rounded-md bg-blue-500 hover:bg-blue-700 font-bold `}
            >
              Create account
            </button>
          </form>
          <div className="mt-8 text-center">
            <span className="text-gray-500">Have an account?</span>
            <span className="ml-2">
              <Link to="/">Sign in</Link>
            </span>
          </div>
        </div>
        <div className="h-screen relative col-span-0 md:col-span-2 hidden md:block">
          {/* middle */}
          <div className="z-20 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <div className="text-white text-center franger">
              <h1 className="text-5xl">Welcome!</h1>
              <p className="text-2xl">
                Create account for your productivity free and start using our
                services
              </p>
            </div>
          </div>
          {/* bottom right */}
          <div className="z-20 absolute bottom-0 right-0 mb-4 mr-4">
            <div className="text-white text-center text-sm">
              <span>Wallpaper by </span>
              <Link
                to="https://www.deviantart.com/vsales"
                className="underline text-blue-400"
                target="_blank"
                rel="nofollow"
              >
                vsales
              </Link>
            </div>
          </div>
          <div className="absolute z-10 top-0 left-0 w-full h-full bg-black opacity-20"></div>
          <img
            src="https://images.alphacoders.com/458/45831.jpg"
            alt="register Image"
            className="object-fill object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default Register;
