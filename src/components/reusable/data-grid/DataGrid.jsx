import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import PropTypes, { object } from "prop-types";
import { useMemo } from "react";
import { convertDateToLocaleDateString } from "../../../helper/helper";

const columnHelper = createColumnHelper();

function Checkbox({ row }) {
  return (
    <input
      onClick={() => console.log(row)}
      id="checkbox-all-search"
      type="checkbox"
      className="h-4 w-4 rounded border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600 dark:focus:ring-offset-gray-800"
    />
  );
}

Checkbox.propTypes = {
  row: PropTypes.object,
};

function EditActions({ row, onEdit }) {
  return (
    <a
      onClick={() => onEdit(row.original)}
      className="font-medium text-primary hover:underline dark:text-primary"
    >
      Edit
    </a>
  );
}

EditActions.propTypes = {
  row: PropTypes.object,
  onEdit: PropTypes.func,
};

function DeleteAction({ row, onDelete }) {
  return (
    <a
      onClick={() => onDelete(row.original)}
      className="font-medium text-red-600 hover:underline dark:text-red-500"
    >
      Remove
    </a>
  );
}

DeleteAction.propTypes = {
  row: PropTypes.object,
  onDelete: PropTypes.func,
};

const generateColumns = (arr) => {
  let columns = [];
  columns = arr.map((item) =>
    columnHelper.accessor(item.id, {
      header: item.header,
      cell: (info) =>
        item.id == "date"
          ? convertDateToLocaleDateString(info.getValue())
          : item.id == "amount"
          ? "$" + info.getValue()
          : info.getValue(),
    })
  );
  return columns;
};

const generateActions = (actions, onEdit, onDelete) => {
  if (!actions) return [];
  return [
    columnHelper.display({
      id: "edit",
      cell: ({ row }) => <EditActions row={row} onEdit={onEdit} />,
    }),
    columnHelper.display({
      id: "delete",
      cell: ({ row }) => <DeleteAction row={row} onDelete={onDelete} />,
    }),
  ];
};

const generateCheckbox = (checkbox) => {
  if (!checkbox) return [];
  return [
    columnHelper.display({
      id: "checkbox",
      cell: ({ row }) => <Checkbox row={row} />,
    }),
  ];
};

export const DataGrid = ({
  gridColumns,
  checkbox = false,
  actions = false,
  gridData,
  onEdit,
  onDelete,
}) => {
  const data = useMemo(() => gridData, [gridData]);

  const columns = useMemo(
    () => [
      ...generateCheckbox(checkbox),
      ...generateColumns(gridColumns),
      ...generateActions(actions, onEdit, onDelete),
    ],
    [checkbox, gridColumns, actions, onEdit, onDelete]
  );

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  return (
    // <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
    <table className="datagridtable relative w-full text-left text-sm text-gray-500 dark:text-gray-400">
      <thead className="sticky left-0 top-0 bg-primary text-xs uppercase text-white dark:bg-gray-700 dark:text-gray-400">
        {table.getHeaderGroups().map((headerGroup) => (
          <tr key={headerGroup.id}>
            {headerGroup.headers.map((header) => (
              <th key={header.id} scope="col" className="px-6 py-3">
                {header.isPlaceholder ? null : (
                  <div
                    {...{
                      className: header.column.getCanSort()
                        ? "cursor-pointer select-none"
                        : "",
                      onClick: header.column.getToggleSortingHandler(),
                    }}
                  >
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                    {{
                      asc: <ion-icon name="caret-up"></ion-icon>,
                      desc: <ion-icon name="caret-down"></ion-icon>,
                    }[header.column.getIsSorted()] ?? null}
                  </div>
                )}
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody>
        {table.getRowModel().rows.map((row) => (
          <tr
            key={row.id}
            className="cursor-default border-b border-primaryVariant bg-white hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-600"
          >
            {row.getVisibleCells().map((cell) => (
              <td key={cell.id} className="px-6 py-4">
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
      <tfoot>
        {table.getFooterGroups().map((footerGroup) => (
          <tr key={footerGroup.id}>
            {footerGroup.headers.map((header) => (
              <th key={header.id}>
                {header.isPlaceholder
                  ? null
                  : flexRender(
                      header.column.columnDef.footer,
                      header.getContext()
                    )}
              </th>
            ))}
          </tr>
        ))}
      </tfoot>
    </table>
    // </div>
  );
};

DataGrid.propTypes = {
  gridColumns: PropTypes.arrayOf(object),
  checkbox: PropTypes.bool,
  actions: PropTypes.bool,
  gridData: PropTypes.arrayOf(object),
  onEdit: PropTypes.func,
  onDelete: PropTypes.func,
};
