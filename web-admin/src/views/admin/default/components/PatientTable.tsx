import React from "react";
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
import CardMenuAccount from "components/card/CardMenuAccount";
import { ROLE_ID } from "configs";
import { useNavigate } from "react-router-dom";

type RowObj = {
  id: string;
  fullName: string;
  email: string;
  createdAt: string;
  action: any;
};

function PatientTable(props: {
  tableData: any;
  onAddAccountSuccess: (res?: any) => void;
}) {
  const { tableData, onAddAccountSuccess } = props;

  const navigate = useNavigate();
  const [sorting, setSorting] = React.useState<SortingState>([]);

  let defaultData = tableData;

  const columns = [
    columnHelper.accessor("fullName", {
      id: "fullName",
      header: () => (
        <p className="text-sm font-bold text-gray-600 dark:text-white">NAME</p>
      ),
      cell: (info: any) => (
        <div className="flex items-center">
          {/* <Checkbox
            defaultChecked={info.getValue()[1]}
            colorScheme="brandScheme"
            me="10px"
          /> */}
          <p className="ml-3 text-sm font-bold text-navy-700 dark:text-white">
            {info.getValue()}
          </p>
        </div>
      ),
    }),
    columnHelper.accessor("email", {
      id: "email",
      header: () => (
        <p className="text-sm font-bold text-gray-600 dark:text-white">EMAIL</p>
      ),
      cell: (info) => (
        <p className="text-sm font-bold text-navy-700 dark:text-white">
          {info.getValue()}
        </p>
      ),
    }),
    columnHelper.accessor("createdAt", {
      id: "createdAt",
      header: () => (
        <p className="text-sm font-bold text-gray-600 dark:text-white">
          DATE ADDED
        </p>
      ),
      cell: (info) => (
        <p className="text-sm font-bold text-navy-700 dark:text-white">
          {dayjs(info.getValue()).format("HH:MM DD/MM/YYYY")}
        </p>
      ),
    }),
    // columnHelpƒ
    columnHelper.accessor("action", {
      id: "action",
      header: () => null,
      cell: (info) => (
        <div className="flex">
          <button
            className="mr-2 btn btn-outline btn-success btn-sm"
            onClick={() => navigate(`/admin/patient/${info.row.original.id}`)}
          >
            Detail
          </button>
        </div>
      ),
    }),
  ]; // eslint-disable-next-line

  const [data, setData] = React.useState(() => [...defaultData]);

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
          List of patients
        </div>

        <CardMenuAccount
          roleId={ROLE_ID.PATIENT}
          onSuccess={onAddAccountSuccess}
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
    </Card>
  );
}

export default PatientTable;
const columnHelper = createColumnHelper<RowObj>();
