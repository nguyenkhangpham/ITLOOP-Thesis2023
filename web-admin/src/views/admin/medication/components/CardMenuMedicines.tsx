import React, { useState } from "react";
import { TiPlus } from "react-icons/ti";
import InputField from "components/fields/InputField";
import { callAPI } from "utils/callAPIHelper";
import endpoint from "services/network/endpoint";
import { toast } from "sonner";
import _ from "lodash";

function CardMenuMedicines(props: { onSuccess: (res?: any) => void }) {
  const { onSuccess } = props;
  const [medicine, setMedicine] = useState("");

  const handleOnAddAdminAccount = () => {
    const isValid = !_.isEmpty(medicine);

    if (!isValid) return toast.error("An error occurred");

    callAPI({
      API: endpoint.requestAddMedicine,
      payload: { name: medicine },
      onSuccess: (res) => {
        // @ts-ignore
        document.getElementById("my_modal_2").close();

        // clear
        setMedicine("");

        toast.success("Add medicine successfully");
        onSuccess(res);
      },
    });
  };

  return (
    <>
      <button
        // @ts-ignore
        onClick={() => document.getElementById("my_modal_2").showModal()}
        className={`flex items-center text-xl hover:cursor-pointer ${"bg-lightPrimary p-2 text-brand-500 hover:bg-gray-100 dark:bg-navy-700 dark:text-white dark:hover:bg-white/20 dark:active:bg-white/10"} linear justify-center rounded-lg font-bold transition duration-200`}
      >
        <TiPlus className="w-6 h-6" />
      </button>
      <dialog id="my_modal_2" className="modal">
        <div className="modal-box">
          <h3 className="text-lg font-bold">Add medicine</h3>
          <div className="mt-4">
            <InputField
              value={medicine}
              onChange={setMedicine}
              variant="auth"
              extra="mb-3"
              label="Medicine name*"
              placeholder="Name"
              id="medicine"
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

export default CardMenuMedicines;
