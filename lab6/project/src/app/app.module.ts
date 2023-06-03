import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TripsListComponent } from './trips-list/trips-list.component';
import { TripComponent } from './trip/trip.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { TripButtonsComponent } from './trip-buttons/trip-buttons.component';
import { AddTripComponent } from './add-trip/add-trip.component';
import { StarRatingComponent } from './star-rating/star-rating.component';
import { AppFilterComponent } from './app-filter/app-filter.component';
import { DataForFilterService } from './interfacesAndServices/data-for-filter.service';
import { FilterPipePipe } from './interfacesAndServices/filter-pipe.pipe';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { GoogleMapsModule } from '@angular/google-maps';
import { HomeComponent } from './home/home.component';
import { TripDetailsComponent } from './trip-details/trip-details.component';
import { RateFormComponent } from './rate-form/rate-form.component';
import { BoughtTripsComponent } from './bought-trips/bought-trips.component';
import { StatusFilterPipe } from './interfacesAndServices/status-filter.pipe';
import { HttpClientModule } from '@angular/common/http';
import { LoginPageComponent } from './login-page/login-page.component';
import { SigninPageComponent } from './signin-page/signin-page.component';
import { CookieService } from 'ngx-cookie-service';
import { UsersDataComponent } from './users-data/users-data.component';

@NgModule({
  declarations: [
    AppComponent,
    TripsListComponent,
    TripComponent,
    TripButtonsComponent,
    AddTripComponent,
    StarRatingComponent,
    AppFilterComponent,
    FilterPipePipe,
    ShoppingCartComponent,
    HomeComponent,
    TripDetailsComponent,
    RateFormComponent,
    BoughtTripsComponent,
    StatusFilterPipe,
    LoginPageComponent,
    SigninPageComponent,
    UsersDataComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule, 
    ReactiveFormsModule,
    GoogleMapsModule,
    HttpClientModule
  ],
  providers: [DatePipe,
  DataForFilterService, 
CookieService],
  bootstrap: [AppComponent]
})
export class AppModule { }
