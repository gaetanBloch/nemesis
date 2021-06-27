import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class UploadService {
  private readonly endpoint = 'https://www.file.io/'

  constructor(private httpClient: HttpClient) {
  }

  public upload(formData: FormData): Observable<HttpEvent<any>> {
    return this.httpClient.post<any>(this.endpoint, formData, {
      reportProgress: true,
      observe: 'events'
    });
  }
}
