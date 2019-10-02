import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { DashService} from './dash.service';
 
@Component({
  selector: 'app-dash',
  templateUrl: './dash.component.html',
  styleUrls: ['./dash.component.css']
})
export class DashComponent implements OnInit {

  key: string;
  namespace: string;
  loadedKeys = [];
  loadingKeys = false;
  loadingValue = false;
  valueLoaded = false;
  loadedValue = {};
  constructor(private route: ActivatedRoute, private dashservice: DashService, private router: Router) { }

  ngOnInit() {
    this.namespace = this.route.snapshot.params['name'];
    this.fetchKeys(this.namespace);

    //this.key = this.route.snapshot.params['key'];
    //this.fetchValueObject(this.namespace, this.key);

    this.route.params.subscribe(
      (params: Params) => {
        this.namespace = params['name'];
        this.fetchKeys(this.namespace);

        
        this.key = params['key'];
        if(this.key != null){
          this.fetchValueObject(this.namespace, this.key);
        }
      }
    );
  

   }

   fetchKeys(name: string){
      //console.log(name);
      this.valueLoaded = false;
      this.loadingKeys = true;
      this.dashservice.fetchKeys(name).subscribe(
        responseData => {
          this.loadedKeys = responseData;
          this.loadingKeys = false;
          
        }
      )

   }

   fetchValueObject(namespace: string,key: string){

      //console.log(key + namespace);
      this.loadingValue = true;
      this.valueLoaded = false
      this.dashservice.fetchValue(namespace, key).subscribe(
        responceData => {
          this.loadedValue = responceData;
          this.loadingValue = false;
          this.valueLoaded = true;
        }
      );

   }

  
  
}
