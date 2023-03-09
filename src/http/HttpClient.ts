import type { AxiosRequestConfig, AxiosResponse } from 'axios';

import axios from 'axios';

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

  public async get<Response>(relativeUrl: string, option = {} as AxiosRequestConfig<void>): Promise<Response> {
    const { data } = await axios.get<Response, AxiosResponse<Response, void>, void>(this.config.url + relativeUrl, this.augmentOption(option));

    return data;
  }

  public async post<Response, Request>(relativeUrl: string, body: Request, option = {} as AxiosRequestConfig<Request>): Promise<Response> {
    const { data } = await axios.post<Response, AxiosResponse<Response, Request>, Request>(this.config.url + relativeUrl, body, this.augmentOption(option));

    return data;
  }

  public async delete<Response>(relativeUrl: string, option = {} as AxiosRequestConfig<void>): Promise<Response> {
    const { data } = await axios.delete<Response, AxiosResponse<Response, void>, void>(this.config.url + relativeUrl, this.augmentOption(option));

    return data;
  }

  private augmentOption<T>(option: AxiosRequestConfig<T>): AxiosRequestConfig<T> {
    return {
      ...option,
      params: {
        ...this.config.params,
        ...option.params,
      },
    };
  }
}
