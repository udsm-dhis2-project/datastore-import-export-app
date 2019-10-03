import { Component, OnInit } from "@angular/core";
import { KeyService } from "./key.service";
import { ActivatedRoute, Params } from "@angular/router";

@Component({
  selector: "app-key",
  templateUrl: "./key.component.html",
  styleUrls: ["./key.component.css"]
})
export class KeyComponent implements OnInit {
  key: string;
  name: string = this.route.parent.snapshot.params["name"];
  loadingValue = false;
  valueLoaded = false;
  loadedValue = {};

  constructor(private keyService: KeyService, private route: ActivatedRoute) {}

  ngOnInit() {
    

    //console.log(this.route.parent.snapshot.params['name']);

    this.route.params.subscribe((params: Params) => {
      //this.name = params["name"];
      this.key = params["key"];

      //console.log(this.name + this.key);

      this.fetchValueObject(this.name, this.key);
    });

    //this.key = this.route.snapshot.params['key'];
  }

  fetchValueObject(name: string, key: string) {
    this.loadingValue = true;
    this.valueLoaded = false;
    //console.log(this.route.parent.snapshot.params['name']);
    this.keyService.fetchValue(name, key).subscribe(responceData => {
      this.loadedValue = responceData;

      this.loadingValue = false;
      this.valueLoaded = true;
    });
  }
}
