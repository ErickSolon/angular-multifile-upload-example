import { Component } from '@angular/core';
import { UploadServiceService } from '../../services/upload-service.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  constructor(private uploadService: UploadServiceService) { }

  files: File[] = [];

  onSelect(event: any) {
    const files: FileList = event.addedFiles;
    const fileList: File[] = [];
    for (let i = 0; i < files.length; i++) {
      fileList.push(files[i]);
    }
    this.uploadService.uploadFiles(fileList).subscribe(
      response => {
        console.log('Upload bem sucedido:', response);
      },
      error => {
        console.error('Erro durante o upload:', error);
      }
    );
  }

  onRemove(event: any) {
    console.log(event);
    this.files.splice(this.files.indexOf(event), 1);
  }

  private async readFile(file: File): Promise<string> {
    return new Promise<string>((resolve, reject) => {
      if (!file) {
        console.error('No file to read.');
        return reject(new Error('No file provided.'));
      }

      const reader = new FileReader();

      reader.onload = () => {
        resolve(reader.result as string);
      };

      reader.onerror = () => {
        console.error(`FileReader failed on file ${file.name}.`);
        reject(new Error('Failed to read the file.'));
      };

      reader.readAsDataURL(file);
    });
  }

}
