import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Params, Router } from "@angular/router";
import { DashService } from "./dash.service";
import { EventEmmiterService } from "../event-emmiter.service";

@Component({
  selector: "app-dash",
  templateUrl: "./dash.component.html",
  styleUrls: ["./dash.component.css"]
})
export class DashComponent implements OnInit {
  pg: number = 1;
  key: string;
  namespace: string;
  loadedKeys = [];
  loadingKeys: boolean = false;
  deletingKey: boolean = false;
  keyDeleted: boolean;
  showForm: boolean;
  addingKey: boolean;
  keysLength: number;
  public generatingKeys: boolean = false;
  public keysList = [];
  public valuesArray = [];
  public keysLoadProgress: number;
  public keysLoadPercent: number;
  //namespaceArr = [];
  

  constructor(
    private route: ActivatedRoute,
    private dashservice: DashService,
    private router: Router,
    private eventEmmiterService: EventEmmiterService
  ) {}

  ngOnInit() {
    this.namespace = this.route.snapshot.params["name"];
    this.fetchKeys(this.namespace);

    //this.key = this.route.snapshot.params['key'];
    //this.fetchValueObject(this.namespace, this.key);

    this.route.params.subscribe((params: Params) => {
      this.namespace = params["name"];
      this.fetchKeys(this.namespace);
      this.key = params["key"];
      if (this.key != null) {
        this.fetchValueObject(this.namespace, this.key);
      }
    });
  }
 


  jsonFileExpNS(name: string) {
    var valuesObject = {};
    var keyValObject = {};
    this.generatingKeys = true;

    this.dashservice.fetchKeys(name).subscribe(res => {
      this.keysList = res;
      valuesObject = {};
      this.keysLoadProgress = 0;
      console.log(this.keysLoadProgress);

      valuesObject[name] = {};

      this.keysList.forEach(keyId => {
        this.dashservice.getValue(name, keyId).subscribe(val =>{

          this.keysLoadProgress ++
          this.keysLoadPercent = (this.keysLoadProgress/ this.keysList.length) * 100

          keyValObject[keyId] = val;

          this.valuesArray.push(keyValObject);
        

          if(this.keysLoadProgress == this.keysList.length){
            valuesObject[name] = keyValObject;
;
            var dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(valuesObject));
            var dlAnchorElem = document.getElementById('downloadAnchorElem');
            dlAnchorElem.setAttribute("href",     dataStr     );
            dlAnchorElem.setAttribute("download", "exp-ns-"+name+".json");
            dlAnchorElem.click(); 

            this.generatingKeys = false;

            valuesObject = undefined;
            keyValObject = undefined;
            this.keysLoadProgress = 0;
            this.keysLoadPercent = 0;

          }

        }

        );
      });
    });
  }

  fetchKeys(name: string) {
    this.loadingKeys = true;
    this.dashservice.fetchKeys(name).subscribe(responseData => {
      this.loadedKeys = responseData;
      this.loadingKeys = false;
    },error =>{
      this.router.navigate(["/home"]);
    });
  }

  fetchValueObject(namespace: string, key: string) {
    this.router.navigate(["/namespace", namespace, key]);
  }

  deleteKey(name: string, key: string, keysNo: number) {
    this.keyDeleted = false;
    this.deletingKey = true;

    this.dashservice.deleteKey(name, key).subscribe(
      res => {
        if (res["status"] === "OK") {
          this.deletingKey = false;
          this.keyDeleted = true;

          if (keysNo > 1) {
            this.fetchKeys(name);
          } else {
            this.eventEmmiterService.onNameKeyAdded();
            this.router.navigate(["/"]);
          }
        }
      },
      error => {
        this.deletingKey = false;
      }
    );
  }

  showKeyForm() {
    if (this.showForm) {
      this.showForm = false;
    } else {
      this.showForm = true;
    }
  }

  addNewKey(name, keyValue) {
    this.addingKey = true;

    this.dashservice.addNewKey(name, keyValue.key).subscribe(
      res => {
        this.addingKey = false;

        this.showKeyForm();
        this.fetchKeys(name);
      },
      error => {
        this.addingKey = false;
      }
    );
  }
}
