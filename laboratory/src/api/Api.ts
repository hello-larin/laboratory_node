/* eslint-disable */
/* tslint:disable */
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

export interface Equipment {
  /** Id */
  id?: number;
  /**
   * Name
   * @minLength 1
   * @maxLength 255
   */
  name: string;
  /**
   * Price
   * @min -2147483648
   * @max 2147483647
   */
  price: number;
  /** Description */
  description?: string | null;
  /** Image */
  image?: string | null;
  /** Status */
  status?: boolean;
}

export interface EquipmentResponse {
  equipment: Equipment[];
  /** Procurement id */
  procurement_id: number;
  /** Procurement count */
  procurement_count: number;
}

export interface AmountRequest {
  /** Amount */
  amount: number;
}

export interface Items {
  /**
   * Name
   * @minLength 1
   */
  name: string;
  /**
   * Price
   * @minLength 1
   */
  price: string;
  /**
   * Amount
   * @min -2147483648
   * @max 2147483647
   */
  amount: number;
  /** Id */
  id?: number;
  /**
   * Image
   * @minLength 1
   */
  image: string;
}

export interface Auth {
  /**
   * Username
   * Required. 150 characters or fewer. Letters, digits and @/./+/-/_ only.
   * @minLength 1
   * @maxLength 150
   * @pattern ^[\w.@+-]+$
   */
  username: string;
  /**
   * Password
   * @minLength 1
   * @maxLength 128
   */
  password: string;
}

export interface User {
  /**
   * Username
   * Required. 150 characters or fewer. Letters, digits and @/./+/-/_ only.
   * @minLength 1
   * @maxLength 150
   * @pattern ^[\w.@+-]+$
   */
  username: string;
  /**
   * Last name
   * @maxLength 150
   */
  last_name?: string;
  /**
   * First name
   * @maxLength 150
   */
  first_name?: string;
}

export interface Orders {
  /** Id */
  id?: number;
  /** Address */
  address?: string | null;
  /**
   * Phone
   * @maxLength 15
   */
  phone?: string | null;
  /**
   * Created date
   * @format date-time
   */
  created_date?: string | null;
  /**
   * Submited date
   * @format date-time
   */
  submited_date?: string | null;
  /**
   * Accepted date
   * @format date-time
   */
  accepted_date?: string | null;
  /**
   * Status
   * @min -2147483648
   * @max 2147483647
   */
  status: number;
  /**
   * Creator
   * @minLength 1
   */
  creator?: string | null;
  /**
   * Moderator
   * @minLength 1
   */
  moderator?: string | null;
}

export interface EditProcurement {
  /** Address */
  address?: string | null;
  /**
   * Phone
   * @maxLength 15
   */
  phone?: string | null;
  /**
   * Created date
   * @format date-time
   */
  created_date?: string | null;
  equipment?: Items[];
}

export interface Procurement {
  /** Id */
  id?: number;
  /** Address */
  address?: string | null;
  /**
   * Phone
   * @maxLength 15
   */
  phone?: string | null;
  /**
   * Created date
   * @format date-time
   */
  created_date?: string | null;
  /**
   * Submited date
   * @format date-time
   */
  submited_date?: string | null;
  /**
   * Accepted date
   * @format date-time
   */
  accepted_date?: string | null;
  /**
   * Status
   * @min -2147483648
   * @max 2147483647
   */
  status: number;
  equipment?: Items[];
}

export interface Register {
  /**
   * Username
   * Required. 150 characters or fewer. Letters, digits and @/./+/-/_ only.
   * @minLength 1
   * @maxLength 150
   * @pattern ^[\w.@+-]+$
   */
  username: string;
  /**
   * Password
   * @minLength 1
   * @maxLength 128
   */
  password: string;
  /**
   * Is staff
   * @default false
   */
  is_staff?: boolean;
  /**
   * Is superuser
   * @default false
   */
  is_superuser?: boolean;
}

export interface EditUser {
  /**
   * First name
   * @maxLength 150
   */
  first_name?: string;
  /**
   * Last name
   * @maxLength 150
   */
  last_name?: string;
  /**
   * Username
   * Required. 150 characters or fewer. Letters, digits and @/./+/-/_ only.
   * @minLength 1
   * @maxLength 150
   * @pattern ^[\w.@+-]+$
   */
  username?: string;
}

import type { AxiosInstance, AxiosRequestConfig, AxiosResponse, HeadersDefaults, ResponseType } from "axios";
import axios from "axios";

export type QueryParamsType = Record<string | number, any>;

export interface FullRequestParams extends Omit<AxiosRequestConfig, "data" | "params" | "url" | "responseType"> {
  /** set parameter to `true` for call `securityWorker` for this request */
  secure?: boolean;
  /** request path */
  path: string;
  /** content type of request body */
  type?: ContentType;
  /** query params */
  query?: QueryParamsType;
  /** format of response (i.e. response.json() -> format: "json") */
  format?: ResponseType;
  /** request body */
  body?: unknown;
}

export type RequestParams = Omit<FullRequestParams, "body" | "method" | "query" | "path">;

export interface ApiConfig<SecurityDataType = unknown> extends Omit<AxiosRequestConfig, "data" | "cancelToken"> {
  securityWorker?: (
    securityData: SecurityDataType | null,
  ) => Promise<AxiosRequestConfig | void> | AxiosRequestConfig | void;
  secure?: boolean;
  format?: ResponseType;
}

export enum ContentType {
  Json = "application/json",
  FormData = "multipart/form-data",
  UrlEncoded = "application/x-www-form-urlencoded",
  Text = "text/plain",
}

export class HttpClient<SecurityDataType = unknown> {
  public instance: AxiosInstance;
  private securityData: SecurityDataType | null = null;
  private securityWorker?: ApiConfig<SecurityDataType>["securityWorker"];
  private secure?: boolean;
  private format?: ResponseType;

  constructor({ securityWorker, secure, format, ...axiosConfig }: ApiConfig<SecurityDataType> = {}) {
    this.instance = axios.create({ ...axiosConfig, baseURL: axiosConfig.baseURL || "http://127.0.0.1:8000" });
    this.secure = secure;
    this.format = format;
    this.securityWorker = securityWorker;
  }

  public setSecurityData = (data: SecurityDataType | null) => {
    this.securityData = data;
  };

  protected mergeRequestParams(params1: AxiosRequestConfig, params2?: AxiosRequestConfig): AxiosRequestConfig {
    const method = params1.method || (params2 && params2.method);

    return {
      ...this.instance.defaults,
      ...params1,
      ...(params2 || {}),
      headers: {
        ...((method && this.instance.defaults.headers[method.toLowerCase() as keyof HeadersDefaults]) || {}),
        ...(params1.headers || {}),
        ...((params2 && params2.headers) || {}),
      },
    };
  }

  protected stringifyFormItem(formItem: unknown) {
    if (typeof formItem === "object" && formItem !== null) {
      return JSON.stringify(formItem);
    } else {
      return `${formItem}`;
    }
  }

  protected createFormData(input: Record<string, unknown>): FormData {
    if (input instanceof FormData) {
      return input;
    }
    return Object.keys(input || {}).reduce((formData, key) => {
      const property = input[key];
      const propertyContent: any[] = property instanceof Array ? property : [property];

      for (const formItem of propertyContent) {
        const isFileType = formItem instanceof Blob || formItem instanceof File;
        formData.append(key, isFileType ? formItem : this.stringifyFormItem(formItem));
      }

      return formData;
    }, new FormData());
  }

  public request = async <T = any, _E = any>({
    secure,
    path,
    type,
    query,
    format,
    body,
    ...params
  }: FullRequestParams): Promise<AxiosResponse<T>> => {
    const secureParams =
      ((typeof secure === "boolean" ? secure : this.secure) &&
        this.securityWorker &&
        (await this.securityWorker(this.securityData))) ||
      {};
    const requestParams = this.mergeRequestParams(params, secureParams);
    const responseFormat = format || this.format || undefined;

    if (type === ContentType.FormData && body && body !== null && typeof body === "object") {
      body = this.createFormData(body as Record<string, unknown>);
    }

    if (type === ContentType.Text && body && body !== null && typeof body !== "string") {
      body = JSON.stringify(body);
    }

    return this.instance.request({
      ...requestParams,
      headers: {
        ...(requestParams.headers || {}),
        ...(type ? { "Content-Type": type } : {}),
      },
      params: query,
      responseType: responseFormat,
      data: body,
      url: path,
    });
  };
}

/**
 * @title Лабороторное оборудование API
 * @version v1
 * @license BSD License
 * @termsOfService https://www.google.com/policies/terms/
 * @baseUrl http://127.0.0.1:8000
 * @contact <contact@labeq.ru>
 *
 * Апи для оформления закупок лабораторного оборудования
 */
export class Api<SecurityDataType extends unknown> extends HttpClient<SecurityDataType> {
  equipment = {
    /**
     * No description
     *
     * @tags equipment
     * @name EquipmentList
     * @request GET:/equipment/
     * @secure
     */
    equipmentList: (params: RequestParams = {}) =>
      this.request<EquipmentResponse, any>({
        path: `/equipment/`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags equipment
     * @name EquipmentCreate
     * @request POST:/equipment/
     * @secure
     */
    equipmentCreate: (data: Equipment, params: RequestParams = {}) =>
      this.request<Equipment, any>({
        path: `/equipment/`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags equipment
     * @name EquipmentRead
     * @request GET:/equipment/{id}/
     * @secure
     */
    equipmentRead: (id: string, params: RequestParams = {}) =>
      this.request<Equipment, any>({
        path: `/equipment/${id}/`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags equipment
     * @name EquipmentCreate2
     * @request POST:/equipment/{id}/
     * @originalName equipmentCreate
     * @duplicate
     * @secure
     */
    equipmentCreate2: (id: string, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/equipment/${id}/`,
        method: "POST",
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags equipment
     * @name EquipmentUpdate
     * @request PUT:/equipment/{id}/
     * @secure
     */
    equipmentUpdate: (id: string, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/equipment/${id}/`,
        method: "PUT",
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags equipment
     * @name EquipmentDelete
     * @request DELETE:/equipment/{id}/
     * @secure
     */
    equipmentDelete: (id: string, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/equipment/${id}/`,
        method: "DELETE",
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags equipment
     * @name EquipmentAddCreate
     * @request POST:/equipment/{id}/add
     * @secure
     */
    equipmentAddCreate: (id: string, data: AmountRequest, params: RequestParams = {}) =>
      this.request<Items[], any>({
        path: `/equipment/${id}/add`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),
  };
  item = {
    /**
     * No description
     *
     * @tags item
     * @name ItemUpdate
     * @request PUT:/item/{id}/
     * @secure
     */
    itemUpdate: (id: string, data: Items, params: RequestParams = {}) =>
      this.request<Items[], any>({
        path: `/item/${id}/`,
        method: "PUT",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags item
     * @name ItemDelete
     * @request DELETE:/item/{id}/
     * @secure
     */
    itemDelete: (id: string, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/item/${id}/`,
        method: "DELETE",
        secure: true,
        ...params,
      }),
  };
  login = {
    /**
     * No description
     *
     * @tags login
     * @name LoginCreate
     * @request POST:/login
     * @secure
     */
    loginCreate: (data: Auth, params: RequestParams = {}) =>
      this.request<User, any>({
        path: `/login`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),
  };
  logout = {
    /**
     * No description
     *
     * @tags logout
     * @name LogoutCreate
     * @request POST:/logout
     * @secure
     */
    logoutCreate: (params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/logout`,
        method: "POST",
        secure: true,
        ...params,
      }),
  };
  procurements = {
    /**
     * No description
     *
     * @tags procurements
     * @name ProcurementsList
     * @request GET:/procurements/
     * @secure
     */
    procurementsList: (params: RequestParams = {}) =>
      this.request<Orders[], any>({
        path: `/procurements/`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags procurements
     * @name ProcurementsRead
     * @request GET:/procurements/{id}/
     * @secure
     */
    procurementsRead: (id: string, params: RequestParams = {}) =>
      this.request<Orders, any>({
        path: `/procurements/${id}/`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags procurements
     * @name ProcurementsUpdate
     * @request PUT:/procurements/{id}/
     * @secure
     */
    procurementsUpdate: (id: string, data: EditProcurement, params: RequestParams = {}) =>
      this.request<EditProcurement, any>({
        path: `/procurements/${id}/`,
        method: "PUT",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags procurements
     * @name ProcurementsDelete
     * @request DELETE:/procurements/{id}/
     * @secure
     */
    procurementsDelete: (id: string, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/procurements/${id}/`,
        method: "DELETE",
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags procurements
     * @name ProcurementsAcceptCreate
     * @request POST:/procurements/{id}/accept/
     * @secure
     */
    procurementsAcceptCreate: (id: string, params: RequestParams = {}) =>
      this.request<Procurement, any>({
        path: `/procurements/${id}/accept/`,
        method: "POST",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags procurements
     * @name ProcurementsSubmitCreate
     * @request POST:/procurements/{id}/submit/
     * @secure
     */
    procurementsSubmitCreate: (id: string, params: RequestParams = {}) =>
      this.request<Procurement, any>({
        path: `/procurements/${id}/submit/`,
        method: "POST",
        secure: true,
        format: "json",
        ...params,
      }),
  };
  registration = {
    /**
     * No description
     *
     * @tags registration
     * @name RegistrationCreate
     * @request POST:/registration/
     * @secure
     */
    registrationCreate: (data: Register, params: RequestParams = {}) =>
      this.request<Register, any>({
        path: `/registration/`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),
  };
  user = {
    /**
     * No description
     *
     * @tags user
     * @name UserList
     * @request GET:/user/
     * @secure
     */
    userList: (params: RequestParams = {}) =>
      this.request<User, any>({
        path: `/user/`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags user
     * @name UserUpdate
     * @request PUT:/user/
     * @secure
     */
    userUpdate: (data: EditUser, params: RequestParams = {}) =>
      this.request<User, any>({
        path: `/user/`,
        method: "PUT",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),
  };
}
