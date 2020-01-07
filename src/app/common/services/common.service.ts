import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from "@angular/common/http";
import { Appsettings } from "../../shared/appsettings";
import {Observable} from "rxjs-observable";
import { UserlistViewModel } from "../../common/models/userlist-view-model";

@Injectable({
  providedIn: 'root'
})
export class CommonService {  
  apiURL = Appsettings.API_ENDPOINT;
  constructor(private httpClient: HttpClient) { }

  options() {
  
    const options = new HttpHeaders().set('content-type', 'application/json');

    return options;
}

  getAllItems() {
    return this.httpClient.get(this.apiURL + '/api/itemlist');
}
getItemById(id:any)
{
  return this.httpClient.get(this.apiURL + '/api/getItem/' + id);
}
updateRecord(item:UserlistViewModel)
{
  return this.httpClient.put(this.apiURL + '/api/updateRecord/',item);
}
insertRecord(item:UserlistViewModel)
{
  return this.httpClient.post(this.apiURL + '/api/insertRecord/',item);
}
deleteRecord(id:any)
{
  return this.httpClient.delete(this.apiURL + '/api/deleteRecord/' + id);
}
login(userName: string)
  {
    let body ={ Name: userName}
    return this.httpClient.post(this.apiURL + '/api/login/' , body );
  }

//    private jwt() {
//     // create authorization header with jwt token
//     let currentUser = JSON.parse(localStorage.getItem('currentUser'));
//     if (currentUser && currentUser.token) {
//         let header = new HttpHeaders();
//         header.append('x-access-token',currentUser.token);
//         header.append('content-type','application/json');
//         return header;
//  }

}

