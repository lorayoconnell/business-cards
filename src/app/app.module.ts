import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { CardsModule } from './cards/cards.module';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { NotFoundComponent } from './not-found/not-found.component';
import { WebcamComponent } from './webcam/webcam.component';

@NgModule({
  declarations: [
    AppComponent,
    NotFoundComponent,
    WebcamComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CardsModule,
    AuthModule,
    UserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
