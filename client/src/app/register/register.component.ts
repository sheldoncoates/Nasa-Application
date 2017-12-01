import { Component, OnInit } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { LoginService } from '../login.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private http: HttpClient, private loginService: LoginService) { }
  userSignup(username: string, password: string){
    if(username == "" || password == ""){
      alert("Fill out required fields")
    }else{
      this.loginService.userSignup(username, password).subscribe(data=>{
        alert(data);
        console.log(data);
    })
    }
    
  }

  ngOnInit() {
  }

}
