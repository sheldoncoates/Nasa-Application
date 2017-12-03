import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class SearchService {

  constructor(public http: Http) { }

    searchNasa(searchKeyword: string){
        var url = 'https://images-api.nasa.gov/search?q=';
        console.log(url + searchKeyword);
        return this.http.get(url + searchKeyword).map(res => res.json());
    }
    addCollection(username: string, collectionName: string, collectionDescription: string, collectionVisibility: string){
      var body = {
        username: username,
        name: collectionName, 
        description: collectionDescription, 
        visibility: collectionVisibility
      }
      return this.http.post('/api/createCollection', body);
    }
    getCollections(userName: string){
      console.log(userName);
      var body = {
        username: userName
      }
      return this.http.post('/api/getCollections', body).map(res => res.json());
    }
}
