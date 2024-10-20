import React, { useState, useCallback, useContext } from "react";
import { ProductContext } from "../../store/Product";
import { LoginLayoutProps, LoginFormData } from "../../types/auth";
import { GlobalContext } from "../../store/Global";
import LoadingSpinner from "../Reusable/Loader";
import { LoginContext } from "../../store/Auth";
import ButtonLoader from "../Reusable/ButtonLoading";

const LoginLayout: React.FC<LoginLayoutProps> = ({ authType, onSubmit }) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);
  const [loginFormData, setLoginFormData] = useState<LoginFormData>({
    username: "",
    authKey: "",
  });

  const { isLoading } = useContext(GlobalContext);
  const { logoImg } = useContext(ProductContext);

  const togglePasswordVisibility = (): void => {
    setIsPasswordVisible((prev) => !prev);
  };

  const { errorMsg, authLoading } = useContext(LoginContext);

  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = event.target;
      setLoginFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    },
    []
  );

  const handleSubmit = useCallback(
    (event: React.FormEvent) => {
      event.preventDefault();
      onSubmit(loginFormData);
    },
    [loginFormData, onSubmit]
  );

  return (
    <>
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <img
              alt="Your Company"
              loading="lazy"
              src={logoImg}
              className="mx-auto h-10 w-auto"
            />
            <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
              Sign in to your account
            </h2>
            <p className="text-center text-sm text-gray-500">
              Please enter your credentials
            </p>
          </div>

          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <form
              action="#"
              method="POST"
              className="space-y-6"
              onSubmit={handleSubmit}
            >
              {authType !== "PIN" && (
                <div>
                  <label
                    htmlFor="username"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Email address
                  </label>
                  <div className="mt-2">
                    <input
                      id="username"
                      name="username"
                      type="email"
                      required
                      value={loginFormData.username}
                      onChange={handleChange}
                      autoComplete="email"
                      className={`px-2.5 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ${
                        errorMsg
                          ? "ring-red-600 focus:ring-red-700"
                          : "ring-gray-300 focus:ring-indigo-600"
                      } placeholder:text-gray-400 sm:text-sm sm:leading-6`}
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
                    type={isPasswordVisible ? "text" : "password"}
                    value={loginFormData.authKey}
                    onChange={handleChange}
                    required
                    autoComplete="current-password"
                    onFocus={togglePasswordVisibility}
                    onBlur={togglePasswordVisibility}
                    className={`px-2.5 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ${
                      errorMsg
                        ? "ring-red-600 focus:ring-red-700"
                        : "ring-gray-300 focus:ring-indigo-600"
                    } placeholder:text-gray-400 sm:text-sm sm:leading-6`}
                  />
                </div>
              </div>
              <p className="text-red-600 text-center w-full text-sm">
                {errorMsg}
              </p>
              <div>
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  {authLoading ? <ButtonLoader /> : <span>Sign In</span>}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default LoginLayout;
