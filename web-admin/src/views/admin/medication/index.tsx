import { useEffect } from "react";
import MedicationTable from "./components/MedicationTable";
import { useStore } from "store";

const Medication = () => {
  const { getMedicines, medicines } = useStore();

  useEffect(() => {
    getMedicines();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <MedicationTable
        tableData={medicines}
        onAddMedicineSuccess={getMedicines}
      />
    </div>
  );
};

export default Medication;
