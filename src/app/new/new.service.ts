import { Injectable } from "@angular/core";
/*import { HttpClient, HttpHeaders } from "@angular/common/http";
import { map } from "rxjs/operators";
import { pipe, of, Observable} from 'rxjs';
import { error } from 'util';*/
import { NgxDhis2HttpClientService } from '@iapps/ngx-dhis2-http-client';

@Injectable({
  providedIn: 'root',
})
export class NewService {
  public username: string = "admin";
  public password: string = "district";
  requestURL: string;
  chckNsRequestURL: string;
  nspaceExists: boolean;
  error = null;

  public authParam: string;

  constructor(private http: NgxDhis2HttpClientService) {}

  //fn to check if namespace exists -> return true/ false
  namespaceExists(name: string){

    this.chckNsRequestURL = "dataStore/" + name;

    return this.http
      .get(this.chckNsRequestURL); 
  }

  /*------------------------------------------------------------------------------------------------
  --------------------------------------------------------------------------------------------------
  ----------------------add namespace-key + handle errors ------------------------------------------
  --------------------------------------------------------------------------------------------------
  ------------------------------------------------------------------------------------------------*/

  addNameSpaceKey(NameKeyValues) {
    this.authParam = btoa(this.username + ":" + this.password);
      //proceed to make post namespace - key
      this.requestURL =
        "dataStore/" +
        NameKeyValues.namespace +
        "/" +
        NameKeyValues.key;

      //an empty json to initialize namespace-key as per API convention written in js -> fix
      var myString = "{}";
      var body = JSON.parse(myString);
      
      //check url and form values
      //console.log(this.requestURL);
      return this.http.post(this.requestURL, body);
  }
}
