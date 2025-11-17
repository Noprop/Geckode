"use client";
import { useEffect, useImperativeHandle, useReducer, useState } from "react";
import {
  ColumnFilter,
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  PaginationState,
  Row,
  SortingState,
  useReactTable,
} from "@tanstack/react-table";
import { BaseApiInnerReturn, createBaseApi } from "@/lib/api/base";
import { BaseFilters } from "@/lib/types/api";

export interface TableRef {
  refresh: () => void;
}

interface TableProps<TData, TSortKeys, TApi> {
  ref?: React.Ref<TableRef>;
  api: TApi;
  columns: Partial<ColumnDefinitions<TData>>;
  defaultSortField?: TSortKeys;
  defaultSortDirection?: "asc" | "desc";
  sortKeys?: TSortKeys[];
  handleRowClick?: (row: Row<TData>) => void;
  handleFetchError?: () => void;
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

export const Table = <
  TData extends Record<string, any>,
  TPayload extends Record<string, any>,
  TFilters extends BaseFilters,
  TSortKeys extends keyof TData,
  TApi extends BaseApiInnerReturn<typeof createBaseApi<TData, TPayload, TFilters>>,
>({
  ref,
  api,
  columns,
  defaultSortField,
  defaultSortDirection = 'asc',
  sortKeys = [],
  handleRowClick = () => {},
  handleFetchError = () => {},
}: TableProps<TData, TSortKeys, TApi>) => {
  const rerender = useReducer(() => ({}), {})[1];

  const [totalCount, setTotalCount] = useState<number>(0);
  const [data, setData] = useState<TData[]>([]);
  const [sorting, setSorting] = useState<SortingState>([]);
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });
  const [columnFilters, setColumnFilters] = useState<ColumnFilter[]>([]);

  useEffect(() => {
    api
      .list({
        page: pagination.pageIndex + 1,
        limit: pagination.pageSize,
        ordering: sorting.length
          ? `${sorting[0].desc ? '-' : ''}${sorting[0].id}`
          : defaultSortField
            ? `${defaultSortDirection === 'desc' ? '-' : ''}${defaultSortField as string}`
            : undefined,
      } as TFilters)
      .then(res => {
        setTotalCount(res.count);
        setData(res.results);
      })
      .catch(err => handleFetchError());

    // TODO: Add drop down menus for the filters and figure out how to type them properly
    //       (especially custom filters that don't use the field name directly)
    // TODO: Standardize and display error messages for api errors
    // TODO: Typable page number input box
    // TODO: Add context to the entire app so that user details doesn't have to get fetched every time
  }, [sorting, pagination]);

  const cellRenderers: Partial<Record<ColumnTypes, (value: any) => any>> = {
    user: (value) => value.username,
    datetime: (value) => value.replace("T", " ").split(".")[0],
    thumbnail: (value) => <img src={value} alt="" className="h-3" />,
  }
  const defaultRenderer = (value: any) => value?.toString() ?? "";

  const columnHelper = createColumnHelper<TData>();
  const columnDefinitions = (Object.keys(columns) as Array<keyof TData>).map((key) => {
    const column = columns[key];
    const renderer = cellRenderers[column?.type ?? 'other'] ?? defaultRenderer;
    
    return columnHelper.accessor((row: TData) => row[key], {
      id: key as string,
      cell: (context) => column?.hidden ? '' : renderer(context.getValue()),
      header: column?.label ?? '',
      enableSorting: (sortKeys as Array<keyof TData>).includes(key),
      enableColumnFilter: false, // Temporary
    });
  });

  const table = useReactTable({
    data,
    columns: columnDefinitions,
    state: {
      sorting,
      columnFilters,
    },
    manualPagination: true,
    manualSorting: true,
    manualFiltering: true,
    onPaginationChange: setPagination,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getSortedRowModel: getSortedRowModel(),
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
              {headerGroup.headers.map((header) => {
                const canSort = header.column.getCanSort();
                const sortDirection = header.column.getIsSorted();
                return (
                  <th
                    key={header.id}
                    className="text-left"
                    onClick={canSort ? header.column.getToggleSortingHandler() : undefined}
                    style={{ cursor: canSort ? "pointer" : "default" }}
                  >
                    {header.isPlaceholder ? null : (
                      <>
                        {header.column.columnDef.header}
                        {header.column.getCanFilter() ? (
                          <>{/* Need to figure out what to put here */}</>
                          // <InputBox
                          //   onChange={e =>
                          //     setColumnFilters(old => [
                          //       ...old.filter(f => f.id !== header.column.id),
                          //       { id: header.column.id, value: e.target.value },
                          //     ])
                          //   }
                          //   placeholder="Filter..."
                          // />
                        ) : null}
                      </>
                    )}
                    {sortDirection === "asc" ? " 🔼" : sortDirection === "desc" ? " 🔽" : ""}
                  </th>
                );
              })}
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
      <div style={{ marginTop: 10 }}>
        <button
          onClick={() => setPagination(old =>
            Object.assign(old, {pageIndex: Math.max(old.pageIndex - 1, 0)})
          )}
          disabled={pagination.pageIndex === 0}
        >
          Previous
        </button>
        <span style={{ margin: "0 10px" }}>Page {pagination.pageIndex + 1}/{Math.ceil(totalCount / pagination.pageSize)}</span>
        <button
          onClick={() => setPagination(old =>
            Object.assign(old, {
              pageIndex: (old.pageIndex + 1) * old.pageSize < totalCount ? old.pageIndex + 1 : old
            })
          )}
          disabled={(pagination.pageIndex + 1) * pagination.pageSize >= totalCount}
        >
          Next
        </button>
      </div>
    </div>
  );
};
