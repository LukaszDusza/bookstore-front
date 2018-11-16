import { Component, OnInit } from '@angular/core';
import { MainService } from '../main.service';
import { MyFile } from '../uploads/uploads.component';
import { Myfile } from '../objects/myfiles';

@Component({
  selector: 'app-myfiles',
  templateUrl: './myfiles.component.html',
  styleUrls: ['./myfiles.component.css']
})
export class MyfilesComponent implements OnInit {

  constructor(public mainService: MainService) { }

  ngOnInit() {
    this.mainService.getFiles();
   }

  download(myfile: Myfile) { 
      this.mainService.downloadFile(myfile);     
  }

  deleteFile(fileName: string) {
    this.mainService.onDelete(fileName);
  //  console.log("delete file");
  }


}
