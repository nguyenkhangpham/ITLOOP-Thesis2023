import { callAPI } from "utils/callAPIHelper";
import AccountTable from "./components/AccountTable";
import { useEffect, useState } from "react";
import endpoint from "services/network/endpoint";
import { ROLE_ID } from "configs";

const AccountPage = () => {
  const [doctors, setDoctors] = useState([]);

  const getDoctors = () => {
    callAPI({
      API: endpoint.getUser,
      payload: { roleId: ROLE_ID.DOCTOR },
      onSuccess: (res) => {
        setDoctors(res.data);
      },
    });
  };

  useEffect(() => {
    getDoctors();
  }, []);

  return (
    <div>
      <AccountTable onAddAccountSuccess={getDoctors} tableData={doctors} />
    </div>
  );
};

export default AccountPage;
