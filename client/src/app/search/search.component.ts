import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { SearchService } from '../search.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
othercollections: any[] = [];
  constructor(public auth: AuthService, public search: SearchService) { }
  profile:any;
  images: any[];
  imageLinks: any[] = [];
  imageNames: any[] = [];
  searching: boolean = false;
  
  showCollections(){
    this.othercollections = [];
    this.search.getCollections(this.auth.userProfile.name).subscribe(data=>{
        for(var i = 0; i < data.length; i++){
          var url = data[i].urls;
          this.othercollections.push(data[i].name)
        }
    })
    
  }
  addImageToCollection(url:string, collectionName: string){
    this.search.addImageToCollection(url, collectionName).subscribe(data=>{
        return console.log(url + ' ' + collectionName);
    })
    
  }
  searchNasa(keyword: string){
    this.showCollections();
  
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
