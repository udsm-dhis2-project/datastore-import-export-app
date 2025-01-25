import { AfterViewInit, Component, OnInit } from "@angular/core";
import { NgDhis2ShellWrapper } from "@iapps/ng-dhis2-shell";
import { ComponentPortal } from "@angular/cdk/portal";

@Component({
  selector: "app-root",
  template: '<ng-dhis2-shell (shellHasLoaded)="onReady()"></ng-dhis2-shell>',
  styleUrl: "./app.component.css",
})
export class AppComponent extends NgDhis2ShellWrapper {
  override componentPortal: ComponentPortal<any> = new ComponentPortal(
    AppComponentContent
  );
}

@Component({
  selector: "app-root-content",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponentContent {}
