import React, { useState, useCallback } from "react";
import { LoginLayoutProps } from "../../interfaces/auth";

const LoginLayout: React.FC<LoginLayoutProps> = ({ authType, onSubmit }) => {
  const [loginFormData, setLoginFormData] = useState<{
    email: string;
    authKey: string;
  }>({
    email: "",
    authKey: "",
  });

  const handleChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setLoginFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  }, []);

  const handleSubmit = useCallback(
    (event: React.FormEvent) => {
      event.preventDefault(); 
      onSubmit(loginFormData);
    },
    [loginFormData, onSubmit]
  );

  console.log("checking", loginFormData);

  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            alt="Your Company"
            src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
            className="mx-auto h-10 w-auto"
          />
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            {authType === "Admin" ? "Admin Login" : "Sign in to your account"}
          </h2>
          <p className="text-center text-sm text-gray-500">
            {authType === "Admin"
              ? "Access the admin panel"
              : "Please enter your credentials"}
          </p>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form
            action="#"
            method="POST"
            className="space-y-6"
            onSubmit={handleSubmit} // Use the modified handleSubmit
          >
            {authType !== "PIN" && (
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Email address
                </label>
                <div className="mt-2">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={loginFormData.email}
                    onChange={handleChange}
                    autoComplete="email"
                    className="px-2.5 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
            )}

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="authKey"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  {authType === "PIN" ? "Access Code" : "Password"}
                </label>
              </div>
              <div className="mt-2">
                <input
                  id="authKey"
                  name="authKey"
                  type="password"
                  value={loginFormData.authKey}
                  onChange={handleChange}
                  required
                  autoComplete="current-password"
                  className="px-2.5 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Sign In
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default LoginLayout;
