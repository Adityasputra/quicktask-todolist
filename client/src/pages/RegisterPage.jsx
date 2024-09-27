import axios from "../services/apiService";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function RegisterPage() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleRegister = async (e) => {
    try {
      e.preventDefault();
      const { data } = await axios({
        method: "POST",
        url: "api/users/register",
        data: {
          username,
          email,
          password,
        },
      });

      toast.success("Registration successful");
      navigate("/login");
    } catch (error) {
      console.log(error, "This error ss");
      toast.error(error.response.data.message);
    }
  };
  return (
    <>
      <div className="py-14">
        <div className="flex bg-white shadow-sm rounded-lg overflow-hidden mx-auto max-w-sm lg:max-w-4xl">
          <div
            className="hidden bg-cover lg:block lg:w-1/2"
            style={{
              backgroundImage: 'url("./images/register-bg.jpg")',
            }}
          ></div>
          <div className="w-full p-8 lg:w-1/2">
            <form onSubmit={handleRegister}>
              <h2 className="text-2xl text-center font-semibold text-[#2f3640]">
                Quick Task
              </h2>
              <p className="text-xl text-center text-gray-600">
                Create your account to get started!
              </p>

              <div className="mt-4 flex items-center justify-between">
                <span className="border-b w-1/5 lg:w-1/4"></span>
                <p className="text-xs text-center text-gray-500 uppercase">
                  Enter the data to proceed
                </p>
                <span className="border-b w-1/5 lg:w-1/4"></span>
              </div>

              <div className="mt-4">
                <label className="block text-[#2f3640] text-sm font-bold mb-2">
                  Username
                </label>
                <input
                  className="bg-gray-200 text-[#2f3640] rounded py-2 px-4 block w-full appearance-none focus:outline-none focus:shadow-md"
                  type="text"
                  placeholder="Enter your username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>

              <div className="mt-4">
                <label className="block text-[#2f3640] text-sm font-bold mb-2">
                  Email
                </label>
                <input
                  className="bg-gray-200 text-[#2f3640] rounded py-2 px-4 block w-full appearance-none focus:outline-none focus:shadow-md"
                  type="text"
                  placeholder="Enter your email"
                  value={email}
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
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <div className="mt-8">
                <button className="bg-[#9b59b6] text-white font-bold py-2 px-4 w-full rounded hover:bg-[#894ea0]">
                  Register
                </button>
              </div>

              <div className="mt-4 flex items-center justify-between">
                <span className="border-b w-full"></span>
              </div>

              <div className="mt-4 text-center">
                <p className="text-sm text-gray-600">
                  have an account?{" "}
                  <Link
                    to="/login"
                    className="text-[#9b59b6] font-bold hover:underline"
                  >
                    Sign in here
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
