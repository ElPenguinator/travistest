import { Injectable } from '@angular/core';
import {Router} from "@angular/router";
import {AppConstants} from "../app-constants";
import {ReplaySubject} from "rxjs/ReplaySubject";
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs/Observable";
import {CheckAuthService} from "./check-auth.service";

/**
 * Check Api error response to redirect to login if authentication failed.
 */
@Injectable()
export class UserManagerService {

    /**
     *  GetProjectService constructor.
     */
    public constructor (private httpClient: HttpClient,
                        private checkAuthService: CheckAuthService) {}

    /**
     * Call api GET /api/users/:login service for requested project.
     */
    public get (): Observable<any> {
        const ret = new ReplaySubject<any>(1);
        const userLogin = encodeURIComponent(localStorage.getItem(AppConstants.LOGIN_USER));
        this.httpClient.get(`/api/users/${userLogin}`,
            {
                responseType: 'json'
            }
        ).subscribe((response: any) => {
            ret.next(response);
        }, (error) => {
            this.checkAuthService.check(error);
            ret.next(null);
        });

        return ret.take(1)
    }
}
