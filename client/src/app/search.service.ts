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
      var body = {
        username: userName
      }
      return this.http.post('/api/getCollections', body).map(res => res.json());
    }
    deleteCollection(name:string){
      var body = {
        name: name
      }
      return this.http.post('/api/deleteCollection', body).map(res => res.json());
    }
    deleteImage(url: string, collectionName: string){
      var body = {
        url: url,
        name: collectionName
      }
      return this.http.post('/api/deleteUrl', body).map(res => res.json());
    }
    addImageToCollection(url:string, collectionName: string){
      var body = {
        url: url,
        name: collectionName
      }
      return this.http.post('/api/addUrl', body).map(res => res.json());
  }
  renameCollection(name: string, newname: string){
    var body = {
        name: name,
        newname: newname
      }
      return this.http.post('/api/rename', body).map(res => res.json());
  }
  getAllCollections(){
    return this.http.get<MyJsonData>('/api/getAllCollections', {observe: 'response'}).map(res => res.json());
  }
}
