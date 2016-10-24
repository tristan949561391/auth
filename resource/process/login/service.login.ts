/**
 * Created by Tristan on 16/10/23.
 */
import {Injectable} from '@angular/core';
import {Http} from "@angular/http";
import 'rxjs/add/operator/map';

@Injectable()
export class LoginService {
    private loginUrl = '/login'

    constructor(private http: Http) {
    }

    login(username, password,callbackSuccess, callbackErr) {
        this.http.post(this.loginUrl, {
            username: username,
            password: password
        })
            .map(res=>res.json())
            .subscribe(data=>callbackSuccess(data),error=>callbackErr(error))
    }
}