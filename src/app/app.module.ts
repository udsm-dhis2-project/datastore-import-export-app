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


const appRoutes: Routes = [
  { path: "", component: HomeComponent },
  { path: "new", component: NewComponent },
  { path: "namespace/:name", component: DashComponent },
  { path: "namespace/:name/:key", component: DashComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    NamespacesComponent,
    NewComponent,
    DashComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgxJsonViewerModule,
    FormsModule,
    StoreModule.forRoot({}),
    RouterModule.forRoot(appRoutes)
  ],
  providers: [EventEmmiterService],
  bootstrap: [AppComponent]
})
export class AppModule {}
