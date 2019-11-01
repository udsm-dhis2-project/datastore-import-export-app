import { Injectable } from "@angular/core";
//import { NgxDhis2HttpClientService } from "@iapps/ngx-dhis2-http-client";
import { HttpClient, HttpHeaders } from "@angular/common/http";

@Injectable({ providedIn: "root" })
export class KeyService {
  keysReqUrl: string;

  valueReqUrl: string;

  valUpdReq: string;

  constructor(
    //private http: NgxDhis2HttpClientService,
    private http: HttpClient
  ) {}

  updateVal(name: string, keyID: string, body: {}) {
    this.valUpdReq = "../../../api/dataStore/" + name + "/" + keyID;

    if (typeof body == "string") {
      var jsonBody = '"' + body + '"';
      console.log(jsonBody);
      return this.http.put(this.valUpdReq, jsonBody, {
        headers: new HttpHeaders({
          "Content-Type": "application/json"
        })
      });
    } else {
      return this.http.put(this.valUpdReq, body);
    }
  }

  fetchValue(name: string, key: string) {
    this.valueReqUrl = "../../../api/dataStore/" + name + "/" + key;
    return this.http.get(this.valueReqUrl);
  }
}
