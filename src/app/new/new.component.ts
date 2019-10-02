import { Component, OnInit } from '@angular/core';
import { NewService } from "./new.service";
import { EventEmmiterService } from '../event-emmiter.service';

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.css']
})
export class NewComponent implements OnInit {

  
  savingNsKey: boolean = false;
  savedNsKey: boolean = false;

  error = null;

  constructor(private newService: NewService, private eventEmmiterService: EventEmmiterService) { }

  ngOnInit() {
  }


  addNewNameSpaceAndKey(NameKeyValues){
    //check form values get to component logic
    //console.log(NameKeyValues)
    this.savingNsKey = true;
    this.newService.addNameSpaceKey(NameKeyValues).subscribe(
      responceData => {
        console.log(responceData);


        this.savingNsKey = false;
        this.savedNsKey = true;

        this.eventEmmiterService.onNameKeyAdded();

      },
      error => {
        this.error = error.message;
      }
    );
    

    
  }

}
