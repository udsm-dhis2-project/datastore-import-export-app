import { Component, OnInit } from "@angular/core";
import { ImportService } from "./import.service";
import { EventEmmiterService } from "../event-emmiter.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-import",
  templateUrl: "./import.component.html",
  styleUrls: ["./import.component.css"]
})
export class ImportComponent implements OnInit {
  fileData = null;
  errorExists: boolean = false;
  errorObj: {};
  importedObj = {};
  objectOfKeys = {};
  namespacesArray = [];
  importingValues: boolean = false;
  numberOfKeysFound: number;
  numberOfNamesFound: number;
  valuesImported: number;
  importProgress: number;
  importDone: boolean = false;
  succesfulImportsArray: Array<string>;
  failedImportsArray: Array<string>;

  constructor(
    private importService: ImportService,
    private eventEmitterService: EventEmmiterService,
    private router: Router
  ) {}

  ngOnInit() {}

  closeSummary() {
    //clsoe summary + reload NS-list + navigate to last imported NS
    document.getElementById("importSummary").style.display = "none";
  }

  loadNamespace(name: string) {
    this.router.navigate(["/namespace", name]);
  }

  onFileSelect(input: any) {
    this.errorExists = false;
    this.importProgress = 0;
    this.importingValues = true;
    this.valuesImported = 0;
    this.importDone = false;
    this.succesfulImportsArray = [];
    this.failedImportsArray = [];

    if (input.files && input.files[0]) {
      var reader = new FileReader();
      reader.onload = (e: any) => {
        this.importedObj = JSON.parse(atob(e.target.result.slice(29)));

        console.log(this.importedObj);

        this.namespacesArray = Object.keys(this.importedObj);

        this.numberOfNamesFound = this.namespacesArray.length;

        if (this.namespacesArray.length > 0) {
          this.numberOfKeysFound = 0;

          this.namespacesArray.forEach(nameSpace => {
            this.objectOfKeys = this.importedObj[nameSpace];
            let keysArray = Object.keys(this.objectOfKeys);

            this.numberOfKeysFound = this.numberOfKeysFound + keysArray.length;

            keysArray.some(key => {
              this.importService.getkeyVal(nameSpace, key).subscribe(
                data => {
                  //key exists -> update it
                  this.importService
                    .updatekeyVal(
                      nameSpace,
                      key,
                      this.importedObj[nameSpace][key]
                    )
                    .subscribe(
                      responceData => {
                        this.valuesImported++;

                        this.succesfulImportsArray.push(key);

                        this.importProgress = Math.round(
                          (this.valuesImported / this.numberOfKeysFound) * 100
                        );

                        if (this.importProgress == 100) {
                          this.importingValues = false;
                          this.importDone = true;
                          this.eventEmitterService.onNameKeyAdded();
                        }
                      },
                      updateError => {
                        this.failedImportsArray.push(key);
                        this.valuesImported++;
                        this.importProgress = Math.round(
                          (this.valuesImported / this.numberOfKeysFound) * 100
                        );

                        if (this.importProgress == 100) {
                          this.importingValues = false;
                          this.importDone = true;
                          this.eventEmitterService.onNameKeyAdded();
                        }
                      }
                    );
                },
                err => {
                  if (err.status == 404) {
                    //key not found -> add key val
                    this.importService
                      .addkeyVal(
                        nameSpace,
                        key,
                        this.importedObj[nameSpace][key]
                      )
                      .subscribe(
                        responceData => {
                          this.valuesImported++;

                          this.succesfulImportsArray.push(key);

                          this.importProgress = Math.round(
                            (this.valuesImported / this.numberOfKeysFound) * 100
                          );

                          if (this.importProgress == 100) {
                            this.importingValues = false;
                            this.importDone = true;
                            this.eventEmitterService.onNameKeyAdded();
                          }
                        },
                        addErr => {
                          this.failedImportsArray.push(key);
                          this.valuesImported++;
                          this.importProgress = Math.round(
                            (this.valuesImported / this.numberOfKeysFound) * 100
                          );

                          if (this.importProgress == 100) {
                            this.importingValues = false;
                            this.importDone = true;
                            this.eventEmitterService.onNameKeyAdded();
                          }
                        }
                      );
                  } else {
                    //handle other type of errors
                    this.errorExists = true;
                    this.errorObj = err;
                    this.importingValues = false;
                    return this.importingValues;
                  }
                }
              );
            });
          });
        }
      };
      reader.readAsDataURL(input.files[0]);
    }
  }
}
