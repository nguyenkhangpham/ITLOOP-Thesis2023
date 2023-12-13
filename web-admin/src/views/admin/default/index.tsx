import React, { useState } from "react";

import PatientTable from "views/admin/default/components/PatientTable";
import { callAPI } from "utils/callAPIHelper";
import endpoint from "services/network/endpoint";
import { ROLE_ID } from "configs";
// import _ from "lodash";

const Dashboard = () => {
  const [patients, setPatients] = useState([]);

  const getPatients = () => {
    callAPI({
      API: endpoint.getUser,
      payload: { roleId: ROLE_ID.PATIENT },
      onSuccess: (res) => {
        setPatients(res.data);
      },
    });
  };

  React.useEffect(() => {
    getPatients();
  }, []);

  return (
    <div>
      <PatientTable tableData={patients} onAddAccountSuccess={getPatients} />
    </div>
  );
};

export default Dashboard;
