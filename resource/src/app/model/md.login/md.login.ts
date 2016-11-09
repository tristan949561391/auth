/**
 * Created by Tristan on 16/11/6.
 */
import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {RouterModule} from "@angular/router";
import {Ng2BootstrapModule} from "ng2-bootstrap/ng2-bootstrap";
import {FormsModule} from "@angular/forms";

import {LoginComponent} from "./cpt.login";
import {RegisterComponent} from "./cpt.register";
import {LoginService} from  '../../service/ser.login'


@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    Ng2BootstrapModule,
    RouterModule.forChild([
      {path: "", component: LoginComponent},
    ])
  ],
  providers: [LoginService]
})
export class LoginModel {
}
