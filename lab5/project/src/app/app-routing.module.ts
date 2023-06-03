import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddTripComponent } from './add-trip/add-trip.component';
import { BoughtTripsComponent } from './bought-trips/bought-trips.component';
import { HomeComponent } from './home/home.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { TripDetailsComponent } from './trip-details/trip-details.component';
import { TripsListComponent } from './trips-list/trips-list.component';

const routes: Routes = [{path:'', component: HomeComponent},
  { path: 'trips', component: TripsListComponent },
  { path: 'add', component: AddTripComponent },
  {path: 'cart', component: ShoppingCartComponent},
  {path: 'trips/:id', component: TripDetailsComponent},
  {path: 'myTrips', component: BoughtTripsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
