import { Component, OnInit } from "@angular/core";
import { NameSpacesService } from "./namespaces.service";
import { NameSpaceModule } from "./namespace.module";
import { Router } from "@angular/router";
import { EventEmmiterService } from "../event-emmiter.service";

@Component({
  selector: "app-namespaces",
  templateUrl: "./namespaces.component.html",
  styleUrls: ["./namespaces.component.css"]
})
export class NamespacesComponent implements OnInit {
  p: number = 1;
  loadedNameSpaces: NameSpaceModule[] = [];
  fetchingNameSpaces: boolean = false;
  error = null;
  deletingNspace: boolean = false;
  rname: string;
  nameSpacesToExport = [];
  namespacesObject = {};
  numberOfKeys: number;
  valuesLoaded: number;
  loadingValsObj: boolean;

  constructor(
    private nameSpaces: NameSpacesService,
    private router: Router,
    private eventEmmiterService: EventEmmiterService
  ) {}

  ngOnInit() {
    if (this.eventEmmiterService.subsVar == undefined) {
      this.eventEmmiterService.subsVar = this.eventEmmiterService.reloadNamespaces.subscribe(
        (name: string) => {
          //console.log(name);
          this.getNameSpaces();
        }
      );
    }

    this.getNameSpaces();
  }

  //outsorce namespaces' service function load and pipe name spaces
  getNameSpaces() {
    this.fetchingNameSpaces = true;

    this.nameSpaces.fetchNameSpaces().subscribe(
      fetchedNameSpaces => {
        this.loadedNameSpaces = fetchedNameSpaces;
        //console.log(this.loadedNameSpaces);
        this.fetchingNameSpaces = false;
      },
      error => {
        this.error = error.message;
      }
    );
  }

  deleteNamespace(name: string) {
    var delConfirmation = confirm(
      "Press OK to confirm you want to delete the namespace: " + name
    );

    if (delConfirmation == true) {
      //console.log(name);
      this.deletingNspace = true;
      this.nameSpaces.deleteNameSpace(name).subscribe(responceData => {
        console.log(responceData);
        this.deletingNspace = false;
        this.getNameSpaces();
        this.router.navigate(["/"]);
      });
    }
  }

  loadSingleNS(name: string) {
    //console.log(name);
    this.router.navigate(["/namespace", name]);
  }

  pushNS(name: string) {
    if (this.nameSpacesToExport.includes(name)) {
      var nsIndex = this.nameSpacesToExport.indexOf(name);
      this.nameSpacesToExport.splice(nsIndex, 1);
      console.log(this.nameSpacesToExport);
    } else {
      this.nameSpacesToExport.push(name);
      console.log(this.nameSpacesToExport);
    }
  }

  exportSelectedNS() {
    this.valuesLoaded = 0;
    this.numberOfKeys = 0;
    this.loadingValsObj = true;
    this.namespacesObject = {};
    this.nameSpacesToExport.forEach(name => {
      this.namespacesObject[name] = {};

      this.nameSpaces.getKeys(name).subscribe(
        keys => {
          this.numberOfKeys = this.numberOfKeys + keys.length;

          keys.forEach(key => {
            this.nameSpaces.getValue(name, key).subscribe(value => {
              this.namespacesObject[name][key] = value;

              this.valuesLoaded++;

              console.log(
                this.valuesLoaded + " / " + this.numberOfKeys + " loaded"
              );

              if (this.valuesLoaded == this.numberOfKeys) {
                var dataStr =
                  "data:text/json;charset=utf-8," +
                  encodeURIComponent(JSON.stringify(this.namespacesObject));
                var dlAnchorElem = document.getElementById(
                  "downloadAnchorElem"
                );
                dlAnchorElem.setAttribute("href", dataStr);
                dlAnchorElem.setAttribute("download", "exp-ns.json");
                dlAnchorElem.click();

                this.namespacesObject = undefined;
                this.loadingValsObj = false;
              }
            });
          });
        },
        error => {}
      );
    });
  }
}
