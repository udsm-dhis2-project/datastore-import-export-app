import { Injectable } from "@angular/core";
import { NgxDhis2HttpClientService } from "@iapps/ngx-dhis2-http-client";
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Injectable({ providedIn: "root" })
export class ImportService {
  constructor(private http: NgxDhis2HttpClientService, private httpn: HttpClient) {}

  getkeyVal(name: string, key: string) {
    return this.http.get("dataStore/" + name + "/" + key);
  }

  updatekeyVal(name: string, key: string, body: any) {
    if (typeof body == "string") {
      var jsonBody = '\"'+body+'\"'
      return this.httpn.put("../../../api/dataStore/" + name + "/" + key, jsonBody,
      {
        headers: new HttpHeaders({
          'Content-Type':  'application/json'
        })
      });
    } else {
      return this.http.put("/dataStore/" + name + "/" + key, body);
    }
  }

  addkeyVal(name: string, key: string, body: any) {
    if (typeof body == "string") {
      var jsonBody = '\"'+body+'\"'
      return this.httpn.post("../../../api/dataStore/" + name + "/" + key, jsonBody,
      {
        headers: new HttpHeaders({
          'Content-Type':  'application/json'
        })
      });
    } else {
      return this.http.post("dataStore/" + name + "/" + key, body);
    }
  }
}
