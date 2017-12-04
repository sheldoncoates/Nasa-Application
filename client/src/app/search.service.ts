import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class SearchService {

  constructor(public http: Http) { }
    //searching nasa api
    searchNasa(searchKeyword: string){
        var url = 'https://images-api.nasa.gov/search?q=';
        console.log(url + searchKeyword);
        return this.http.get(url + searchKeyword).map(res => res.json());
    }
    //adding collection
    addCollection(username: string, collectionName: string, collectionDescription: string, collectionVisibility: string){
      var body = {
        username: username,
        name: collectionName, 
        description: collectionDescription, 
        visibility: collectionVisibility
      }
      return this.http.post('/api/createCollection', body);
    }
    //getting a collection
    getCollections(userName: string){
      var body = {
        username: userName
      }
      return this.http.post('/api/getCollections', body).map(res => res.json());
    }
    //deleting a collection
    deleteCollection(name:string){
      var body = {
        name: name
      }
      return this.http.post('/api/deleteCollection', body).map(res => res.json());
    }
    //deleting an image from collection
    deleteImage(url: string, collectionName: string){
      var body = {
        url: url,
        name: collectionName
      }
      return this.http.post('/api/deleteUrl', body).map(res => res.json());
    }
    //adding an image to a colleciton
    addImageToCollection(url:string, collectionName: string){
      var body = {
        url: url,
        name: collectionName
      }
      return this.http.post('/api/addUrl', body).map(res => res.json());
  }
  //renaming a collection
  renameCollection(name: string, newname: string){
    var body = {
        name: name,
        newname: newname
      }
      return this.http.post('/api/rename', body).map(res => res.json());
  }
  //getting all collections
  getAllCollections(){
    return this.http.get('/api/getAllCollections').map(res => res.json());
  }
  //changing collection visibility
  changeVisibility(name:string, visibility: string){
    var body = {
      name: name,
      visibility: visibility
    }
    return this.http.post('/api/visibility', body).map(res => res.json());
  }
  //rating a collection
  rateCollection(collectionName: string, rating: string){
    var body = {
      name: collectionName,
      rating: rating
    }
    return this.http.post('/api/rating', body).map(res => res.json());
  }
}
