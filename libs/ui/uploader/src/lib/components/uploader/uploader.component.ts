import { Component, OnInit, Input } from '@angular/core';
import { MatDialog } from '@angular/material';
import { UploadService } from '../../services/upload.service';
import { UploadDialogComponent } from '../upload-dialog/upload-dialog.component';

@Component({
  selector: 'ui-uploader',
  templateUrl: './uploader.component.html',
  styleUrls: ['./uploader.component.scss']
})
export class UploaderComponent implements OnInit {
  @Input() url: string;
  @Input() field = 'file';

  constructor(
    public dialog: MatDialog,
    public uploadService: UploadService
  ) { }


  ngOnInit() {
  }

  public openUploadDialog() {
    const dialogRef = this.dialog.open(
      UploadDialogComponent,
      {
        data: { url: this.url, field: this.field },
        width: '50%', height: '50%'
      }
    );
  }
}
