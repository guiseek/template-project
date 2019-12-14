import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { UploadService } from '../../services/upload.service';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'ui-upload-dialog',
  templateUrl: './upload-dialog.component.html',
  styleUrls: ['./upload-dialog.component.scss']
})
export class UploadDialogComponent implements OnInit {
  @ViewChild('file', { static: false }) file;

  public files: Set<File> = new Set();
  progress;
  canBeClosed = true;
  primaryButtonText = 'Enviar';
  showCancelButton = true;
  uploading = false;
  uploadSuccessful = false;

  constructor(
    public dialogRef: MatDialogRef<UploadDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { url: string, field: string },
    public uploadService: UploadService
  ) { }

  ngOnInit() { }

  onFilesAdded() {
    const files: { [key: string]: File } = this.file.nativeElement.files;
    for (const key in files) {
      if (!isNaN(parseInt(key))) {
        this.files.add(files[key]);
      }
    }
  }

  addFiles() {
    this.file.nativeElement.click();
  }

  closeDialog() {
    // if everything was uploaded already, just close the dialog
    if (this.uploadSuccessful) {
      return this.dialogRef.close();
    }

    // set the component state to "uploading"
    this.uploading = true;
    console.log(
      this.data.url,
      this.files
    )
    // start the upload and save the progress map
    this.progress = this.uploadService.upload(
      this.data, this.files
    );
    console.log(this.progress);
    for (const key in this.progress) {
      if (key) {
        this.progress[key].progress.subscribe(val => console.log(val));
      }
    }

    // convert the progress map into an array
    const allProgressObservables = [];
    for (const key in this.progress) {
      if (key) {
        allProgressObservables.push(this.progress[key].progress);
      }
    }

    // Adjust the state variables

    // The OK-button should have the text "Finish" now
    this.primaryButtonText = 'Finalizar';

    // The dialog should not be closed while uploading
    this.canBeClosed = false;
    this.dialogRef.disableClose = true;

    // Hide the cancel-button
    this.showCancelButton = false;

    // When all progress-observables are completed...
    forkJoin(allProgressObservables).subscribe(end => {
      // ... the dialog can be closed again...
      this.canBeClosed = true;
      this.dialogRef.disableClose = false;

      // ... the upload was successful...
      this.uploadSuccessful = true;

      // ... and the component is no longer uploading
      this.uploading = false;
    });
  }
}
