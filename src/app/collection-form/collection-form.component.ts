import { Component } from '@angular/core';
import { catchError, map } from "rxjs/operators";
import { HttpErrorResponse, HttpEventType } from "@angular/common/http";
import { of } from "rxjs";
import { UploadService } from "../services/upload.service";

declare function loadReport(): any;

@Component({
  selector: 'app-collection-form',
  templateUrl: './collection-form.component.html',
  styleUrls: ['./collection-form.component.scss']
})
export class CollectionFormComponent {
  progress = 0;
  collections: File[] = [];
  environment: File[] = [];
  spin = false;

  constructor(private uploadService: UploadService) {
  }

  onUpload(): void {
    const formData = new FormData();
    this.collections.forEach(col => formData.append('collection', col));
    formData.append('environment', this.environment[0])

    this.spin = true;

    this.uploadService.upload(formData).pipe(
      // @ts-ignore Not all event types are treated
      map(event => {
        switch (event.type) {
          case HttpEventType.UploadProgress:
            this.progress = Math.round(
              event.loaded * 100 / (event.total ?? 1)
            );
            break;
          case HttpEventType.Response:
            return event;
        }
      }),
      catchError((error: HttpErrorResponse) => {
        this.progress = 0;
        return of(`Upload failed. Error: ${ error.message }`);
      }))
      .subscribe((event: any) => {
        if (typeof (event) === 'object') {
          this.spin = false;
          // @ts-ignore
          document.querySelector('.html').innerHTML = event.body.report;
          loadReport();
        }
      });
  }

  onCollectionsUploaded(collections: File[]) {
    collections.forEach(col => this.collections.push(col));
  }

  onEnvironmentUploaded(environment: File[]) {
    this.environment.push(environment[0]);
  }
}
