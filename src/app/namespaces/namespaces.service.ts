import { Injectable } from "@angular/core";
import { map } from "rxjs/operators";
import { NameSpaceModule } from "./namespace.module";
import { NgxDhis2HttpClientService } from '@iapps/ngx-dhis2-http-client';

@Injectable({ providedIn: "root" })
export class NameSpacesService {
  public username: string = "admin";
  public password: string = "district";

  public authParam;

  delReqUrl: string;

  constructor(private http: NgxDhis2HttpClientService) {}

  fetchNameSpaces() {

    return this.http
      .get("dataStore")
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
    this.delReqUrl = "dataStore/" + name;

    return this.http.delete(this.delReqUrl);
  }
}
