import { Injectable } from "@angular/core";
import { map } from "rxjs/operators";
import { NameSpaceModule } from "./namespace.module";
import { NgxDhis2HttpClientService } from "@iapps/ngx-dhis2-http-client";

@Injectable({ providedIn: "root" })
export class NameSpacesService {
  keysReqUrl: string;
  delReqUrl: string;
  getValUrl: string;

  constructor(private http: NgxDhis2HttpClientService) {}

  fetchNameSpaces() {
    return this.http.get("dataStore").pipe(
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

  deleteNameSpace(name: string) {
    this.delReqUrl = "dataStore/" + name;

    return this.http.delete(this.delReqUrl);
  }

  getKeys(name: string) {
    this.keysReqUrl = "dataStore/" + name;

    return this.http.get(this.keysReqUrl);
  }

  getValue(name: string, key: string) {
    this.getValUrl = "dataStore/" + name + "/" + key;

    return this.http.get(this.getValUrl);
  }
}
