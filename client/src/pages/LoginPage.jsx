import axios from "../services/apiService";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    try {
      e.preventDefault();
      const { data } = await axios({
        method: "POST",
        url: "api/users/login",
        data: {
          email,
          password,
        },
      });

      localStorage.setItem("access_token", data.access_token);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    async function handleCredentialResponse(response) {
      try {
        const { data } = await axios({
          method: "POST",
          url: "api/users/google-login",
          headers: {
            google_token: response.credential,
          },
        });

        localStorage.setItem("access_token", data.access_token);
        // console.log(data, "This data");
        navigate("/");
      } catch (error) {
        console.log(error);
      }
    }

    google.accounts.id.initialize({
      client_id: import.meta.env.VITE_CLIENT_ID,
      callback: handleCredentialResponse,
    });

    google.accounts.id.renderButton(document.getElementById("buttonGoogle"), {
      theme: "outline",
      size: "large",
    });

    google.accounts.id.prompt();
  }, []);

  return (
    <>
      <div className="py-14">
        <div className="flex bg-white shadow-sm rounded-lg overflow-hidden mx-auto max-w-sm lg:max-w-4xl">
          <div
            className="hidden lg:block lg:w-1/2 bg-cover"
            style={{
              backgroundImage: 'url("./images/login-bg.jpg")',
            }}
          ></div>
          <div className="w-full p-8 lg:w-1/2">
            <form onSubmit={handleLogin}>
              <h2 className="text-2xl font-semibold text-center text-[#2f3640]">
                Quick Task
              </h2>
              <p className="text-xl text-gray-600 text-center">
                Wellcome back!
              </p>

              <div className="mt-4 flex items-center justify-between">
                <span className="border-b w-1/5 lg:w-1/4"></span>
                <p className="text-xs text-center text-gray-500 uppercase">
                  login with email
                </p>
                <span className="border-b w-1/5 lg:w-1/4"></span>
              </div>

              <div className="mt-4">
                <label className="block text-[#2f3640] text-sm font-bold mb-2">
                  Email
                </label>
                <input
                  className="bg-gray-200 text-[#2f3640] rounded py-2 px-4 block w-full appearance-none focus:outline-none focus:shadow-md"
                  type="email"
                  value={email}
                  placeholder="Enter your email"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="mt-4">
                <label className="block text-[#2f3640] text-sm font-bold mb-2">
                  Password
                </label>
                <input
                  className="bg-gray-200 text-[#2f3640] rounded py-2 px-4 block w-full appearance-none focus:outline-none focus:shadow-md"
                  type="password"
                  value={password}
                  placeholder="Enter your password"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="mt-8">
                <button className="bg-[#9b59b6] text-white font-bold py-2 px-4 w-full rounded hover:bg-[#894ea0] ">
                  Login
                </button>
              </div>

              <div className="mt-4 flex items-center justify-between">
                <span className="border-b w-1/5 lg:w-1/4"></span>
                <p className="text-xs text-center text-gray-500 uppercase">
                  or login with google
                </p>
                <span className="border-b w-1/5 lg:w-1/4"></span>
              </div>

              <div className="flex justify-center mt-4">
                <div id="buttonGoogle"></div>
              </div>

              <div className="mt-4 text-center">
                <p className="text-sm text-gray-600">
                  Don't have an account?{" "}
                  <Link
                    to="/register"
                    className="text-[#9b59b6] font-bold hover:underline"
                  >
                    Sign up here
                  </Link>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
