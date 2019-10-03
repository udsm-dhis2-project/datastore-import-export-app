import { Injectable } from "@angular/core";
import { map } from "rxjs/operators";
import { NgxDhis2HttpClientService } from '@iapps/ngx-dhis2-http-client';

@Injectable({ providedIn: "root" })
export class DashService {


  keysReqUrl: string;

  valueReqUrl: string;

  delReqUrl: string;

  addKeyReqUrl: string;

  constructor(private http: NgxDhis2HttpClientService) {}

  deleteKey(name: string, key: string){

    this.delReqUrl = "dataStore/" + name + "/" + key;

    return this.http.delete(this.delReqUrl);
  }


  addNewKey(name: string, key: string){

    this.addKeyReqUrl = 'dataStore/' + name + '/' + key;
    var myString = "{}";
    var body = JSON.parse(myString);
    
    return this.http.post(this.addKeyReqUrl, body);
  

  }


  fetchKeys(name: string) {
    this.keysReqUrl = 'dataStore/'+name;
    //console.log(this.authParam);

    return this.http
      .get(this.keysReqUrl)
      .pipe(
        map(responceData => {
          const keysArray = [];
          //console.log(responceData);

          for (const key in responceData) {
            //console.log('for parsed');
            if (responceData.hasOwnProperty(key)) {
              //console.log('if checked');
              keysArray.push(responceData[key]);
            }
          }

          return keysArray;
        })
      );
  }

}
