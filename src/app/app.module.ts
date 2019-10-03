import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";
import { FormsModule } from "@angular/forms";


import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { NamespacesComponent } from "./namespaces/namespaces.component";
import { Routes, RouterModule } from "@angular/router";
import { NewComponent } from "./new/new.component";
import { DashComponent } from "./dash/dash.component";

import { StoreModule } from "@ngrx/store";
import { HomeComponent } from "./home/home.component";
import {EventEmmiterService} from './event-emmiter.service';
import { NgxJsonViewerModule } from 'ngx-json-viewer';
import { KeyComponent } from './key/key.component';
import { NgxDhis2HttpClientModule } from '@iapps/ngx-dhis2-http-client';
import {NgxPaginationModule} from 'ngx-pagination';
import { AceEditorModule } from 'ng2-ace-editor';




/*
const appRoutes: Routes = [
  { path: "", redirectTo:"home", pathMatch:"full" },
  { path: "new", component: NewComponent },
  { path: 'home', component: HomeComponent },
  { path: "namespace/:name", component: DashComponent, children:[
    { path: ":key", component: KeyComponent }
  ]
 
 },
  
];*/

@NgModule({
  declarations: [
    AppComponent,
    NamespacesComponent,
    NewComponent,
    DashComponent,
    HomeComponent,
    KeyComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgxJsonViewerModule,
    FormsModule,
    NgxPaginationModule,
    AceEditorModule,
    StoreModule.forRoot({}),
    NgxDhis2HttpClientModule.forRoot({
      namespace: 'iapps',
      version: 1,
      models: {
 
      }
    })
   // RouterModule.forRoot(appRoutes)
  ],
  providers: [EventEmmiterService],
  bootstrap: [AppComponent]
})
export class AppModule {}
