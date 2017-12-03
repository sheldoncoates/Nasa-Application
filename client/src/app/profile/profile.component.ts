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
  myarray = new Array();
  showCollections(){
    this.othercollections = [];
    this.imageCollection = [];
    this.search.getCollections(this.auth.userProfile.name).subscribe(data=>{

        for(var i = 0; i < data.length; i++){
          this.myarray[i] = new Array();
          this.othercollections.push(data[i].name)
          for(var j = 0; j < data[i].urls.length; j++){
            this.myarray[i].push(data[i].urls[j]);
          }
          
        }
    })
    
  }
  deleteCollection(name: string){
    this.search.deleteCollection(name).subscribe(data=>{
        console.log(data);
    })
    this.showCollections();
  }
  
  deleteImage(url: string, collectionName: string){

    this.search.deleteImage(url, collectionName).subscribe(data=>{
        console.log(data);
    })
    setTimeout(this.showCollections(), 1000);
  }
  
  renameCollection(name: string, newname: string){
    if(newname == ''){
      alert('enter new collection name');
    }else{
      this.search.renameCollection(name, newname).subscribe(data=>{
        console.log(data);
    })
    setTimeout(this.showCollections(), 1000);
    }
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


