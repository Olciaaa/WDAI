import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddTripComponent } from './add-trip/add-trip.component';
import { BoughtTripsComponent } from './bought-trips/bought-trips.component';
import { HomeComponent } from './home/home.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { SigninPageComponent } from './signin-page/signin-page.component';
import { TripDetailsComponent } from './trip-details/trip-details.component';
import { TripsListComponent } from './trips-list/trips-list.component';
import { UsersDataComponent } from './users-data/users-data.component';

const routes: Routes = [{path:'', component: HomeComponent},
  { path: 'trips', component: TripsListComponent },
  { path: 'add', component: AddTripComponent },
  {path: 'cart', component: ShoppingCartComponent},
  {path: 'trips/:id', component: TripDetailsComponent},
  {path: 'myTrips', component: BoughtTripsComponent},
  {path: 'login', component: LoginPageComponent},
  {path: 'signin', component: SigninPageComponent},
  {path: 'users', component: UsersDataComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
