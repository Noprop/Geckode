"use client";
import { useEffect, useImperativeHandle, useReducer } from "react";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  Row,
  useReactTable,
} from "@tanstack/react-table";

export interface TableRef {
  refresh: () => void;
}

interface TableProps<T> {
  ref?: React.Ref<TableRef>;
  data: T[];
  columns: Partial<ColumnDefinitions<T>>;
  handleRowClick?: (row: Row<T>) => void;
}

type ColumnTypes = "user" | "datetime" | "thumbnail" | "other";

type ColumnDefinitions<T> = {
  [K in keyof T]: ColumnDefinition;
};

type ColumnDefinition = {
  label?: string;
  type?: ColumnTypes;
  hidden?: boolean;
}

export interface ProjectTableRef {
  handleRefresh: () => void;
};

export const Table = <TData, TFilters>({ ref, data, columns, handleRowClick = () => {} }: TableProps<TData>) => {
  const rerender = useReducer(() => ({}), {})[1];

  useEffect(() => {
    // TODO: Move the projects loading here
    // TODO: Add context to the entire app so that user details doesn't have to get fetched every time
    // TODO: Add ability to click on columns to sort (click again to swap between ascending/descending)
    // TODO: Add drop down menus for the filters
  }, []);

  const cellRenderers: Partial<Record<ColumnTypes, (value: any) => any>> = {
    user: (value) => value.username,
    datetime: (value) => value.replace("T", " ").split(".")[0],
    thumbnail: (value) => <img src={value} alt="" className="h-3" />,
  }
  const defaultRenderer = (value: any) => value?.toString() ?? "";

  const columnHelper = createColumnHelper<TData>();
  const columnDefinitions = (Object.keys(columns) as Array<keyof TData>).map((key) => {
    const column = columns[key]!;
    const renderer = cellRenderers[column?.type ?? 'other'] ?? defaultRenderer;
    
    return columnHelper.accessor((row: TData) => row[key], {
      id: key as string,
      cell: (context) => column?.hidden ? '' : renderer(context.getValue()),
      header: column?.label ?? '',
    });
  });

  const table = useReactTable({
    data,
    columns: columnDefinitions,
    getCoreRowModel: getCoreRowModel(),
  });

  useImperativeHandle(ref, () => ({
    refresh: rerender,
  }));

  return (
    <div className="p-2">
      <table className="w-full">
        <thead className="table-header">
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
              onClick={() => handleRowClick(row)}
              key={row.id}
              className="table-row"
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
};
