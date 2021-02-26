import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpClientModule} from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavComponent } from './components/nav/nav.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './home/home.component';
import { PlanetComponent } from './components/planet/planet.component';

import { PlanetsService } from '../services/planets.service';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    HomeComponent,
    PlanetComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
  ],
  providers: [
    PlanetsService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
