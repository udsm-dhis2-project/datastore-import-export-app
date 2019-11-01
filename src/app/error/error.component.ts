import { Component, OnInit, Input } from "@angular/core";
import { errorModule } from "./error.module";

@Component({
  selector: "app-error",
  templateUrl: "./error.component.html",
  styleUrls: ["./error.component.css"]
})
export class ErrorComponent implements OnInit {
  @Input() errorObj: errorModule;

  constructor() {}

  ngOnInit() {}
}
