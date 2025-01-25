import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { HttpClient, HttpClientModule } from "@angular/common/http";
import { FormsModule } from "@angular/forms";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent, AppComponentContent } from "./app.component";
import { NamespacesComponent } from "./namespaces/namespaces.component";
//import { Routes, RouterModule } from "@angular/router";
import { NewComponent } from "./new/new.component";
import { DashComponent } from "./dash/dash.component";
import { TooltipModule } from "ng2-tooltip-directive";

import { StoreModule } from "@ngrx/store";
import { HomeComponent } from "./home/home.component";
import { EventEmmiterService } from "./event-emmiter.service";
import { KeyComponent } from "./key/key.component";
import { NgxDhis2HttpClientModule } from "@iapps/ngx-dhis2-http-client";
import { NgxPaginationModule } from "ngx-pagination";
import { AceEditorModule } from "ng2-ace-editor";
import { ImportComponent } from "./import/import.component";
import { ErrorComponent } from "./error/error.component";
import { NgPipesModule } from "ngx-pipes";
import { AppShellModule } from "@iapps/ng-dhis2-shell";
import { environment } from "src/environments/environment";
import { dataStoreComponents } from "./components";

@NgModule({
  declarations: [
    AppComponent,
    NamespacesComponent,
    NewComponent,
    DashComponent,
    HomeComponent,
    KeyComponent,
    ImportComponent,
    ErrorComponent,
    AppComponentContent,
    ...dataStoreComponents,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    NgxPaginationModule,
    NgPipesModule,
    AceEditorModule,
    TooltipModule,
    BrowserAnimationsModule,
    StoreModule.forRoot({}),
    NgxDhis2HttpClientModule.forRoot({
      namespace: "iapps",
      version: 1,
      models: {},
    }),
    AppShellModule.forRoot({
      pwaEnabled: false,
      isDevMode: !environment.production,
    }),
    // RouterModule.forRoot(appRoutes)
  ],
  providers: [EventEmmiterService],
  bootstrap: [AppComponent],
})
export class AppModule {}
