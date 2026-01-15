import { Dispatch, HTMLAttributes, Ref, SetStateAction, useEffect, useImperativeHandle, useRef, useState } from "react";
import { InputBox } from "./InputBox";
import { BaseFilters } from "@/lib/types/api";
import { BaseApiInnerReturn, createBaseApi } from "@/lib/api/base";
import { Table, TableColumns, TableRef } from "../Table";
import useDebounce from "@/hooks/useDebounce";
import { Row } from "@tanstack/react-table";

export interface ApiModelSearchBoxRef {
  setIsFocused: Dispatch<SetStateAction<boolean>>;
  refresh: () => void;
}

interface ApiModelSearchBoxProps<TApi, TData, TFilters> {
  ref?: Ref<ApiModelSearchBoxRef>;
  placeholder?: string;
  className?: HTMLAttributes<HTMLElement>["className"];
  api: TApi;
  columns: TableColumns<TData>;
  filters?: Partial<TFilters>;
  handleRowClick?: (row: Row<TData>) => void;
}

export const ApiModelSearchBox = <
  TData extends Record<string, any>,
  TPayload extends Record<string, any>,
  TFilters extends BaseFilters,
  TSortKeys extends string,
  TApi extends BaseApiInnerReturn<typeof createBaseApi<TData, TPayload, TFilters>>,
>({
  ref,
  placeholder = '',
  className = '',
  api,
  columns,
  filters = {},
  handleRowClick = () => {},
}: ApiModelSearchBoxProps<TApi, TData, TFilters>) => {
  const [search, setSearch] = useState<string>('');
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const [hasTyped, setHasTyped] = useState<boolean>(false);
  const searchDebounce = useDebounce(search, 1000);
  const tableRef = useRef<TableRef<TData, TFilters>>(null);

  useEffect(() => {
    setHasTyped(true);
  }, [searchDebounce]);

  useEffect(() => {
    tableRef.current?.setSearchInput(search);
  }, [search]);

  useImperativeHandle(ref, () => ({
    setIsFocused,
    refresh: () => tableRef.current?.refresh(),
  }));

  return (
    <div className={`${className} relative group`}>
      <InputBox
        placeholder={placeholder}
        className="w-full"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setTimeout(
          () => setIsFocused(false),
          100
        )}
      />
      {hasTyped && (
        <div 
          className={`absolute top-full left-0 w-full mt-1 bg-light-bg
                      dark:bg-dark-secondary border rounded-lg shadow-xl
                      z-50 max-h-60 overflow-y-auto
                      ${isFocused ? '' : 'hidden'}
                      `}
        >
          <Table<
            TData,
            TPayload,
            TFilters,
            TSortKeys,
            typeof api
          >
            ref={tableRef}
            api={api}
            columns={{
              ...{
                id: {
                  key: "id",
                  hidden: true,
                },
              },
              ...columns
            }}
            initialFilters={filters}
            defaultPageSize={3}
            enableSearch={false}
            rowStyle="p-2"
            noResultsMessage="No non-collaborators match this search."
            showControls={false}
            showHeader={false}
            initialSearch={search}
            handleRowClick={handleRowClick}
          />
        </div>
      )}
    </div>
  );
};