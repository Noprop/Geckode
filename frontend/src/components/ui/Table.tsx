"use client";
import { useEffect, useRef, useState } from "react";
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
import { Icon } from "@/components/icons/Icon";
import { InputBox, InputBoxRef } from "./InputBox";
import useDebounce from "@/hooks/useDebounce";
import { SelectionBox } from "./SelectionBox";
import { useSnackbar } from "@/hooks/useSnackbar";

export interface TableRef {}

interface TableProps<TData, TSortKeys, TApi> {
  ref?: React.Ref<TableRef>;
  label?: string;
  api: TApi;
  columns: Partial<ColumnDefinitions<TData>>;
  defaultSortField?: TSortKeys;
  defaultSortDirection?: "asc" | "desc";
  sortKeys?: TSortKeys[];
  handleRowClick?: (row: Row<TData>) => void;
  extras?: React.ReactNode;
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
  label,
  api,
  columns,
  defaultSortField,
  defaultSortDirection = 'asc',
  sortKeys = [],
  handleRowClick = () => {},
  extras,
}: TableProps<TData, TSortKeys, TApi>) => {
  const showSnackbar = useSnackbar();
  const pageNumberInputRef = useRef<InputBoxRef | null>(null);

  const [totalCount, setTotalCount] = useState<number>(0);
  const [data, setData] = useState<TData[]>([]);
  const [sorting, setSorting] = useState<SortingState>([]);
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });
  const [columnFilters, setColumnFilters] = useState<ColumnFilter[]>([]);
  const [searchInput, setSearchInput] = useState<string>('');

  const debouncedSearch = useDebounce(searchInput, 1000);

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
        search: searchInput.trim(),
      } as TFilters)
      .then(res => {
        setTotalCount(res.count);
        setData(res.results);
      })
      .catch(err => showSnackbar("Failed to fetch the table!", "error"));

    // TODO: Add drop down menus for the filters and figure out how to type them properly
    //       (especially custom filters that don't use the field name directly)
    // TODO: Standardize and display error messages for api errors
    // TODO: Add context to the entire app so that user details doesn't have to get fetched every time
  }, [sorting, pagination, debouncedSearch]);

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

  return (
    <div className="p-2">
      <h1 className="text-3xl mb-2 font-bold">{label}</h1>
      <div className="flex justify-between items-center">
        <div className="ml-2">
          <span>Display</span>
          <SelectionBox
            className="ml-2 mr-2"
            defaultValue={pagination.pageSize}
            options={[5, 10, 20, 50, 100].map(option => ({
              label: option,
              value: option
            }))}
            onChange={(e) => {
              setPagination({
                pageIndex: 0,
                pageSize: Number(e.target.value)
              });
            }}
          />
          <span>per page</span>
        </div>
        <div className="relative w-64 mx-2 my-4">
          <Icon
            name="magnifying-glass"
            size={20}
            className="absolute left-2 top-1/2 transform -translate-y-1/2"
          />
          <InputBox
            className="pl-9 pr-2 h-10 w-full border rounded"
            placeholder="Search"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
          />
        </div>
      </div>
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
                    className="text-left select-none pl-0.5"
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
                    {header.column.columnDef.header ? (
                      <Icon
                        name={("sort-" + (sortDirection === "asc" ? "up" : "down")) as "sort-up" | "sort-down"}
                        size={15}
                        className={"ml-3 " + (sortDirection ? "opacity-100" : "opacity-0")}
                      />
                    ) : null}
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
                <td key={cell.id} className="border-b border-gray-500">
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex justify-between items-center mt-4">
        <div
          className="ml-2"
        >{extras}</div>
        <div>
          <span style={{ margin: "0 10px", fontWeight: "bold" }}>
            {totalCount ? pagination.pageIndex * pagination.pageSize + 1 : 0} - {Math.min(
              totalCount,
              (pagination.pageIndex + 1) * pagination.pageSize
            )}
            <span style={{ fontWeight: "normal" }}> of </span>
            {totalCount}
          </span>
          <Icon
            name="angles-left"
            size={15}
            className="mx-2"
            onClick={() => {
              setPagination(prev => ({
                ...prev,
                pageIndex: 0
              }));
            }}
            disabled={pagination.pageIndex === 0}
          />
          <Icon
            name="angle-left"
            size={15}
            onClick={() => {
              setPagination(prev => ({
                ...prev,
                pageIndex: Math.max(prev.pageIndex - 1, 0)
              }));
            }}
            disabled={pagination.pageIndex === 0}
          />
          <InputBox
            ref={pageNumberInputRef}
            value={String(pagination.pageIndex + 1)}
            className="w-15 h-9 text-center ml-4 border"
            onChange={(e) => {
              setPagination(prev => ({
                ...prev,
                pageIndex: Math.min(
                  Math.ceil(totalCount / pagination.pageSize),
                  Math.max(Number(e.target.value.replace(/\D/g, "")), 1)
                ) - 1
              }));
            }}
          />
          <span style={{ margin: "0 10px" }}>
            of {Math.max(1, Math.ceil(totalCount / pagination.pageSize))}
          </span>
          <Icon
            name="angle-right"
            size={15}
            onClick={() => {
              setPagination(prev => ({
                ...prev,
                pageIndex: (prev.pageIndex + 1) * prev.pageSize < totalCount ? prev.pageIndex + 1 : prev.pageIndex
              }));
            }}
            disabled={(pagination.pageIndex + 1) * pagination.pageSize >= totalCount}
          />
          <Icon
            name="angles-right"
            size={15}
            className="mx-2"
            onClick={() => {
              setPagination(prev => ({
                ...prev,
                pageIndex: Math.ceil(totalCount / prev.pageSize) - 1
              }));
            }}
            disabled={(pagination.pageIndex + 1) * pagination.pageSize >= totalCount}
          />
        </div>
      </div>
    </div>
  );
};
