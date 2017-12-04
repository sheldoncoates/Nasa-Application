import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { SearchService } from '../search.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  profile: any;
  imageCollection: any[] = [];
  objectArray:any[] = [];
  myarray = new Array();
  
  constructor(public auth: AuthService, public search: SearchService) { 
    
  }
  //shows all collections that are public
  showCollections(){
    this.imageCollection = [];
    this.search.getAllCollections().subscribe(data=>{
        for(var i = 0; i < data.length; i++){
          if(data[i].visibility == 'private' || data[i].visibility == 'Private'){
            
            
          }else{
            this.myarray[i] = new Array();
            this.objectArray.push(data[i]);
            for(var j = 0; j < data[i].urls.length; j++){
              this.myarray[i].push(data[i].urls[j]);
            }
          }
        }
    })
    
  }
  //rate collection
  rateCollection(collectionName: string, rating: string){
    this.search.rateCollection(collectionName, rating).subscribe(data=>{
      console.log(data);
      location.reload();
    });
  }

  ngOnInit() {
    this.showCollections();
  }

}
