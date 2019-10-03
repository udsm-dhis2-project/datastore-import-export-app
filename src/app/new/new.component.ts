import { Component, OnInit } from '@angular/core';
import { NewService } from "./new.service";
import { EventEmmiterService } from '../event-emmiter.service';
import { Router } from '@angular/router';
import { Guid } from "guid-typescript";

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.css']
})
export class NewComponent implements OnInit {

  public id: Guid;
  idStr: string;
  
  savingNsKey: boolean = false;
  savedNsKey: boolean = false;
  nsExists: boolean = false;

  error = null;

  constructor(private newService: NewService, private eventEmmiterService: EventEmmiterService, private router: Router) { }

  ngOnInit() {
  }

  generateRID(){

    this.id = Guid.create();
    //console.log(this.id['value']);
    this.idStr = this.id['value'];
    
  }


  addNewNameSpaceAndKey(NameKeyValues){

    this.newService.namespaceExists(NameKeyValues.namespace).subscribe(
      res => {
        //namespace exists alert the user
        //console.log("namespace exists");
        this.nsExists = true;

      },
      error => {
        
        //namespace doesnt exist, proceed to post name-key-value
        this.newService.addNameSpaceKey(NameKeyValues).subscribe(
          response => {
            this.eventEmmiterService.onNameKeyAdded();
            this.router.navigate(['/namespace', NameKeyValues.namespace, NameKeyValues.key]);


          },
          error => {

          }
        );

      }
    )
  }

}
