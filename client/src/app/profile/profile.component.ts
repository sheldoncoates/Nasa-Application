import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { SearchService } from '../search.service';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  profile: any;
  othercollections: any[] = [];
  imageCollection: any[] = [];
  constructor(public auth: AuthService, public search: SearchService) { }
  showCollections(){
    this.othercollections = [];
    this.search.getCollections(this.auth.userProfile.name).subscribe(data=>{
        console.log(data);
        for(var i = 0; i < data.length; i++){
          this.othercollections.push(data[i].name)
          this.imageCollection.push(data[i].url);
        }
    })
    
  }
 
  ngOnInit() {
    if (this.auth.userProfile) {
      this.profile = this.auth.userProfile;
    } else {
      this.auth.getProfile((err, profile) => {
        this.profile = profile;
      });
    }
  }

}


