import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Params, Router } from "@angular/router";
import { DashService } from "./dash.service";
import { EventEmmiterService } from '../event-emmiter.service';

@Component({
  selector: "app-dash",
  templateUrl: "./dash.component.html",
  styleUrls: ["./dash.component.css"]
})
export class DashComponent implements OnInit {
  key: string;
  namespace: string;
  loadedKeys = [];
  loadingKeys: boolean = false;
  deletingKey: boolean = false;
  keyDeleted: boolean;
  showForm: boolean;

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

  fetchKeys(name: string) {
    this.loadingKeys = true;
    this.dashservice.fetchKeys(name).subscribe(responseData => {
      this.loadedKeys = responseData;
      this.loadingKeys = false;
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

          if(keysNo > 1){
            this.fetchKeys(name);
          }else{
            this.eventEmmiterService.onNameKeyAdded();
            this.router.navigate(["/"]);
          }
        }
      },
      error => {
        //console.log("error");
        this.deletingKey = false;
      }
    );
  }

  showKeyForm(){
    if(this.showForm){
      this.showForm = false;
    }else{
      this.showForm = true;
    }
    
  }

  addNewKey(name, keyValue){
    this.dashservice.addNewKey(name, keyValue.key).subscribe(
      res => {
        this.showKeyForm();
        this.fetchKeys(name);

      }
    );
  }
}
