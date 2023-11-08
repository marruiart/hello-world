import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HttpClientProvider } from './http-client.provider';

export class HttpClientWebService extends HttpClientProvider {

  constructor(
    private httpClient: HttpClient
  ) {
    super();
  }

  /**
   * create http headers
   *
   * @param jsonHeaders http headers
   * @param urlEncoded http request as url encoded content-type
   * @returns angular http headers
   */
  private createHeaders(
    jsonHeaders: any,
    urlEncoded: boolean
  ): HttpHeaders {

    var _headers = new HttpHeaders(jsonHeaders);
    if (urlEncoded) {
      _headers.set('Accept', ' application/x-www-form-urlencoded');
    }
    return _headers;
  }

  /**
   * create http request body
   *
   * @param jsonBody http request body
   * @param urlEncoded http request as url encoded content-type
   * @returns http request body
   */
  private createBody(jsonBody: any, urlEncoded: boolean): any | HttpParams {

    return urlEncoded ? new HttpParams({ fromObject: jsonBody }) : jsonBody;
  }

  /**
   * get the HTTP options to send with the request
   * 
   * @param jsonHeaders http headers
   * @param jsonParams http params
   * @param urlEncoded http request as url encoded content-type
   * @returns object with http options
   */
  protected createOptions(
    jsonHeaders: any,
    jsonParams: any,
    urlEncoded: boolean = false) {
    let _options = {
      headers: this.createHeaders(jsonHeaders, urlEncoded),
      params: new HttpParams({ fromObject: jsonParams })
    }
    return _options;
  }

  // CRUD methods

  /**
   * get
   *
   * @param url http request url
   * @param jsonParams http request params
   * @param jsonHeaders http request headers
   * @param urlEncoded http request as url encoded content-type
   * @returns observable with http response
   */
  public get<T>(
    url: string,
    jsonParams: any = {},
    jsonHeaders: any = {},
    urlEncoded: boolean = false
  ): Observable<T> {

    return this.httpClient.get<T>(url,
      this.createOptions(jsonHeaders, jsonParams, urlEncoded));
  }

  /**
   * post
   *
   * @param url http request url
   * @param jsonBody http request body
   * @param jsonParams http request params
   * @param jsonHeaders http request headers
   * @param urlEncoded http request as url encoded content-type
   * @returns observable with http response
   */
  public post<T>(
    url: string,
    jsonBody: any = {},
    jsonParams: any = {},
    jsonHeaders: any = {},
    urlEncoded: boolean = false
  ): Observable<T> {

    return this.httpClient.post<T>(url,
      this.createBody(jsonBody, urlEncoded),
      this.createOptions(jsonHeaders, jsonParams, urlEncoded));
  }

  /**
   * put
   *
   * @param url http request url
   * @param jsonBody http request body
   * @param jsonParams http request params
   * @param jsonHeaders http request headers
   * @param urlEncoded http request as url encoded content-type
   * @returns observable with http response
   */
  public put<T>(
    url: string,
    jsonBody: any = {},
    jsonParams: any = {},
    jsonHeaders: any = {},
    urlEncoded: boolean = false
  ): Observable<T> {

    return this.httpClient.put<T>(url,
      this.createBody(jsonBody, urlEncoded),
      this.createOptions(jsonHeaders, jsonParams, urlEncoded));
  }

  /**
   * patch
   *
   * @param url http request url
   * @param jsonBody http request body
   * @param jsonParams http request params
   * @param jsonHeaders http request headers
   * @param urlEncoded http request as url encoded content-type
   * @returns observable with http response
   */
  public patch<T>(
    url: string,
    jsonBody: any = {},
    jsonParams: any = {},
    jsonHeaders: any = {},
    urlEncoded: boolean = false
  ): Observable<T> {

    if (jsonBody instanceof FormData) {
      return this.httpClient.patch<T>(url, jsonBody, { headers: jsonHeaders });
    }
    else {
      return this.httpClient.patch<T>(url,
        this.createBody(jsonBody, urlEncoded),
        this.createOptions(jsonHeaders, jsonParams, urlEncoded));
    }
  }

  /**
   * delete
   *
   * @param url http request url
   * @param jsonParams http request params
   * @param jsonHeaders http request headers
   * @returns observable with http response
   */
  public delete<T>(
    url: string,
    jsonHeaders: any = {},
    jsonParams: any = {},
    urlEncoded: boolean = false,
  ): Observable<T> {

    return this.httpClient.delete<T>(url,
      this.createOptions(jsonHeaders, jsonParams, urlEncoded));
  }

}
