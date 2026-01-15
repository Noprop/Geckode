import api from "./axios";
import { AxiosRequestConfig, AxiosResponse } from "axios";
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

interface BonusFields {toFormData?: boolean}

// converts object into form data (provided every key has a return type of string | Blob)
export function convertFormData<TPayload>(payload : TPayload) {
  var formData = new FormData();

  for ( const key in payload ) {
      formData.append(key, payload[key] as string | Blob);
  }

  return formData
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
        get: (config?: AxiosRequestConfig) => unwrap<Required<TData>>(api.get(url, config)),
        update: (data: Partial<TPayload>, config?: AxiosRequestConfig) => unwrap<Required<TData>>(api.patch(url, data, config)),
        delete: (config?: AxiosRequestConfig) => unwrap<void>(api.delete(url, config)),
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
      list: (filters?: TFilters, config?: AxiosRequestConfig) => unwrap<PaginatedResponse<TData>>(api.get(baseUrl, {...{ params: filters }, config})),
      create: (data: TPayload | FormData, config?: AxiosRequestConfig) => unwrap<Required<TData>>(api.post(baseUrl, data, config)),
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