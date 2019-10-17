import { Component, OnInit } from "@angular/core";
import { ImportService } from "./import.service";

@Component({
  selector: "app-import",
  templateUrl: "./import.component.html",
  styleUrls: ["./import.component.css"]
})
export class ImportComponent implements OnInit {
  fileData = null;
  importedObj = {};
  objectOfKeys = {};
  namespacesArray = [];
  keysloaded: number;
  namespaceloaded: number;
  importProgress: number;
  loading: boolean = false;
  failedKeyUpdates = [];
  failedKeyAdds = [];

  constructor(private importService: ImportService) {}

  ngOnInit() {}

  onFileSelect(input: any) {
    if (input.files && input.files[0]) {
      var reader = new FileReader();
      reader.onload = (e: any) => {
        this.importedObj = JSON.parse(atob(e.target.result.slice(29)));
        this.namespacesArray = Object.keys(this.importedObj);

        if (this.namespacesArray.length > 1) {
          //several n-s to import
          this.namespacesArray.forEach(nameSpace => {
            this.objectOfKeys = this.importedObj[nameSpace];
            let keysArray = Object.keys(this.objectOfKeys);
            
            keysArray.forEach(key => {
              this.importService.getkeyVal(nameSpace, key).subscribe(
                data=>{
                  this.importService.updatekeyVal(nameSpace, key, this.objectOfKeys).subscribe(
                    responceData =>{

                    });
                },
                err=>{
                  this.importService.addkeyVal(nameSpace, key, this.objectOfKeys).subscribe(
                    responceData =>{

                    }
                  )
                }
              )
            });           
            
          });
        
        } else {
          //just one n-s to import
          this.objectOfKeys = this.importedObj[this.namespacesArray[0]];
          let keysArray = Object.keys(this.objectOfKeys);
          this.keysloaded = 0;
          this.loading = true;

          keysArray.forEach(key => {
            this.importService.getkeyVal(this.namespacesArray[0], key).subscribe(
              res => {
                
                this.importService.updatekeyVal(this.namespacesArray[0], key, this.objectOfKeys[key]).subscribe(
                  updtKeyRes => {
                    this.keysloaded++
                    this.importProgress = (this.keysloaded/ keysArray.length) * 100
                    console.log(this.importProgress);
                    if(this.importProgress == 100){this.loading = false};
                    
                  }, updtKeyErr =>{
                    this.keysloaded++
                    this.importProgress = (this.keysloaded/ keysArray.length) * 100
                    this.failedKeyUpdates.push("key: "+ key+" on namespace: "+this.namespacesArray[0])
                    console.log(this.importProgress);
                    if(this.importProgress == 100){this.loading = false};             
                  }
                );

              },err=>{
                
                this.importService.addkeyVal(this.namespacesArray[0], key, this.objectOfKeys[key]).subscribe(
                  addKeyRes => {
                    this.keysloaded++
                    this.importProgress = (this.keysloaded/ keysArray.length) * 100
                    console.log(this.importProgress);
                    if(this.importProgress == 100){this.loading = false};

                  },addKeyErr=>{
                    this.keysloaded++
                    this.importProgress = (this.keysloaded/ keysArray.length) * 100
                    this.failedKeyAdds.push("key: "+ key+" on namespace: "+this.namespacesArray[0]);
                    console.log(this.importProgress);
                    if(this.importProgress == 100){this.loading = false};
                  }
                )
              }
            )
            

          });
        }
      };
      reader.readAsDataURL(input.files[0]);
    }
  }
}
