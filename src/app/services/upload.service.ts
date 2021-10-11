import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class UploadService {
  private readonly endpoint = 'http://localhost:3000/api/v1/test/files?details=true'

  constructor(private httpClient: HttpClient) {
  }

  public upload(formData: FormData): Observable<HttpEvent<any>> {
    return this.httpClient.post<any>(this.endpoint, formData, {
      reportProgress: true,
      observe: 'events',
      responseType: 'json'
    });
  }
}
