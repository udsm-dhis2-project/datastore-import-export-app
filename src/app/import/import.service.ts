import { Injectable } from "@angular/core";
import { NgxDhis2HttpClientService } from "@iapps/ngx-dhis2-http-client";

@Injectable({ providedIn: "root" })
export class ImportService {
  constructor(private http: NgxDhis2HttpClientService) {}

  getkeyVal(name: string, key: string) {
    return this.http.get("dataStore/" + name + "/" + key);
  }

  updatekeyVal(name: string, key: string, body: any) {
    if (typeof body == "string") {
      var jsonBody = JSON.parse('{"0":"' + body + '"}');
      return this.http.put("dataStore/" + name + "/" + key, jsonBody);
    } else {
      return this.http.put("/dataStore/" + name + "/" + key, body);
    }
  }

  addkeyVal(name: string, key: string, body: any) {
    if (typeof body == "string") {
      var jsonBody = JSON.parse('{"0":"' + body + '"}');
      return this.http.post("dataStore/" + name + "/" + key, jsonBody);
    } else {
      return this.http.post("dataStore/" + name + "/" + key, body);
    }
  }
}
