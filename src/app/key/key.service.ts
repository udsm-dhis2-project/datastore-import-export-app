import { Injectable } from "@angular/core";
import { NgxDhis2HttpClientService } from '@iapps/ngx-dhis2-http-client';


@Injectable({ providedIn: "root" })
export class KeyService {
  
  keysReqUrl: string;

  valueReqUrl: string;

  valUpdReq: string;

  constructor(private http: NgxDhis2HttpClientService) {}

  updateVal(name: string, keyID: string, body: {}) {
    
    this.valUpdReq = "dataStore/"+name+"/"+keyID;
    return this.http.put(this.valUpdReq, body);

  }


  fetchValue(name: string, key: string){


    this.valueReqUrl = 'dataStore/' + name + '/' + key;

    //console.log(this.valueReqUrl);

    return this.http.get(this.valueReqUrl);

  }

}
