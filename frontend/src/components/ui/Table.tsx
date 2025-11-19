"use client";
import { useEffect, useImperativeHandle, useReducer, useRef, useState } from "react";
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

  const pageNumberInputRef = useRef<InputBoxRef | null>(null);

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
                    className="text-left select-none"
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
                    {sortDirection ? (
                      <Icon
                        name={("sort-" + (sortDirection === "asc" ? "up" : "down")) as "sort-up" | "sort-down"}
                        size={15}
                        className="ml-3"
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
      <div className="flex justify-end items-center mt-2">
        <span style={{ margin: "0 10px", fontWeight: "bold" }}>
          {pagination.pageIndex * pagination.pageSize + 1} - {Math.min(
            totalCount,
            (pagination.pageIndex + 1) * pagination.pageSize
          )}
          <span style={{ fontWeight: "normal" }}> of </span>
          {totalCount}
        </span>
        <Icon
          name="angles-left"
          size={15}
          className="text-white ml-2 mr-2"
          onClick={() => setPagination(old =>
            Object.assign(old, {pageIndex: 0})
          )}
          disabled={pagination.pageIndex === 0}
        />
        <Icon
          name="angle-left"
          size={15}
          className="text-white"
          onClick={() => setPagination(old =>
            Object.assign(old, {pageIndex: Math.max(old.pageIndex - 1, 0)})
          )}
          disabled={pagination.pageIndex === 0}
        />
        <InputBox
          ref={pageNumberInputRef}
          defaultValue={pagination.pageIndex + 1}
          className="w-15 h-10 text-center ml-4 border"
          onChange={(e) => {
            const targetPageNumber = Number(e.target.value.replace(/\D/g, ""));

            pageNumberInputRef.current?.setInputValue(
              String(Math.min(
                Math.ceil(totalCount / pagination.pageSize),
                Math.max(targetPageNumber, 1))
              )
            );
          }}
        />
        <span style={{ margin: "0 10px" }}>
          of {Math.max(1, Math.ceil(totalCount / pagination.pageSize))}
        </span>
        <Icon
          name="angle-right"
          size={15}
          className="text-white"
          onClick={() => setPagination(old =>
            Object.assign(old, {
              pageIndex: (old.pageIndex + 1) * old.pageSize < totalCount ? old.pageIndex + 1 : old
            })
          )}
          disabled={(pagination.pageIndex + 1) * pagination.pageSize >= totalCount}
        />
        <Icon
          name="angles-right"
          size={15}
          className="text-white ml-2 mr-2"
          onClick={() => setPagination(old =>
            Object.assign(old, {
              pageIndex: Math.ceil(totalCount / old.pageSize)
            })
          )}
          disabled={(pagination.pageIndex + 1) * pagination.pageSize >= totalCount}
        />
      </div>
    </div>
  );
};
