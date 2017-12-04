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
  objects:any[]=[];
  constructor(public auth: AuthService, public search: SearchService) { }
  myarray = new Array();
  //show the users collections
  showCollections(){
    this.othercollections = [];
    this.objects = [];
    this.search.getCollections(this.auth.userProfile.name).subscribe(data=>{

        for(var i = 0; i < data.length; i++){
          this.myarray[i] = new Array();
          this.othercollections.push(data[i].name)
          this.objects.push(data[i]);
          for(var j = 0; j < data[i].urls.length; j++){
            this.myarray[i].push(data[i].urls[j]);
          }
          
        }
    })
    
  }
  //allows the user to change visibility
  changeVisibility(name:string, visibility: string){
    this.search.changeVisibility(name, visibility).subscribe(data=>{
        console.log(data);
    })
    location.reload();
  }
  //allows the user to delete collections
  deleteCollection(name: string){
    this.search.deleteCollection(name).subscribe(data=>{
        console.log(data);
        location.reload();
    })
    
  }
  //allows the user to delete a picture in a collection
  deleteImage(url: string, collectionName: string){

    this.search.deleteImage(url, collectionName).subscribe(data=>{
        console.log(data);
        location.reload();
    })
    
  }
  //allows the user to rename the collection
  renameCollection(name: string, newname: string){
    if(newname == ''){
      alert('enter new collection name');
    }else{
      this.search.renameCollection(name, newname).subscribe(data=>{
        console.log(data);
        location.reload();
    })
    
    }
  }
 
  ngOnInit() {
    if (this.auth.userProfile) {
      this.profile = this.auth.userProfile;
      this.showCollections();
    } else {
      this.auth.getProfile((err, profile) => {
        this.profile = profile;
        this.showCollections();
      });
    }
  }

}


