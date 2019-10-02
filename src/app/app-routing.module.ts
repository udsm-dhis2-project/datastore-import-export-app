import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { NewComponent } from './new/new.component';
import { DashComponent } from './dash/dash.component';


const routes: Routes = [
  { path: "", component: HomeComponent },
  { path: "new", component: NewComponent },
  { path: "namespace/:name", component: DashComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
