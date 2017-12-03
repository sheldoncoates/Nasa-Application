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
  images: any[];
  imageLinks: any[] = [];
  imageNames: any[] = [];
  searching: boolean = false;
  searchNasa(keyword: string){
  
    if(keyword==''){
      return alert("fill in search criteria");
    }else{
      var newKeyword = keyword.split(' ').join('%20');
      this.images = [];
      this.imageLinks = [];
      this.imageNames = [];
      this.searching = true;
      return this.search.searchNasa(newKeyword).subscribe(
        data => this.handleSuccess(data), 
        error => console.log(error),
        () => this.searching = false
        );
    }
    
  }
  handleSuccess(data){
    console.log(data.collection.items);
    this.images = data.collection.items;
    for(var i = 0; i < this.images.length; i++){
      this.imageLinks.push(this.images[i].links[0].href);
      this.imageNames.push(this.images[i].data[0].title);
    }
}
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
