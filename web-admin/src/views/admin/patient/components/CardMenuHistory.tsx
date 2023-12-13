import React, { useState } from "react";
import { TiPlus } from "react-icons/ti";
import InputField from "components/fields/InputField";
import { callAPI } from "utils/callAPIHelper";
import endpoint from "services/network/endpoint";
import { toast } from "sonner";
import _ from "lodash";

function CardMenuHistory(props: {
  patientId: string;
  onSuccess: (res?: any) => void;
}) {
  const { patientId, onSuccess } = props;
  const [inputValue, setInputValue] = useState({
    diagnoseNow: "",
    pulse: "",
    bloodGlucose: "",
  });

  const handleOnAddMidicalHistory = () => {
    const isValid = _.values(inputValue).some((value) => !_.isEmpty(value));

    if (!isValid) return toast.error("An error occurred");

    callAPI({
      API: endpoint.requestCreateMedicalHistory,
      payload: { ...inputValue, patientId },
      onSuccess: (res) => {
        // @ts-ignore
        document.getElementById("my_modal_3").close();

        // clear
        setInputValue({ diagnoseNow: "", pulse: "", bloodGlucose: "" });

        toast.success("Add medicine successfully");
        onSuccess(res);
      },
    });
  };

  return (
    <>
      <button
        // @ts-ignore
        onClick={() => document.getElementById("my_modal_3").showModal()}
        className={`flex items-center text-xl hover:cursor-pointer ${"bg-lightPrimary p-2 text-brand-500 hover:bg-gray-100 dark:bg-navy-700 dark:text-white dark:hover:bg-white/20 dark:active:bg-white/10"} linear justify-center rounded-lg font-bold transition duration-200`}
      >
        <TiPlus className="w-6 h-6" />
      </button>
      <dialog id="my_modal_3" className="modal">
        <div className="modal-box">
          <h3 className="text-lg font-bold">Add medical history</h3>
          <div className="mt-4">
            <InputField
              value={inputValue.diagnoseNow}
              onChange={(text) =>
                setInputValue((prev) => ({ ...prev, diagnoseNow: text }))
              }
              variant="auth"
              extra="mb-3"
              label="Diagnose now*"
              placeholder="diagnose now"
              id="diagnoseNow"
            />
            <InputField
              value={inputValue.pulse}
              onChange={(text) =>
                setInputValue((prev) => ({ ...prev, pulse: text }))
              }
              variant="auth"
              extra="mb-3"
              label="Pulse*"
              placeholder="pulse"
              id="pulse"
            />
            <InputField
              value={inputValue.bloodGlucose}
              onChange={(text) =>
                setInputValue((prev) => ({ ...prev, bloodGlucose: text }))
              }
              variant="auth"
              extra="mb-3"
              label="Blood glucose*"
              placeholder="Blood glucose"
              id="bloodGlucose"
            />
            <button
              className="float-right mt-4 btn"
              onClick={handleOnAddMidicalHistory}
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

export default CardMenuHistory;
