import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { map } from "rxjs/operators";
import { pipe, of, Observable} from 'rxjs';
import { error } from 'util';

@Injectable({ providedIn: "root" })
export class NewService {
  public username: string = "admin";
  public password: string = "district";
  requestURL: string;
  chckNsRequestURL: string;
  nspaceExists: boolean = false;
  error = null;

  public authParam;

  constructor(private http: HttpClient) {}

  //fn to check if namespace exists -> return true/ false
  namespaceExists(name: string) {
    this.chckNsRequestURL = "/2.30/api/26/dataStore/" + name;
    //console.log(this.chckNsRequestURL);

    this.http
      .get(this.chckNsRequestURL, {
        headers: new HttpHeaders({
          Authorization: "Basic " + this.authParam,
          "Access-Control-Allow-Origin": "*"
        })
      })
      .subscribe(
        responceData => {
          console.log(responceData);
          this.nspaceExists = true;
        },
        error => {
          this.error = error.message;
        }
      );

    return this.nspaceExists;
  }

  /*------------------------------------------------------------------------------------------------
  --------------------------------------------------------------------------------------------------
  ----------------------add namespace-key + handle errors ------------------------------------------
  --------------------------------------------------------------------------------------------------
  ------------------------------------------------------------------------------------------------*/

  addNameSpaceKey(NameKeyValues) {
    this.authParam = btoa(this.username + ":" + this.password);

    if (this.namespaceExists(NameKeyValues.namespace)) {
      //do not make post request to add nsapce - key
      //console.log("name exists")
      var myErrorMessage = "{'message':'NameSpace Already Exists'}";
      return of(myErrorMessage);

    
    } else {
      //console.log("name does not extist");
      //proceed to make post namespace - key

      //console.log("hi from the post req")

      this.requestURL =
        "/2.30/api/26/dataStore/" +
        NameKeyValues.namespace +
        "/" +
        NameKeyValues.key;

      //an empty json to initialize namespace-key as per API convention written in js -> fix
      var myString = "{}";
      var body = JSON.parse(myString);
      //check url and form values
      //console.log(this.requestURL);
      return this.http.post(this.requestURL, body, {
        headers: new HttpHeaders({
          Authorization: "Basic " + this.authParam,
          "Access-Control-Allow-Origin": "*"
        })
      });
    }
  }
}
