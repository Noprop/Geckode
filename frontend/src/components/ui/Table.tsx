'use client';
import { useEffect, useImperativeHandle, useRef, useState, HTMLAttributes, Dispatch, SetStateAction } from 'react';
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  PaginationState,
  Row,
  SortingState,
  useReactTable,
} from '@tanstack/react-table';
import { BaseFilters } from '@/lib/types/api';
import { Icon, IconType } from './Icon';
import { UserIcon } from './UserIcon';
import { InputBox, InputBoxRef } from './inputs/InputBox';
import { EditableApiTextCell } from './inputs/EditableApiTextCell';
import { Option, SelectionBox } from './selectors/SelectionBox';
import { useSnackbar } from '@/hooks/useSnackbar';
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  DoubleArrowLeftIcon,
  DoubleArrowRightIcon,
  MagnifyingGlassIcon,
  TextAlignBottomIcon,
  TextAlignTopIcon,
} from '@radix-ui/react-icons';
import { BaseApiInnerReturn, createBaseApi } from '@/lib/api/base';
import useMultiDebounce from '@/hooks/useMultiDebounce';
import { formatTimeSince } from '@/lib/time';

export interface TableRef<TData, TFilters> {
  refresh: () => void;
  data: TData[];
  setData: Dispatch<SetStateAction<TData[]>>;
  setTotalCount: Dispatch<SetStateAction<number>>;
  updateRowById: (rowId: number | string, updater: (row: TData) => TData) => void;
  addRowIfSpace: (rowId: number | string, row: TData) => void;
  removeRowById: (rowId: number | string) => void;
  filters: Filters<TFilters>;
  setFilters: Dispatch<SetStateAction<Filters<TFilters>>>;
  searchInput: string;
  setSearchInput: Dispatch<SetStateAction<string>>;
  pagination: PaginationState;
}

type Filters<TFilters> = Partial<Omit<TFilters, keyof BaseFilters>>;

interface TableProps<TData, TSortKeys, TApi, TFilters> {
  ref?: React.Ref<TableRef<TData, TFilters>>;
  api: TApi;
  columns: TableColumns<TData>;
  defaultSortField?: TSortKeys;
  defaultSortDirection?: 'asc' | 'desc';
  defaultPageSize?: number;
  pageSizeOptions?: number[];
  enableSearch?: boolean;
  sortKeys?: TSortKeys[];
  handleRowClick?: (row: Row<TData>) => void;
  handleRowDoubleClick?: (row: Row<TData>) => void;
  actions?: TableAction<TData>[];
  extras?: React.ReactNode;
  style?: string;
  rowStyle?: string;
  showHeader?: boolean;
  noResultsMessage?: React.ReactNode;
  initialFilters?: Filters<TFilters>;
  showControls?: boolean;
  initialSearch?: string;
  getRowIdValue?: (row: TData) => number | string | null | undefined;
}

type ColumnTypes =
  | 'user'
  | 'avatar'
  | 'datetime'
  | 'time-since'
  | 'thumbnail'
  | 'select'
  | 'editable-text'
  | 'other';

interface TableAction<TData> {
  rowIcon: IconType;
  rowIconClicked: (index: number) => void;
  rowIconClassName?: HTMLAttributes<HTMLElement>['className'];
  rowIconSize?: number;
  canUse?: (row: TData) => boolean;
  modalIcon?: IconType;
  modalIconClassName?: HTMLAttributes<HTMLElement>['className'];
  modalTitle?: string;
  modalContent?: React.ReactNode;
  modalActions?: React.ReactNode;
}

type PathKeys<T> =
  | [keyof T & string]
  | {
      [K in keyof T & string]: T[K] extends Record<string, any>
        ? [K, keyof T[K] & string]
        : [K];
    }[keyof T & string];

// Column Map specifies fields/methods for each column
type ColumnMap<TData> = {
  key: keyof TData | PathKeys<TData> | '.';
  value?: (field: any) => any;
  type?: ColumnTypes;
  hidden?: boolean;
  hideLabel?: boolean;
  options?: Option[];
  style?: string;
  disabled?: boolean;
};

// A map for each column with the key being the column label
export type TableColumns<TData> = Record<string, ColumnMap<TData>>;

export const Table = <
  TData extends Record<string, any>,
  TPayload extends Record<string, any>,
  TFilters extends BaseFilters,
  TSortKeys extends string,
  TApi extends BaseApiInnerReturn<typeof createBaseApi<TData, TPayload, TFilters>>,
>({
  ref,
  api,
  columns,
  defaultSortField,
  defaultSortDirection = 'asc',
  defaultPageSize = 10,
  pageSizeOptions = [5, 10, 25, 50],
  enableSearch = true,
  sortKeys = [],
  handleRowClick = () => {},
  handleRowDoubleClick,
  actions,
  extras,
  style = '',
  rowStyle = '',
  showHeader = true,
  noResultsMessage = 'No results to display.',
  initialFilters = {},
  showControls = true,
  initialSearch = '',
  getRowIdValue,
}: TableProps<TData, TSortKeys, TApi, TFilters>) => {
  const showSnackbar = useSnackbar();
  const pageNumberInputRef = useRef<InputBoxRef | null>(null);

  const [totalCount, setTotalCount] = useState<number>(0);
  const [data, setData] = useState<TData[]>([]);
  const [filters, setFilters] = useState<Filters<TFilters>>(initialFilters);
  const [sorting, setSorting] = useState<SortingState>([]);
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: defaultPageSize,
  });
  const [searchInput, setSearchInput] = useState<string>(initialSearch);
  const [loading, setLoading] = useState<boolean>(true);

  const debouncedFilters = useMultiDebounce({
    values: { searchInput, sorting, pagination, filters },
    delays: {
      searchInput: 1000,
      sorting: 100,
      pagination: 50,
      filters: 300,
    },
  });

  const getValueAtPath = (row: TData, path: string[]) => path.reduce((acc: any, key) => acc?.[key], row);

  const setRowValueAtPath = (row: TData, path: string[], newValue: unknown): TData => {
    if (path.length === 1) {
      return { ...row, [path[0]]: newValue } as TData;
    }

    const [first, ...rest] = path;

    return {
      ...row,
      [first]: setRowValueAtPath((row as any)?.[first] ?? {}, rest, newValue),
    } as TData;
  };

  const inferRowId = (row: TData): number | string | null | undefined => {
    if (getRowIdValue) {
      return getRowIdValue(row);
    }

    const idColumnKey = columns?.id?.key;
    if (!idColumnKey) return undefined;

    const idPath = Array.isArray(idColumnKey) ? (idColumnKey as string[]) : [idColumnKey as string];

    return getValueAtPath(row, idPath);
  };

  const fetchData = () => {
    setLoading(true);
    api
      .list({
        page: pagination.pageIndex + 1,
        limit: pagination.pageSize,
        ordering: sorting.length
          ? (sorting[0].desc ? '-' : '') +
            ((Array.isArray(columns[sorting[0].id].key)
              ? (columns[sorting[0].id].key as string[]).at(-1)
              : columns[sorting[0].id].key) as string)
          : defaultSortField
            ? `${defaultSortDirection === 'desc' ? '-' : ''}${defaultSortField as string}`
            : undefined,
        search: searchInput.trim(),
        ...filters,
      } as TFilters)
      .then((res) => {
        setTotalCount(res.count);
        setData(res.results);
      })
      .catch((err) => {
        // Try again with previous page (ex: if a deletion occurs on the last page
        //                    it will throw an error due to the page not existing)
        if (err?.response?.data?.detail === 'Invalid page.' && pagination.pageIndex > 0) {
          setPagination((prev) => ({ ...prev, pageIndex: prev.pageIndex - 1 }));
        } else {
          showSnackbar('Failed to fetch the table!', 'error');
        }
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchData();
  }, [debouncedFilters]);

  useEffect(() => {
    setPagination((prev) => ({ ...prev, pageIndex: 0 }));
  }, [searchInput]);

  const cellRenderers: Partial<
    Record<ColumnTypes, (value: any, column: ColumnMap<TData>, rowId: number) => React.ReactNode>
  > = {
    user: (value) => <UserIcon user={value} variant='inline' />,
    avatar: (value) => <UserIcon user={value} variant='avatar' size='lg' />,
    datetime: (value) => new Date(value).toLocaleString(),
    'time-since': (value) => formatTimeSince(value),
    thumbnail: (value) => (
      <div className='h-13 w-13 overflow-hidden rounded-xs'>
        <img src={value || '/user-icon.png'} alt='Thumbnail/Icon' className={`size-full object-cover`} />
      </div>
    ),
    select: (value, column, rowId) => {
      const path = Array.isArray(column.key) ? (column.key as string[]) : [column.key as string];

      const setRowValueAtPath = (row: TData, path: string[], newValue: unknown): TData => {
        if (path.length === 1) {
          return { ...row, [path[0]]: newValue } as TData;
        }
        const [first, ...rest] = path;
        return {
          ...row,
          [first]: setRowValueAtPath((row as any)?.[first] ?? {}, rest, newValue),
        } as TData;
      };

      return (
        <SelectionBox
          defaultValue={value}
          options={column.options}
          disabled={column?.disabled}
          onChange={(e) => {
            const newValue = e.target.value;
            api(
              (Array.isArray(columns.id.key) ? columns.id.key : [columns.id.key]).reduce(
                (acc: any, key) => acc?.[key],
                data[rowId],
              ),
            )
              .update({
                [(Array.isArray(column.key) ? (column.key as string[]).at(-1) : column.key) as keyof TData]: newValue,
              } as unknown as Partial<TPayload>)
              .then(() => {
                setData((prev) =>
                  prev.map((row, i) => (i === rowId ? setRowValueAtPath({ ...row }, path, newValue) : row)),
                );
              })
              .catch(() => {
                showSnackbar('Something went wrong. Please try again later.', 'error');
              });
          }}
          className='w-full'
        />
      );
    },
    'editable-text': (value, column, rowId) => {
      const path = Array.isArray(column.key) ? (column.key as string[]) : [column.key as string];
      const idColumnKey = columns?.id?.key;

      let resourceId: number | string | null | undefined = null;
      if (idColumnKey) {
        const idPath = Array.isArray(idColumnKey) ? (idColumnKey as string[]) : [idColumnKey as string];
        resourceId = getValueAtPath(data[rowId], idPath);
      }

      return (
        <EditableApiTextCell<TPayload>
          value={value ?? ''}
          api={api as any}
          resourceId={resourceId}
          fieldPath={path}
          placeholder='No name'
          disabled={column?.disabled}
        />
      );
    },
  };
  const defaultRenderer = (value: any) => value?.toString() ?? '';

  const columnHelper = createColumnHelper<TData>();
  const columnDefinitions = [
    ...Object.keys(columns).map((label) => {
      const columnMapper = columns[label];
      const renderer = cellRenderers[columnMapper.type ?? 'other'] ?? defaultRenderer;

      const keyPath =
        columnMapper.key === '.'
          ? []
          : Array.isArray(columnMapper.key)
            ? columnMapper.key
            : [columnMapper.key];

      return columnHelper.accessor(
        (row: TData) =>
          keyPath.reduce((acc: any, key) => (key === '.' ? acc : acc?.[key]), row),
        {
          id: label,
          cell: (context) =>
            columnMapper.hidden
              ? ''
              : renderer(
                  columnMapper.value ? columnMapper.value(context.getValue()) : context.getValue(),
                  columnMapper,
                  Number(context.row.id),
                ),
          header: columnMapper.hidden || columnMapper.hideLabel ? '' : label,
          enableSorting: (sortKeys as Array<keyof TData>).includes(
            keyPath.at(-1) as keyof TData,
          ),
          enableColumnFilter: false, // Temporary
          meta: {
            style: columnMapper.style,
          },
          enableHiding: columnMapper.hidden,
        },
      );
    }),
    ...(actions?.length
      ? [
          columnHelper.accessor('actions' as any, {
            id: 'actions',
            cell: (context) =>
              actions.map((action, index) => {
                const canUseAction = action.canUse === undefined || action.canUse(data[Number(context.row.id)]);

                if (!canUseAction) return;

                return (
                  <Icon
                    key={index}
                    icon={action.rowIcon}
                    size={action.rowIconSize}
                    className={action.rowIconClassName + ' mx-1 invisible group-hover/row:visible'}
                    onClick={(e) => {
                      if (!canUseAction) return;
                      e.stopPropagation();
                      action.rowIconClicked(Number(context.row.id));
                    }}
                  />
                );
              }),
            header: '',
            enableSorting: false,
            enableColumnFilter: false,
            meta: {
              style: 'text-right pr-2 w-px whitespace-nowrap',
            },
          }),
        ]
      : []),
  ];

  const table = useReactTable({
    data,
    columns: columnDefinitions,
    initialState: {
      columnVisibility: Object.entries(columns).reduce((acc, [key, value]) => {
        return {
          ...acc,
          [key]: !value?.hidden,
        };
      }, {}),
    },
    state: {
      sorting,
    },
    getRowId: (_row, index) => index.toString(),
    manualPagination: true,
    manualSorting: true,
    manualFiltering: true,
    onPaginationChange: setPagination,
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    getCoreRowModel: getCoreRowModel(),
  });

  useImperativeHandle(ref, () => ({
    refresh: fetchData,
    data,
    setData,
    setTotalCount,
    updateRowById: (rowId, updater) => {
      const normalizedRowId = String(rowId);
      setData((previousRows) =>
        previousRows.map((row) => {
          const currentRowId = inferRowId(row);
          if (currentRowId === null || currentRowId === undefined) return row;
          if (String(currentRowId) !== normalizedRowId) return row;
          return updater(row);
        }),
      );
    },
    addRowIfSpace: (rowId, row) => {
      const normalizedRowId = String(rowId);
      let inserted = false;
      let alreadyPresent = false;

      setData((previousRows) => {
        alreadyPresent = previousRows.some((existingRow) => {
          const existingRowId = inferRowId(existingRow);
          if (existingRowId === null || existingRowId === undefined) return false;
          return String(existingRowId) === normalizedRowId;
        });

        if (alreadyPresent || previousRows.length >= pagination.pageSize) {
          return previousRows;
        }

        inserted = true;
        return [...previousRows, row];
      });

      if (inserted) {
        setTotalCount((previousCount) => previousCount + 1);
      }
    },
    removeRowById: (rowId) => {
      const normalizedRowId = String(rowId);
      let removedCount = 0;

      setData((previousRows) =>
        previousRows.filter((row) => {
          const currentRowId = inferRowId(row);
          if (currentRowId === null || currentRowId === undefined) return true;
          const shouldRemove = String(currentRowId) === normalizedRowId;
          if (shouldRemove) removedCount += 1;
          return !shouldRemove;
        }),
      );

      if (removedCount > 0) {
        setTotalCount((previousCount) => Math.max(0, previousCount - removedCount));
      }
    },
    filters,
    setFilters,
    searchInput,
    setSearchInput,
    pagination,
  }));

  return (
    <div className={`block ${style}`}>
      {enableSearch || extras ? (
        <div className='flex items-center'>
          {enableSearch ? (
            <div className='flex'>
              <div className='relative w-64 mx-2 my-4'>
                <Icon
                  icon={MagnifyingGlassIcon}
                  size={20}
                  className='absolute left-2 top-1/2 transform -translate-y-1/2'
                />
                <InputBox
                  className='pl-9 pr-2 h-10 w-full border border-gray-400/50 rounded'
                  placeholder='Search'
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                />
              </div>
            </div>
          ) : (
            <div></div>
          )}
          <div className='flex justify-end mx-2 w-full'>{extras}</div>
        </div>
      ) : null}

      <div className='relative'>
        {loading && (
          <div className='absolute inset-0 z-10 flex items-center justify-center bg-dark-secondary/50 dark:bg-white/50 backdrop-blur-[1px]'>
            <div className='flex flex-col items-center'>
              <div className='w-10 h-10 border-4 border-white/80 border-t-transparent rounded-full animate-spin'></div>
            </div>
          </div>
        )}
        <table className='w-full'>
          {showHeader && (
            <thead className='table-header'>
              {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map((header) => {
                    const visible = header.column.getIsVisible();
                    const canSort = header.column.getCanSort();
                    const sortDirection = header.column.getIsSorted();

                    return (
                      visible && (
                        <th
                          key={header.id}
                          className='text-left select-none px-2 '
                          onClick={canSort ? header.column.getToggleSortingHandler() : undefined}
                          style={{ cursor: canSort ? 'pointer' : 'default' }}
                        >
                          <span className='inline-flex items-center text-light-txt dark:text-dark-txt'>
                            {header.isPlaceholder ? null : (
                              <>
                                {header.column.columnDef.header}
                                {header.column.getCanFilter() ? (
                                  <>{/* Need to figure out what to put here */}</>
                                ) : // <InputBox
                                //   onChange={e =>
                                //     setColumnFilters(old => [
                                //       ...old.filter(f => f.id !== header.column.id),
                                //       { id: header.column.id, value: e.target.value },
                                //     ])
                                //   }
                                //   placeholder="Filter..."
                                // />
                                null}
                              </>
                            )}
                            {header.column.columnDef.header ? (
                              <Icon
                                icon={sortDirection === 'asc' ? TextAlignTopIcon : TextAlignBottomIcon}
                                size={20}
                                className={'ml-3 ' + (sortDirection ? 'opacity-100' : 'opacity-0')}
                              />
                            ) : null}
                          </span>
                        </th>
                      )
                    );
                  })}
                </tr>
              ))}
            </thead>
          )}
          <tbody>
            {table.getRowModel().rows.length > 0 ? (
              table.getRowModel().rows.map((row) => (
                <tr
                  onClick={() => handleRowClick(row)}
                  onDoubleClick={handleRowDoubleClick ? () => handleRowDoubleClick(row) : undefined}
                  key={row.id}
                  className='table-row group/row font-semibold cursor-pointer'
                >
                  {row.getVisibleCells().map((cell) => (
                    <td
                      key={cell.id}
                      className={`border-b border-gray-500 px-2 ${rowStyle}
                                ${(cell.column.columnDef.meta as any)?.style ?? ''}`}
                    >
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </td>
                  ))}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={table.getVisibleLeafColumns().length} className='h-12 text-center text-gray-400 italic'>
                  {noResultsMessage}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {showControls && (
        <div className='flex justify-between items-center mt-4'>
          <div className='mx-2'>
            <span>Display</span>
            <SelectionBox
              className='ml-2 mr-2'
              defaultValue={pagination.pageSize}
              options={pageSizeOptions.map((option) => ({
                label: option,
                value: option,
              }))}
              onChange={(e) => {
                setPagination({
                  pageIndex: 0,
                  pageSize: Number(e.target.value),
                });
              }}
            />
            <span>per page</span>
          </div>
          <div className='flex items-center'>
            <span className='font-bold mx-2'>
              {totalCount ? pagination.pageIndex * pagination.pageSize + 1 : 0} -{' '}
              {Math.min(totalCount, (pagination.pageIndex + 1) * pagination.pageSize)}
              <span style={{ fontWeight: 'normal' }}> of </span>
              {totalCount}
            </span>
            <Icon
              icon={DoubleArrowLeftIcon}
              size={15}
              className='mx-2'
              onClick={() => {
                setPagination((prev) => ({
                  ...prev,
                  pageIndex: 0,
                }));
              }}
              disabled={pagination.pageIndex === 0}
            />
            <Icon
              icon={ChevronLeftIcon}
              size={15}
              onClick={() => {
                setPagination((prev) => ({
                  ...prev,
                  pageIndex: Math.max(prev.pageIndex - 1, 0),
                }));
              }}
              disabled={pagination.pageIndex === 0}
            />
            <div className='flex items-center mx-3'>
              <div className='w-15 flex items-center justify-center'>
                <InputBox
                  ref={pageNumberInputRef}
                  value={String(pagination.pageIndex + 1)}
                  className='h-9 text-center border'
                  onChange={(e) => {
                    setPagination((prev) => ({
                      ...prev,
                      pageIndex:
                        Math.min(
                          Math.ceil(totalCount / pagination.pageSize),
                          Math.max(Number(e.target.value.replace(/\D/g, '')), 1),
                        ) - 1,
                    }));
                  }}
                />
              </div>
              <span className='ml-2'>of {Math.max(1, Math.ceil(totalCount / pagination.pageSize))}</span>
            </div>
            <Icon
              icon={ChevronRightIcon}
              size={15}
              onClick={() => {
                setPagination((prev) => ({
                  ...prev,
                  pageIndex: (prev.pageIndex + 1) * prev.pageSize < totalCount ? prev.pageIndex + 1 : prev.pageIndex,
                }));
              }}
              disabled={(pagination.pageIndex + 1) * pagination.pageSize >= totalCount}
            />
            <Icon
              icon={DoubleArrowRightIcon}
              size={15}
              className='mx-2'
              onClick={() => {
                setPagination((prev) => ({
                  ...prev,
                  pageIndex: Math.ceil(totalCount / prev.pageSize) - 1,
                }));
              }}
              disabled={(pagination.pageIndex + 1) * pagination.pageSize >= totalCount}
            />
          </div>
        </div>
      )}
    </div>
  );
};
