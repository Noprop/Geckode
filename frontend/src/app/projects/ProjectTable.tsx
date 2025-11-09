"use client";
import { forwardRef, useImperativeHandle, useReducer } from "react";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { Project } from "@/lib/types/projects";

const columnHelper = createColumnHelper<Project>();

const columns = [
  columnHelper.accessor("thumbnail", {
    cell: (info) => <img src={info.getValue()!} alt="" className="h-3" />,
    header: () => <span></span>,
  }),
  columnHelper.accessor("name", {
    cell: (info) => info.getValue(),
    header: () => <span>Name</span>,
  }),
  columnHelper.accessor("updated_at", {
    cell: (info) => info.getValue()?.replace("T", "    ").split(".")[0], // reformat and drop anything after the minutes
    header: () => <span>Last Updated</span>,
  }),
  columnHelper.accessor("owner", {
    cell: (info) => info.getValue().username,
    header: () => <span>Owner</span>,
  }),
  columnHelper.accessor("created_at", {
    cell: (info) => info.getValue()?.replace("T", "    ").split(".")[0], // reformat and drop anything after the minutes
    header: () => <span>Created At</span>,
  }),
];

interface tableProps {
  data: Project[];
}
export type ProjectTableRef = {
  handleRefresh: () => void;
};

export const ProjectTable = forwardRef<ProjectTableRef, tableProps>(
  ({ data }: tableProps, ref) => {
    const rerender = useReducer(() => ({}), {})[1];

    const table = useReactTable({
      data,
      columns,
      getCoreRowModel: getCoreRowModel(),
    });

    const handleRefresh = () => {
      rerender();
    };

    // outsource handle refresh
    useImperativeHandle(ref, () => ({
      handleRefresh,
    }));

    return (
      <div className="p-2">
        <table className="w-full">
          <thead className="h-12 bg-light-secondary dark:bg-dark-secondary">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th className="text-left" key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map((row) => (
              <tr
                onClick={() => console.log(row.getValue("name"))}
                key={row.id}
                className="cursor-pointer hover:bg-light-tertiary hover:dark:bg-dark-tertiary h-10"
              >
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
);
