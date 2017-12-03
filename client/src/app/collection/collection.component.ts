import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { SearchService } from '../search.service';

@Component({
  selector: 'app-collection',
  templateUrl: './collection.component.html',
  styleUrls: ['./collection.component.css']
})
export class CollectionComponent implements OnInit {
  profile: any;
  constructor(public auth: AuthService, public search: SearchService) { }

  addCollection(name: string, description: string, visibility: string){
      this.search.addCollection(this.auth.userProfile.name, name, description, visibility).subscribe(data=>{
        //alert(data._body);
        console.log(data);
      });
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
