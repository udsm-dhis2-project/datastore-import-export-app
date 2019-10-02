import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { map } from "rxjs/operators";
import { NameSpaceModule } from "./namespace.module";

@Injectable({ providedIn: "root" })
export class NameSpacesService {
  public username: string = "admin";
  public password: string = "district";

  public authParam;

  delReqUrl: string;

  constructor(private http: HttpClient) {}

  fetchNameSpaces() {
    this.authParam = btoa(this.username + ":" + this.password);
    //console.log(this.authParam);

    return this.http
      .get("/2.30/api/26/dataStore", {
        headers: new HttpHeaders({
          Authorization: "Basic " + this.authParam,
          "Access-Control-Allow-Origin": "*"
        })
      })
      .pipe(
        map(responceData => {
          const nameSpacesArray: NameSpaceModule[] = [];
          //console.log(responceData);

          for (const key in responceData) {
            //console.log('for parsed');
            if (responceData.hasOwnProperty(key)) {
              //console.log('if checked');
              nameSpacesArray.push(responceData[key]);
            }
          }

          return nameSpacesArray;
        })
      );
  }

  deleteNameSpace(name) {
    this.delReqUrl = "/2.30/api/26/dataStore/" + name;

    return this.http.delete(this.delReqUrl, {
      headers: new HttpHeaders({
        Authorization: "Basic " + this.authParam,
        "Access-Control-Allow-Origin": "*"
      })
    });
  }
}
