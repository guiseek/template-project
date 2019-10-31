import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule, MatDialogModule, MatListModule, MatProgressBarModule } from '@angular/material';
import { UploadDialogComponent } from './components/upload-dialog/upload-dialog.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { UploadService } from './services/upload.service';
import { UploaderComponent } from './components/uploader/uploader.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  imports: [CommonModule, HttpClientModule, MatButtonModule, MatDialogModule, MatListModule, FlexLayoutModule, MatProgressBarModule],
  declarations: [UploadDialogComponent, UploaderComponent],
  entryComponents: [UploadDialogComponent],
  providers: [UploadService],
  exports: [UploaderComponent]
})
export class UiUploaderModule {}
