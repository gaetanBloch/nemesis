import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { UploadService } from "../../services/upload.service";
import { HttpErrorResponse, HttpEventType } from "@angular/common/http";
import { of } from "rxjs";
import { catchError, map } from "rxjs/operators";

type FileInfo = { name: string, data: File, inProgress: boolean, progress: number };

@Component({
  selector: 'app-file-uploader',
  templateUrl: './file-uploader.component.html',
  styleUrls: ['./file-uploader.component.scss']
})
export class FileUploaderComponent {
  // Make it optional because of TS strict initilization
  @ViewChild('fileUpload', { static: false }) fileUpload?: ElementRef;
  @Input() title = '';
  @Input() multiple = false;
  files: FileInfo[] = [];

  constructor(private uploadService: UploadService) {
  }

  onClick(): void {
    const fileUpload: HTMLInputElement = this.fileUpload?.nativeElement;
    fileUpload.onchange = () => {
      if (fileUpload.files === null) return;
      for (let index = 0; index < fileUpload.files.length; index++) { //NOSONAR
        const file = fileUpload.files[index];
        this.files.push({
          name: file.name,
          data: file,
          inProgress: false,
          progress: 0
        });
      }
      this.uploadFiles();
    };
    fileUpload.click();
  }

  private uploadFiles(): void {
    if (!this.fileUpload) return;
    this.fileUpload.nativeElement.value = '';
    this.files.forEach(file => {
      this.uploadFile(file);
    });
  }

  private uploadFile(file: FileInfo): void {
    const formData = new FormData();
    formData.append('file', file.data);
    file.inProgress = true;
    this.uploadService.upload(formData).pipe(
      // @ts-ignore Not all event types are treated
      map(event => {
        switch (event.type) {
          case HttpEventType.UploadProgress:
            file.progress = Math.round(
              event.loaded * 100 / (event.total ?? 1)
            );
            break;
          case HttpEventType.Sent:
            return event;
        }
      }),
      catchError((error: HttpErrorResponse) => {
        file.inProgress = false;
        return of(`${ file.data.name } upload failed. Error: ${ error.message }`);
      }))
      .subscribe((event: any) => {
        if (typeof (event) === 'object') {
          console.log(event.body);
        }
      });
  }
}
