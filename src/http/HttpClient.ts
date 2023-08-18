import type { AxiosRequestConfig, AxiosResponse } from 'axios';

import axios from 'axios';

export type RequestConfig<T> = AxiosRequestConfig<T>;

export type HttpClientConfig = {
  url: string;
  params: {
    [key: string]: string;
  };
};

export class HttpClient {
  private readonly config: HttpClientConfig;

  public constructor(config: HttpClientConfig) {
    this.config = config;
  }

  public async get<ResponseData, RequestData = unknown>(relativeUrl: string, option = {} as RequestConfig<RequestData>): Promise<ResponseData> {
    const { data } = await axios.get<ResponseData, AxiosResponse<ResponseData, RequestData>, RequestData>(this.config.url + relativeUrl, this.augmentOption(option));

    return data;
  }

  public async post<ResponseData, RequestData = unknown>(relativeUrl: string, body: RequestData, option = {} as RequestConfig<RequestData>): Promise<ResponseData> {
    const { data } = await axios.post<ResponseData, AxiosResponse<ResponseData, RequestData>, RequestData>(this.config.url + relativeUrl, body, this.augmentOption(option));

    return data;
  }

  public async delete<ResponseData, RequestData = unknown>(relativeUrl: string, option = {} as RequestConfig<RequestData>): Promise<ResponseData> {
    const { data } = await axios.delete<ResponseData, AxiosResponse<ResponseData, RequestData>, RequestData>(this.config.url + relativeUrl, this.augmentOption(option));

    return data;
  }

  private augmentOption<T>(option: RequestConfig<T>): RequestConfig<T> {
    return {
      ...option,
      params: {
        ...this.config.params,
        ...option.params,
      },
    };
  }
}
