import React, { useEffect, useState } from "react";
import HistoryTable from "./components/HistoryTable";
import PrescriptionTable from "./components/PrescriptionTable";
import { callAPI } from "utils/callAPIHelper";
import endpoint from "services/network/endpoint";
import { useParams } from "react-router-dom";
import Card from "components/card";
import { ROLE_ID } from "configs";
import { useStore } from "store";

const PatientDetail = () => {
  const { id } = useParams();

  const { getMedicines } = useStore();

  const [medicalHistory, setMedicalHistory] = useState([]);
  const [patient, setPatient] = useState<any>({});

  const getPatient = () => {
    callAPI({
      API: endpoint.getUser,
      payload: {
        roleId: ROLE_ID.PATIENT,
      },
      onSuccess(res) {
        setPatient(res.data.find((value: any) => value.id === Number(id)));
      },
    });
  };

  const getMedicalHistory = () => {
    callAPI({
      API: endpoint.getMedicalHistory,
      payload: { patientId: id },
      onSuccess(res) {
        setMedicalHistory(res.data);
      },
    });
  };

  useEffect(() => {
    getPatient();
    getMedicalHistory();
    getMedicines();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <Card>
        <div className="p-5">
          <h1 className="mb-4 text-xl font-bold">Information</h1>
          <p>
            Name: <strong>{patient?.fullName}</strong>
          </p>
          <p>
            Email: <strong>{patient?.email}</strong>
          </p>
        </div>
      </Card>
      <div className="h-5" />
      <HistoryTable
        tableData={medicalHistory}
        onAddMedicalHistorySuccess={getMedicalHistory}
        patientId={id}
      />
      {/* <div className="h-5" />
      <PrescriptionTable tableData={[]} /> */}
    </div>
  );
};

export default PatientDetail;
