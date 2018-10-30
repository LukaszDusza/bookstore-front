import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpEventType } from '@angular/common/http';

@Component({
  selector: 'app-uploads',
  templateUrl: './uploads.component.html',
  styleUrls: ['./uploads.component.css']
})
export class UploadsComponent implements OnInit {
  constructor(private http: HttpClient) { }
  
  showResult: boolean = false;
  fileList = new Array<MyFile>();
  selectedFile: File = null;
  progress: number = 0;
  showBar: boolean = false;
  result: String = null;
  


  localhost = "http://localhost:8080/files/";

    ngOnInit() {
      this.onUpload();
    }

    onSelected(event) {
      this.showResult = false;
      this.showBar = false;
      console.log(event);
      this.selectedFile = <File>event.target.files[0];
  
    }

    onUpload() {
      const formData = new FormData();
      formData.append("file", this.selectedFile)
      this.http.post<Message>(this.localhost + "upload", formData, { reportProgress: true, observe: "events" }).subscribe(event => {
        if (event.type === HttpEventType.UploadProgress) {
          this.showBar = true;
          this.progress = Math.round((event.loaded / event.total) * 100) ;
          console.log([event.loaded, event.total]);
        } else if (event.type === HttpEventType.Response) {
          this.showResult = true;
          this.result = event.body.status;
          console.log(event);
        }
      }, err => {console.log(err)}, () => {
        this.showFiles();
      })
    }

    showFiles() {
      this.fileList = [];
      this.http.get<Array<MyFile>>(this.localhost + "list").subscribe(files => {
        files.map( f=> {
          this.fileList.push(f);
        })
      });    
           
    }

 

}

export class MyFile {
  title: String;
  path: String;
}

export class Message {
  status: String;
  path: String;
}
