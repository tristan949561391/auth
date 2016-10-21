/**
 * Created by Tristan on 16/10/2.
 */
import { Component } from '@angular/core';
import {RouterModule} from '@angular/router';
@Component({
    selector: '.appliaction',
    templateUrl:'/resource/process/login/template/login.html',
    styleUrls:['resource/process/login/template/login.css'],

})
export class AppComponent {
    username=''
    password=''


    submitRegister(){
        alert(this.username+this.password)
    }
}