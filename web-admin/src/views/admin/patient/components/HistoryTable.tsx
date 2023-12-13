import React, { useEffect, useRef, useState } from "react";
import CardMenu from "components/card/CardMenuAccount";
import Checkbox from "components/checkbox";
import Card from "components/card";

import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from "@tanstack/react-table";
import dayjs from "dayjs";
import CardMenuHistory from "./CardMenuHistory";
import { MultiSelect } from "react-multi-select-component";
import { useStore } from "store";
import InputField from "components/fields/InputField";
import _ from "lodash";
import { callAPI } from "utils/callAPIHelper";
import endpoint from "services/network/endpoint";
import { toast } from "sonner";

type RowObj = {
  id: number;
  diagnoseNow: string;
  pulse: string;
  bloodGlucose: any;
  createdAt: any;
  action: any;
};

function HistoryTable(props: {
  tableData: any;
  patientId: string;
  onAddMedicalHistorySuccess?: (res?: any) => void;
}) {
  const { tableData, onAddMedicalHistorySuccess, patientId } = props;

  const { medicines } = useStore();

  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [selectedMedicines, setSelectedMedicines] = useState([]);
  const [medicalHistoryId, setmedicalHistoryId] = useState(null);

  const _prevSelectedMedicinesData = useRef(null);

  const submitPrescription = () => {
    const isNotChange = _.isEqual(
      _prevSelectedMedicinesData.current,
      selectedMedicines
    );

    if (isNotChange && !_.isEmpty(selectedMedicines)) {
      // @ts-ignore
      document.getElementById("my_modal_4").close();
      toast.success("Create prescription successfully!");

      setSelectedMedicines([]);
      setmedicalHistoryId(null);

      return;
    }

    if (
      _.isEmpty(_prevSelectedMedicinesData.current) &&
      !_.isEmpty(selectedMedicines)
    ) {
      const payload = {
        orders: selectedMedicines.map((item) => ({
          medicalHistoryId: medicalHistoryId,
          medicineId: item.value,
          userManual: item.userManual,
        })),
      };

      callAPI({
        API: endpoint.requestCreatePrescription,
        payload,
        onSuccess(res) {
          // @ts-ignore
          document.getElementById("my_modal_4").close();

          toast.success("Create prescription successfully!");

          setSelectedMedicines([]);
          setmedicalHistoryId(null);
        },
        onError: (err) => {
          console.log(err);
        },
      });

      return
    }

    if (!isNotChange) {
      // console.log("old", _prevSelectedMedicinesData.current);
      // console.log("new", selectedMedicines);
      // console.log(
      //   "diff",
      //   _.differenceBy(
      //     _prevSelectedMedicinesData.current,
      //     selectedMedicines,
      //     "id"
      //   )
      // );
      const diff = _.differenceBy(
        _prevSelectedMedicinesData.current,
        selectedMedicines,
        "id"
      );

      const payload = {
        orders: selectedMedicines
          .map((item) => {
            if (item?.id)
              return {
                id: item.id,
                medicalHistoryId: medicalHistoryId,
                medicineId: item.value,
                userManual: item.userManual,
              };
            else {
              return {
                medicalHistoryId: medicalHistoryId,
                medicineId: item.value,
                userManual: item.userManual,
              };
            }
          })
          .concat(
            diff.map((item: any) => ({
              id: item.id,
              medicalHistoryId: medicalHistoryId,
              medicineId: item.value,
              userManual: item.userManual,
              deletedAt: new Date(),
            }))
          ),
      };

      callAPI({
        API: endpoint.requestCreatePrescription,
        payload,
        onSuccess(res) {
          // @ts-ignore
          document.getElementById("my_modal_4").close();

          toast.success("Create prescription successfully!");

          setSelectedMedicines([]);
          setmedicalHistoryId(null);
        },
        onError: (err) => {
          console.log(err);
        },
      });
    }
  };

  useEffect(() => {
    if (medicalHistoryId) {
      callAPI({
        API: endpoint.getPrescription,
        payload: { medicalHistoryId },
        onSuccess(res) {
          const data = res.data.map((item: any) => ({
            id: item.id,
            label: item.medicine.name,
            value: item.medicine.id,
            userManual: item.userManual,
          }));
          _prevSelectedMedicinesData.current = data;

          setSelectedMedicines(data);
        },
      });
    }
  }, [medicalHistoryId]);

  const columns = [
    columnHelper.accessor("diagnoseNow", {
      id: "diagnoseNow",
      header: () => (
        <p className="text-sm font-bold text-gray-600 dark:text-white">
          DIAGNOSE NOW
        </p>
      ),
      cell: (info: any) => (
        <p className="ml-3 text-sm font-bold text-navy-700 dark:text-white">
          {info.getValue()}
        </p>
      ),
    }),
    columnHelper.accessor("pulse", {
      id: "pulse",
      header: () => (
        <p className="text-sm font-bold text-gray-600 dark:text-white">PULSE</p>
      ),
      cell: (info: any) => (
        <p className="ml-3 text-sm font-bold text-navy-700 dark:text-white">
          {info.getValue()}
        </p>
      ),
    }),
    columnHelper.accessor("bloodGlucose", {
      id: "bloodGlucose",
      header: () => (
        <p className="text-sm font-bold text-gray-600 dark:text-white">
          BLOOD GLUCOSE
        </p>
      ),
      cell: (info: any) => (
        <p className="ml-3 text-sm font-bold text-navy-700 dark:text-white">
          {info.getValue()}
        </p>
      ),
    }),
    columnHelper.accessor("createdAt", {
      id: "createdAt",
      header: () => (
        <p className="text-sm font-bold text-gray-600 dark:text-white">DATE</p>
      ),
      cell: (info) => (
        <p className="text-sm font-bold text-navy-700 dark:text-white">
          {dayjs(info.getValue()).format("HH:MM DD/MM/YYYY")}
        </p>
      ),
    }),
    columnHelper.accessor("action", {
      id: "action",
      header: () => null,
      cell: (info) => (
        <div className="flex">
          <button
            onClick={() => {
              setmedicalHistoryId(info.row.original.id);

              // @ts-ignore
              document.getElementById("my_modal_4").showModal();
            }}
            className="mr-2 btn btn-outline btn-success btn-sm"
          >
            Prescription
          </button>
        </div>
      ),
    }),
  ]; // eslint-disable-next-line

  console.log(selectedMedicines);

  const table = useReactTable({
    data: tableData,
    columns,
    initialState: {
      pagination: {
        pageSize: 10,
      },
    },
    state: {
      sorting,
    },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    debugTable: true,
  });

  return (
    <Card extra={"w-full h-full sm:overflow-auto px-6 py-4"}>
      <header className="relative flex items-center justify-between">
        <div className="text-xl font-bold text-navy-700 dark:text-white">
          Medical history
        </div>

        <CardMenuHistory
          patientId={patientId}
          onSuccess={onAddMedicalHistorySuccess}
        />
      </header>

      <div className="mt-5 overflow-x-scroll xl:overflow-x-hidden">
        <table className="w-full">
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id} className="!border-px !border-gray-400">
                {headerGroup.headers.map((header) => {
                  return (
                    <th
                      key={header.id}
                      colSpan={header.colSpan}
                      onClick={header.column.getToggleSortingHandler()}
                      className="cursor-pointer border-b-[1px] border-gray-200 pb-2 pr-4 pt-4 text-start"
                    >
                      <div className="items-center justify-between text-xs text-gray-200">
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                        {{
                          asc: "",
                          desc: "",
                        }[header.column.getIsSorted() as string] ?? null}
                      </div>
                    </th>
                  );
                })}
              </tr>
            ))}
          </thead>
          <tbody className="pt-2">
            {table
              .getRowModel()
              .rows.slice(0, 5)
              .map((row) => {
                return (
                  <tr key={row.id}>
                    {row.getVisibleCells().map((cell) => {
                      return (
                        <td
                          key={cell.id}
                          className="min-w-[150px] border-white/0 pr-4 pt-6"
                        >
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )}
                        </td>
                      );
                    })}
                  </tr>
                );
              })}
          </tbody>
        </table>
        <div className="divider" />
        <div className="flex items-center justify-between">
          <div className="flex">
            <p className="mr-4">
              Page <strong>{table.getState().pagination.pageIndex + 1}</strong>{" "}
              of <strong>{table.getPageCount()}</strong>
            </p>
            <p>
              Total: <strong>{tableData.length}</strong>
            </p>
          </div>
          <div>
            <button
              disabled={!table.getCanPreviousPage()}
              onClick={() => table.previousPage()}
              className="mr-2 btn btn-outline btn-sm"
            >
              Previous
            </button>
            <button
              disabled={!table.getCanNextPage()}
              onClick={() => table.nextPage()}
              className="btn btn-outline btn-sm"
            >
              Next
            </button>
          </div>
        </div>
      </div>
      <dialog id="my_modal_4" className="modal">
        <div className="overflow-hidden modal-box">
          <div className="flex justify-between">
            <h3 className="text-lg font-bold">Prescriptions</h3>
            <button
              onClick={() => {
                // @ts-ignore
                document.getElementById("my_modal_4").close();

                setSelectedMedicines([]);
                setmedicalHistoryId(null);
              }}
              className="btn btn-circle btn-ghost btn-sm"
            >
              x
            </button>
          </div>
          <div className="mt-3">
            <p className="mb-2 font-semibold">Select medicines</p>
            <MultiSelect
              options={medicines.map((value) => ({
                label: value.name,
                value: value.id,
              }))}
              value={selectedMedicines}
              // @ts-ignore
              onChange={(value) => {
                const temp = _.map([...value], (item) => ({
                  ...item,
                  id: item?.id ? item.id : null,
                  userManual: item?.userManual ? item.userManual : "",
                }));

                setSelectedMedicines(temp);
              }}
              // on
              labelledBy="Select"
            />
          </div>
          <div className="mt-5 h-[300px] overflow-y-scroll">
            {selectedMedicines.map((item) => (
              <InputField
                value={item.userManual}
                onChange={(text) => {
                  console.log("here");
                  const updatedArray = _.map(selectedMedicines, (obj) => {
                    if (obj.value === item.value) {
                      const newObj = _.cloneDeep(obj);
                      newObj.userManual = text;
                      return newObj;
                    }

                    return obj;
                  });

                  setSelectedMedicines(updatedArray);
                }}
                variant="auth"
                extra="mb-3"
                label={`${item.label}*`}
                placeholder="User manual"
                id={item.value}
                type="text"
              />
            ))}
          </div>
          <button onClick={submitPrescription} className="float-right mt-4 btn">
            Submit
          </button>
        </div>
        {/* <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form> */}
      </dialog>
    </Card>
  );
}

export default HistoryTable;
const columnHelper = createColumnHelper<RowObj>();
