import InputField from "components/fields/InputField";
import _ from "lodash";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { CLI_COOKIE_KEYS, CliCookieService } from "services/cli-cookie";
import endpoint from "services/network/endpoint";
import { toast } from "sonner";
import { useStore } from "store";
import { callAPI } from "utils/callAPIHelper";

export default function SignIn() {
  const navigate = useNavigate();
  const { setUser } = useStore();

  const [inputValue, setInputValue] = useState({
    email: "",
    password: "",
  });

  const handleOnLogin = () => {
    const isValid = _.values(inputValue).every((value) => !_.isEmpty(value));

    if (!isValid) {
      return toast.error("An error occurred");
    }

    // CliCookieService.set(CLI_COOKIE_KEYS.ACCESS_TOKEN, "abc");

    // navigate("/admin", { replace: true });

    callAPI({
      API: endpoint.requestLogin,
      payload: inputValue,
      onSuccess(res) {
        CliCookieService.set(
          CLI_COOKIE_KEYS.ACCESS_TOKEN,
          res.auth.accessToken
        );
        setUser(res.user);

        toast.success("Login successfully");

        navigate("/admin", { replace: true });
      },
    });
  };

  return (
    <div className="flex items-center justify-center w-full h-full px-2 mt-16 mb-16 md:mx-0 md:px-0 lg:mb-10 lg:items-center lg:justify-start">
      <div className="mt-[10vh] w-full max-w-full flex-col items-center md:pl-4 lg:pl-0 xl:max-w-[420px]">
        <h4 className="mb-2.5 text-4xl font-bold text-navy-700 dark:text-white">
          Sign In
        </h4>
        <p className="ml-1 text-base text-gray-600 mb-9">
          Enter your email and password to sign in!
        </p>
        <InputField
          value={inputValue.email}
          onChange={(text) =>
            setInputValue((prev) => ({ ...prev, email: text }))
          }
          variant="auth"
          extra="mb-3"
          label="Email*"
          placeholder="mail@doctor.com"
          id="email"
          type="text"
        />
        <InputField
          value={inputValue.password}
          onChange={(text) =>
            setInputValue((prev) => ({ ...prev, password: text }))
          }
          variant="auth"
          extra="mb-3"
          label="Password*"
          placeholder="Your password"
          id="password"
          type="password"
        />
        <div className="flex justify-end px-2 mb-4">
          <a
            className="self-end text-sm font-medium text-brand-500 hover:text-brand-600 dark:text-white"
            href=" "
          >
            Forgot Password?
          </a>
        </div>
        <button
          onClick={handleOnLogin}
          className="linear mt-6 w-full rounded-xl bg-brand-500 py-[12px] text-base font-medium text-white transition duration-200 hover:bg-brand-600 active:bg-brand-700 dark:bg-brand-400 dark:text-white dark:hover:bg-brand-300 dark:active:bg-brand-200"
        >
          Sign In
        </button>
      </div>
    </div>
  );
}
