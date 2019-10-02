import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { map } from "rxjs/operators";
//import { NameSpaceModule } from "./namespace.module";

@Injectable({ providedIn: "root" })
export class DashService {
  public username: string = "admin";
  public password: string = "district";

  public authParam;

  keysReqUrl: string;

  valueReqUrl: string;

  constructor(private http: HttpClient) {}

  fetchKeys(name) {
    this.authParam = btoa(this.username + ":" + this.password);
    this.keysReqUrl = '/2.30/api/26/dataStore/'+name;
    //console.log(this.authParam);

    return this.http
      .get(this.keysReqUrl, {
        headers: new HttpHeaders({
          Authorization: "Basic " + this.authParam,
          "Access-Control-Allow-Origin": "*"
        })
      })
      .pipe(
        map(responceData => {
          const keysArray = [];
          //console.log(responceData);

          for (const key in responceData) {
            //console.log('for parsed');
            if (responceData.hasOwnProperty(key)) {
              //console.log('if checked');
              keysArray.push(responceData[key]);
            }
          }

          return keysArray;
        })
      );
  }


  fetchValue(name: string, key: string){

    this.valueReqUrl = '/2.30/api/26/dataStore/' + name + '/' + key;

    return this.http.get(this.valueReqUrl,
      {
        headers: new HttpHeaders({
          Authorization: "Basic " + this.authParam,
          "Access-Control-Allow-Origin": "*"
        })
      });

  }

}
