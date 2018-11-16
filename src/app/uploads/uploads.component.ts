import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpEventType, HttpHeaders } from '@angular/common/http';
import { MainService } from '../main.service';
import { environment } from 'src/environments/environment';

const url = environment.config.uploads;

@Component({
  selector: 'app-uploads',
  templateUrl: './uploads.component.html',
  styleUrls: ['./uploads.component.css']
})
export class UploadsComponent implements OnInit {
  constructor(private http: HttpClient, public mainService: MainService) { }
  
  showResult: boolean = false;
  fileList = new Array<MyFile>();
  selectedFile: File[] = [];
  progress: number = 0;
  showBar: boolean = false;
  result: String = null;
  
    ngOnInit() {
    //  this.onUpload();
    this.showFiles();
    }

    onSelected(event) {
      this.showResult = false;
      this.showBar = false;
      console.log(event);
      this.selectedFile = <File[]>event.target.files;
  
    }

  //  header = new HttpHeaders().set("Content-Type","multipart/form-data")
    onUpload() {
      const formData = new FormData();
      for(let i = 0; i < this.selectedFile.length; i++) {
        formData.append("file", this.selectedFile[i]);
      }
      this.http.post<Message>(url, formData, {reportProgress: true, observe: "events" }).subscribe(event => {
        if (event.type === HttpEventType.UploadProgress) {
          this.showBar = true;
          this.progress = Math.round((event.loaded / event.total) * 100) ;
          console.log([event.loaded, event.total]);
        } else if (event.type === HttpEventType.Response) {
          this.showResult = true;
        //  this.result = event.body.status;
          console.log(event);
        }
      }, err => {console.log(err)}, () => {
        this.showFiles();
      })
    }

    showFiles() {
      this.fileList = [];
      this.http.get<Array<MyFile>>(url).subscribe(files => {
       // console.log(files);
        files.map( f => {
       //   console.log(f);
          this.fileList.push(f);
        })
      });    
           
    }

    onDelete(name: string) {
      this.http.delete(url + "/" + name).subscribe(file => {
         console.log(file);       
       }, err => {}, () => {
         this.showFiles();
       }); 
    }
}

export class MyFile {
  name: String;
  fullPath: String;
}

export class Message {
  status: String;
  path: String;
}
