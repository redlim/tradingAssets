import { Injectable } from '@angular/core'
import { Http, Response,Headers } from '@angular/http'
import 'rxjs/Rx';

@Injectable()
export class AssetsService{

  constructor(private http:Http){}
  createAuthorizationHeader(headers: Headers) {
    headers.append('JsonStub-User-Key', '9facef2e-9583-4a83-9f08-c87159f1c113');
    headers.append('JsonStub-Project-Key', '6ed070c1-b334-4612-8fa8-169c5e45baef');
    headers.append('Content-Type', 'application/json');
  }

  get(url) {
    let headers = new Headers();
    this.createAuthorizationHeader(headers);
    return this.http.get(url, {
      headers: headers
    });
  }

  post(url, data) {
    let headers = new Headers();
    this.createAuthorizationHeader(headers);
    return this.http.post(url, data, {
      headers: headers
    });
  }
  private url = "http://jsonstub.com/etsfintech/symbols";

  getAssets(){
    return this.get(this.url).map(
      response => response.json()
    )
  }
  getAsset(id){
    return this.get(this.url+"/"+id).map(
      response => response.json()
    )
  }

  setAsset(data){
    return this.post(this.url,data).map(
      response => response
    )
  }
  modifyAsset(item){
    return this.http.put(this.url+item.id,item).map(
      response => response
    )
  }
  deleteItem(item){
    return this.http.delete(this.url+item.id).map(
      response => response
    )
  }

}
