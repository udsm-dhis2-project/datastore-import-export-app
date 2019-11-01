import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";
import { FormsModule } from "@angular/forms";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { NamespacesComponent } from "./namespaces/namespaces.component";
//import { Routes, RouterModule } from "@angular/router";
import { NewComponent } from "./new/new.component";
import { DashComponent } from "./dash/dash.component";
import { TooltipModule } from "ng2-tooltip-directive";

import { StoreModule } from "@ngrx/store";
import { HomeComponent } from "./home/home.component";
import { EventEmmiterService } from "./event-emmiter.service";
import { NgxJsonViewerModule } from "ngx-json-viewer";
import { KeyComponent } from "./key/key.component";
import { NgxDhis2HttpClientModule } from "@iapps/ngx-dhis2-http-client";
import { NgxPaginationModule } from "ngx-pagination";
import { AceEditorModule } from "ng2-ace-editor";
import { FilterPipeModule } from "ngx-filter-pipe";
import { ImportComponent } from "./import/import.component";
import { ErrorComponent } from "./error/error.component";

@NgModule({
  declarations: [
    AppComponent,
    NamespacesComponent,
    NewComponent,
    DashComponent,
    HomeComponent,
    KeyComponent,
    ImportComponent,
    ErrorComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgxJsonViewerModule,
    FormsModule,
    NgxPaginationModule,
    AceEditorModule,
    FilterPipeModule,
    TooltipModule,
    StoreModule.forRoot({}),
    NgxDhis2HttpClientModule.forRoot({
      namespace: "iapps",
      version: 1,
      models: {}
    })
    // RouterModule.forRoot(appRoutes)
  ],
  providers: [EventEmmiterService],
  bootstrap: [AppComponent]
})
export class AppModule {}
