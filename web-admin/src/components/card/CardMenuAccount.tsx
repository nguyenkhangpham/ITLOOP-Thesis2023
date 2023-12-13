import React, { useState } from "react";
import { TiPlus } from "react-icons/ti";
import InputField from "components/fields/InputField";
import { callAPI } from "utils/callAPIHelper";
import endpoint from "services/network/endpoint";
import { toast } from "sonner";
import _ from "lodash";
import { ROLE_ID } from "configs";

function CardMenuAccount(props: {
  roleId: ROLE_ID;
  onSuccess: (res?: any) => void;
}) {
  const { onSuccess, roleId } = props;
  const [inputValue, setInputValue] = useState({
    fullName: "",
    email: "",
    password: "",
  });

  const handleOnAddAdminAccount = () => {
    const isValid = _.values(inputValue).some((value) => !_.isEmpty(value));

    if (!isValid) return toast.error("An error occurred");

    callAPI({
      API: endpoint.requestRegister,
      payload: { ...inputValue, roleId },
      onSuccess: (res) => {
        // @ts-ignore
        document.getElementById("my_modal_1").close();

        // clear
        setInputValue({ fullName: "", email: "", password: "" });

        toast.success("Add account successfully");
        onSuccess(res);
      },
    });
  };

  return (
    <>
      <button
        // @ts-ignore
        onClick={() => document.getElementById("my_modal_1").showModal()}
        className={`flex items-center text-xl hover:cursor-pointer ${"bg-lightPrimary p-2 text-brand-500 hover:bg-gray-100 dark:bg-navy-700 dark:text-white dark:hover:bg-white/20 dark:active:bg-white/10"} linear justify-center rounded-lg font-bold transition duration-200`}
      >
        <TiPlus className="w-6 h-6" />
      </button>
      <dialog id="my_modal_1" className="modal">
        <div className="modal-box">
          <h3 className="text-lg font-bold">Add account</h3>
          <div className="mt-4">
            <InputField
              value={inputValue.fullName}
              onChange={(text) =>
                setInputValue((prev) => ({ ...prev, fullName: text }))
              }
              variant="auth"
              extra="mb-3"
              label="Name*"
              placeholder="Name"
              id="name"
            />
            <InputField
              value={inputValue.email}
              onChange={(text) =>
                setInputValue((prev) => ({ ...prev, email: text }))
              }
              variant="auth"
              extra="mb-3"
              label="Email*"
              placeholder="mail@gmail.com"
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
              placeholder="Password"
              id="password"
              type="password"
            />
            <button
              className="float-right mt-4 btn"
              onClick={handleOnAddAdminAccount}
            >
              Add
            </button>
          </div>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </>
  );
}

export default CardMenuAccount;
