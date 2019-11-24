import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { environment } from '../environments/environment';

import { AngularFireDatabaseModule } from '@angular/fire/database';

import { Router } from '@angular/router';
import { AppComponent } from './app.component';

import { CardsModule } from './cards/cards.module';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';

import { AppRoutingModule } from './app-routing.module';

import { NotFoundComponent } from './not-found/not-found.component';
import { WebcamComponent } from './webcam/webcam.component';
import { HeaderComponent } from './header/header.component';
// import { WebcamModule } from 'ngx-webcam';

import { AngularFirestoreModule } from 'angularfire2/firestore';
import { SearchCardService } from './cards/search-card.service';
import { WebcamService } from './webcam.service';
//import { FirebaseAdminModule } from './firebase-admin.module';

@NgModule({
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    CardsModule,
    AuthModule,
    UserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig, 'app'),
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    AngularFirestoreModule,
    //FirebaseAdminModule
  ],
  declarations: [
    AppComponent,
    NotFoundComponent,
    WebcamComponent,
    HeaderComponent
  ],
  providers: [SearchCardService, WebcamService],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(router: Router) {
    // Use a custom replacer to display function names in the route configs
    // const replacer = (key, value) => (typeof value === 'function') ? value.name : value;

    // console.log('Routes: ', JSON.stringify(router.config, replacer, 2));
  }
}


/**
 * 
 * AppRoutingModule should be last, and def after the other feature modules
 * because they have their own routing modules
 * Have to give the other routers a chance to match within their own modules
 * before ending up at PageNotFound
 * 
 */