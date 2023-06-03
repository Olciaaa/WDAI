import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TripsListComponent } from './trips-list/trips-list.component';
import { TripComponent } from './trip/trip.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { TripButtonsComponent } from './trip-buttons/trip-buttons.component';
import { TripPriceComponent } from './trip-price/trip-price.component';
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

@NgModule({
  declarations: [
    AppComponent,
    TripsListComponent,
    TripComponent,
    TripButtonsComponent,
    TripPriceComponent,
    AddTripComponent,
    StarRatingComponent,
    AppFilterComponent,
    FilterPipePipe,
    ShoppingCartComponent,
    HomeComponent,
    TripDetailsComponent,
    RateFormComponent,
    BoughtTripsComponent,
    StatusFilterPipe
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
  DataForFilterService],
  bootstrap: [AppComponent]
})
export class AppModule { }
