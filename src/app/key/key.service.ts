import { Injectable } from "@angular/core";
import { NgxDhis2HttpClientService } from '@iapps/ngx-dhis2-http-client';


@Injectable({ providedIn: "root" })
export class KeyService {

  keysReqUrl: string;

  valueReqUrl: string;

  constructor(private http: NgxDhis2HttpClientService) {}


  fetchValue(name: string, key: string){


    this.valueReqUrl = 'dataStore/' + name + '/' + key;

    //console.log(this.valueReqUrl);

    return this.http.get(this.valueReqUrl);

  }

}
