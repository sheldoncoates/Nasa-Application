import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class LoginService {

  constructor(private http: HttpClient) { }
  
  userLogin(username: string, password: string){
      var body = {username: username, password: password}
      var url = '/api/login';
      return this.http.post(url, body);
  }
  userSignup(username: string, password: string){
      var body = {username: username, password: password}
      var url = '/api/register';
      return this.http.post(url, body);
  }

}
