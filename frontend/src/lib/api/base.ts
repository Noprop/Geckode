import api from "./axios";
import { AxiosResponse } from "axios";
import { PaginatedResponse } from "@/lib/types/api/pagination";
import type { HasKeys } from "@/lib/types";

export const unwrap = <T>(promise: Promise<AxiosResponse<T>>) => promise.then(res => res.data);

export const FUNCTION_METHODS = ["get", "update", "delete"] as const;
export const NON_FUNCTION_METHODS = ["list", "create"] as const;
export const API_METHODS = [...FUNCTION_METHODS, ...NON_FUNCTION_METHODS] as const;

export type FunctionMethods = (typeof FUNCTION_METHODS)[number];
export type NonFunctionMethods = (typeof NON_FUNCTION_METHODS)[number];
export type ApiMethods = (typeof API_METHODS)[number];

// This transforms the types properly for both the function and non-function methods in the sub APIs
type FilterSubApis<
  TSubApis,
  IncludeFunctions extends boolean,
  TId = number | string
> = {
  [K in keyof TSubApis as
    HasKeys<TSubApis[K], NonFunctionMethods> extends true
      ? IncludeFunctions extends true
        ? never
        : HasKeys<TSubApis[K], FunctionMethods> extends true
          ? never
          : K
      : IncludeFunctions extends false
        ? never
        : K
  ]: TSubApis[K] extends (id: TId) => infer R
      ? HasKeys<TSubApis[K], NonFunctionMethods> extends true
        ? K extends NonFunctionMethods
          ? R
          : TSubApis[K]
        : R
      : TSubApis[K];
};

export function createBaseApi<
  TData,
  TPayload,
  TFilters,
>({ baseUrl }: { baseUrl: string }) {
  return (<
    TSubApis extends Record<string, any>
  >({ ...subApis }: TSubApis = {} as TSubApis) => {
    const methodsFn = (id: number | string) => {
      const url = `${baseUrl}${id}/`;

      const methods = {
        get: () => unwrap<Required<TData>>(api.get(url)),
        update: (data: Partial<TPayload>) => unwrap<Required<TData>>(api.patch(url, data)),
        delete: () => unwrap<void>(api.delete(url)),
      };

      const subApiObjects = Object.entries(subApis).reduce(
        (acc, [key, value]) => {
          if (!API_METHODS.some(k => k in value)) {
            acc[key] = (value as any)(id);
          }
          return acc;
        },
        {} as Record<string, any>
      ) as FilterSubApis<TSubApis, true>;

      return Object.assign({}, methods, subApiObjects);
    };

    const methods = {
      list: (filters?: TFilters) => unwrap<PaginatedResponse<TData>>(api.get(baseUrl, { params: filters })),
      create: (data: TPayload) => unwrap<Required<TData>>(api.post(baseUrl, data)),
    };

    const subApiObjects = Object.entries(subApis).reduce(
      (acc, [key, value]) => {
        if (API_METHODS.some(k => k in value)) {
          acc[key] = value;
        }
        return acc;
      },
      {} as Record<string, any>
    ) as FilterSubApis<TSubApis, false>;

    return Object.assign(methodsFn, methods, subApiObjects);
  });
}