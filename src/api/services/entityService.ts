import ApiUtils from "api/utils/api.util";
import { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
import { APIMeta, ApiQueryParams } from "../types/api.types";
import { Schema } from "../types/schema.types";

export class EntityService {
  private axiosInstance: AxiosInstance;

  constructor({ axiosInstance }: { axiosInstance: AxiosInstance }) {
    this.axiosInstance = axiosInstance;
  }

  create = <TEntityType>({
    axiosRequestConfig,
    body,
    entity,
  }: {
    axiosRequestConfig?: AxiosRequestConfig;
    body: Partial<TEntityType>;
    entity: string;
  }) =>
    this.axiosInstance.post<Partial<TEntityType>, AxiosResponse<TEntityType>>(
      `app/${entity}/add`,
      body,
      axiosRequestConfig
    );

  getById = <TEntityType>({
    axiosRequestConfig,
    entity,
    id,
  }: {
    axiosRequestConfig?: AxiosRequestConfig;
    entity: string;
    id: string;
  }) =>
    this.axiosInstance.get<{
      data: TEntityType;
      meta: APIMeta<keyof TEntityType>;
    }>(`app/${entity}/id/${id}`, axiosRequestConfig);

  getAll = <TEntityType>({
    axiosRequestConfig,
    entity,
    params,
  }: {
    axiosRequestConfig?: AxiosRequestConfig;
    entity: string;
    params?: ApiQueryParams<keyof TEntityType>;
  }) =>
    this.axiosInstance.get<{
      data: TEntityType[];
      meta: APIMeta<keyof TEntityType>;
    }>(`app/${entity}`, {
      params: ApiUtils.processParams<keyof TEntityType>(params),
      ...axiosRequestConfig,
    });

  update = <TEntityType>({
    entity,
    body,
  }: {
    entity: string;
    body: Partial<TEntityType>;
  }) =>
    this.axiosInstance.put<Partial<TEntityType>, AxiosResponse<TEntityType>>(
      `app/${entity}/update`,
      body
    );

  delete = async ({ entity, entityId }: { entity: string; entityId: string }) =>
    this.axiosInstance.delete<AxiosResponse<Record<string, never>>>(
      `app/${entity}/id/${entityId}`
    );

  getSchema = async <TKeys>({ entity }: { entity: string }) =>
    this.axiosInstance.get<Schema<TKeys>>(`meta/${entity}/schema`);

  getMeta = async <TEntityType>({ entity }: { entity: string }) =>
    this.axiosInstance.get<APIMeta<keyof TEntityType>>(`app/${entity}/meta`);
}
