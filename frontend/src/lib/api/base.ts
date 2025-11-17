import api from "./axios";
import { AxiosResponse } from "axios";
import { PaginatedResponse } from "@/lib/types/api";
import type { HasKeys } from "@/lib/types";

export const unwrap = <T>(promise: Promise<AxiosResponse<T>>) => promise.then(res => res.data);

export const apiFunctionMethods = ["get", "update", "delete"];
export const apiNonFunctionMethods = ["list", "create"];
export const apiMethods = [...apiFunctionMethods, ...apiNonFunctionMethods];

export type FunctionMethods = (typeof apiFunctionMethods)[number];
export type NonFunctionMethods = (typeof apiNonFunctionMethods)[number];
export type ApiMethods = (typeof apiMethods)[number];

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

type Inputs = {
  baseUrl: string;
}

export function createBaseApi<
  TData,
  TPayload,
  TFilters,
>({ baseUrl }: Inputs) {
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
          if (!apiMethods.some(k => k in value)) {
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
        if (apiMethods.some(k => k in value)) {
          acc[key] = value;
        }
        return acc;
      },
      {} as Record<string, any>
    ) as FilterSubApis<TSubApis, false>;

    return Object.assign(methodsFn, methods, subApiObjects);
  });
}

export type BaseApiInnerReturn<T> =
  T extends (args: Inputs) => (id: any) => infer R
    ? R
    : never;