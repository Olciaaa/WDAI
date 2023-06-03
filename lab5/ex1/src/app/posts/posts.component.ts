import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { PostsService } from '../posts.service';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss']
})
export class PostsComponent {
  posts:any;
  constructor(private postsService:PostsService){
    
  }

  newPostForm = new FormGroup({
    title: new FormControl(''),
    text: new FormControl(''),
    name: new FormControl('')
  })

  ngOnInit(){
    this.getData();
  }

  getData(){
    this.postsService.getPosts().subscribe((data) => {
      this.posts = data.reverse();
    })
  }

  sendData(){
    let dataToSend = {
      "userId": 0,
      "id": this.posts.length + 1,
      "title": this.newPostForm.get('title')!.value,
      "body": this.newPostForm.get('text')!.value
    }
    this.postsService.sendPost(JSON.stringify(dataToSend)).subscribe(this.posts.splice(0, 0, dataToSend))
  }
}
