import { Component, OnInit } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { LoginService } from '../login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private http: HttpClient, private loginService: LoginService) { }
  
  userLogin(username: string, password: string){
    if(username == "" || password == "")
    {
      alert("Fill out required fields")
    }
    else
    {
      this.loginService.userLogin(username, password).subscribe(data=>{
        alert(data);
        console.log(data);
    })
    }
    
  }

  ngOnInit() {
  }
}
