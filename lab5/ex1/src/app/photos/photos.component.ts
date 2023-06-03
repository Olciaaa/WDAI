import { Component, OnInit } from '@angular/core';
import { PostsService } from '../posts.service';

@Component({
  selector: 'app-photos',
  templateUrl: './photos.component.html',
  styleUrls: ['./photos.component.scss']
})
export class PhotosComponent implements OnInit{
  photos:any[];
  ready:boolean = false;
  constructor(private postsService:PostsService){
    this.postsService.getPhotos().subscribe((data) => {
      console.log(data);
      this.photos = data;
      this.ready = true;
    })
  }

  ngOnInit(){
    
  }
}
