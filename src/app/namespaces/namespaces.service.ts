import { Injectable } from "@angular/core";
import { NameSpaceModule } from "./namespace.module";
import { NgxDhis2HttpClientService } from "@iapps/ngx-dhis2-http-client";
import { HttpClient } from "@angular/common/http";
import { map } from "rxjs";

@Injectable({ providedIn: "root" })
export class NameSpacesService {
  keysReqUrl: string;
  delReqUrl: string;
  getValUrl: string;

  constructor(
    private http: NgxDhis2HttpClientService,
    private httpClient: HttpClient
  ) {}

  fetchNameSpaces() {
    return this.httpClient.get("../../../api/dataStore").pipe(
      map((responceData) => {
        const nameSpacesArray: NameSpaceModule[] = [];

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

  getProgramData() {
    let url =
      "programs/ib6PYHQ5Aa8.json?fields=programTrackedEntityAttributes[name,displayName,attributeValues,mandatory,renderOptionsAsRadio,sortOrder,valueType,trackedEntityAttribute[*,optionSet[options[code,name,id]]]]";

    return this.http.get(url);
  }
}
