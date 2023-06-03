import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { PhotosComponent } from './photos/photos.component';
import { PostsComponent } from './posts/posts.component';
import { SinglePhotoComponent } from './single-photo/single-photo.component';

const routes: Routes = [{ path: 'posts', component: PostsComponent },
{ path: 'photos', component: PhotosComponent },
{path:'', component: HomeComponent},
{path: 'photos/:id', component: SinglePhotoComponent},];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
