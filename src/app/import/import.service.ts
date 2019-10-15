import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";

@Injectable({ providedIn: "root" })
export class ImportService {
  constructor(private http: HttpClient) {}

  getkeyVal(name: string, key: string) {
    return this.http.get("api/dataStore/" + name + "/" + key);
  }

  updatekeyVal(name: string, key: string, body: any) {
    if (typeof body == "string") {
      return this.http.put(
        "api/dataStore/" + name + "/" + key,
        '"' + body.toString() + '"',
        {
          headers: new HttpHeaders({
            "Content-Type": "application/json"
          })
        }
      );
    }else{
      return this.http.put("api/dataStore/" + name + "/" + key, body);
    }
  }

  addkeyVal(name: string, key: string, body: any) {
    if (typeof body == "string") {
    return this.http.post("api/dataStore/" + name + "/" + key, '"'+body.toString()+'"', {
      headers: new HttpHeaders({
        "Content-Type": "application/json"
      })
    });
  }else{
    return this.http.post("api/dataStore/" + name + "/" + key, body);
  }
  }
}
