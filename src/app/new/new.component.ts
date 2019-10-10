import { Component, OnInit } from "@angular/core";
import { NewService } from "./new.service";
import { EventEmmiterService } from "../event-emmiter.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-new",
  templateUrl: "./new.component.html",
  styleUrls: ["./new.component.css"]
})
export class NewComponent implements OnInit {
  idStr: string;

  savingNsKey: boolean = false;
  savedNsKey: boolean = false;
  nsExists: boolean = false;
  generatingId: boolean = false;
  creatingNspace: boolean = false;

  error = null;

  constructor(
    private newService: NewService,
    private eventEmmiterService: EventEmmiterService,
    private router: Router
  ) {}

  ngOnInit() {}

  generateRID() {
    this.generatingId = true;
    this.newService.getUID().subscribe(idJson => {
      this.idStr = idJson.codes[0];
      this.generatingId = false;
    });
  }

  addNewNameSpaceAndKey(NameKeyValues) {
    this.creatingNspace = true;

    this.newService.namespaceExists(NameKeyValues.namespace).subscribe(
      res => {
        //namespace exists alert the user
        //console.log("namespace exists");
        this.creatingNspace = false;
        this.nsExists = true;
      },
      error => {
        //namespace doesnt exist, proceed to post name-key-value
        this.newService.addNameSpaceKey(NameKeyValues).subscribe(
          response => {
            this.creatingNspace = false;
            this.eventEmmiterService.onNameKeyAdded();
            this.router.navigate([
              "/namespace",
              NameKeyValues.namespace,
              NameKeyValues.key
            ]);
          },
          error => {}
        );
      }
    );
  }
}
