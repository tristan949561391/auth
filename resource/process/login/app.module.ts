/**
 * Created by Tristan on 16/10/2.
 */
import {NgModule}      from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';
import {Ng2BootstrapModule} from 'ng2-bootstrap/ng2-bootstrap';

import {LoginCompone}   from './component.login';
import {RegisterComponent} from './component.register'
@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        Ng2BootstrapModule
    ],
    declarations: [LoginCompone,RegisterComponent],
    bootstrap: [LoginCompone]
})
export class AppModule {

}