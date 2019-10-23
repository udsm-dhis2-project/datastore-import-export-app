import { Injectable } from "@angular/core";
import { NgxDhis2HttpClientService } from "@iapps/ngx-dhis2-http-client";

@Injectable({ providedIn: "root" })
export class KeyService {
  keysReqUrl: string;

  valueReqUrl: string;

  valUpdReq: string;

  constructor(private http: NgxDhis2HttpClientService) {}

  updateVal(name: string, keyID: string, body: {}) {

    this.valUpdReq = "dataStore/" + name + "/" + keyID;

    if(typeof(body) == "string"){
      var jsonBody = JSON.parse('{"0":"' + body + '"}');
      console.log(typeof(jsonBody));
      return this.http.put(this.valUpdReq, jsonBody);
    }else{
      return this.http.put(this.valUpdReq, '"' + body.toString() + '"');
    }
    
  }


  fetchValue(name: string, key: string) {
    this.valueReqUrl = "dataStore/" + name + "/" + key;
    return this.http.get(this.valueReqUrl);
  }
}
