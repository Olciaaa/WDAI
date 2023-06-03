import { Component, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { PostsService } from '../posts.service';

@Component({
  selector: 'app-single-photo',
  templateUrl: './single-photo.component.html',
  styleUrls: ['./single-photo.component.scss']
})
export class SinglePhotoComponent {
  constructor(private route: ActivatedRoute, private singlePhotoService: PostsService) { }
  private subscription: Subscription | undefined

  id: number;
  photoUrl: string = ""
  ngOnInit(): void {
    this.subscription = this.route.params.subscribe(params => {
      this.id = params['id']
    })
    this.singlePhotoService.getPhotoUrlById(this.id).subscribe(res => this.photoUrl=res.url)
  }

  ngOnDestroy(): void {
    if (this.subscription)
      this.subscription.unsubscribe()
  }
}
