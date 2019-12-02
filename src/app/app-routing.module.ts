import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { HomeComponent } from "./home/home.component";
import { NewComponent } from "./new/new.component";
import { DashComponent } from "./dash/dash.component";
import { KeyComponent } from "./key/key.component";
import { ImportComponent } from "./import/import.component";

const routes: Routes = [
  { path: "", redirectTo: "home", pathMatch: "full" },
  { path: "new", component: NewComponent },
  { path: "home", component: HomeComponent },
  { path: "import", component: ImportComponent },
  {
    path: "namespace/:name",
    component: DashComponent,
    children: [{ path: ":key", component: KeyComponent }]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule {}
