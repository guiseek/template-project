import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';

import { FireFileMeta } from '../interfaces/fire-file-meta.interface';

@Injectable({
  providedIn: 'root'
})
export class FireStorageService {
  constructor(
    private storage: AngularFireStorage
  ) { }

  putFile(event) {
    const file = event.target.files[0];
    const filePath = 'name-your-file-path-here';
    const ref = this.storage.ref(filePath);
    const task = ref.put(file);
  }

  uploadFile(file: any, fileName: string, path: string = 'images') {
    return this.storage.upload(`${path}/${fileName}`, file);
  }
  download(path: string, metadata = false) {
    const ref = this.storage.ref(path);
    const url = ref.getDownloadURL()
    if (metadata) {
      return {
        url,
        metadata: ref.getMetadata()
      }
    } else {
      return url;
    }
  }
  uploadWithMetadata({ path, file, customMetadata }: FireFileMeta) {
    return this.storage.ref(path).put(file, { customMetadata })
  }
}
