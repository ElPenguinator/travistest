import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from '@angular/router';
import { Observable } from 'rxjs/Observable';
import {AppConstants} from "../../app-constants";
import {Subject} from "rxjs/Subject";
import {ReplaySubject} from "rxjs/ReplaySubject";

/**
 * Check if a user is not login.
 */
@Injectable()
export class UnAuthGuard implements CanActivate {

    /**
     * UnAuthGuard constructor.
     * @param {Router} router
     */
    public constructor (private router: Router) {}

    /**
     * Check if a user is not login, else redirection to /dashboard.
     * @param {ActivatedRouteSnapshot} next
     * @param {RouterStateSnapshot} state
     * @return {Observable<boolean> | Promise<boolean> | boolean}
     */
    public canActivate(next: ActivatedRouteSnapshot,
                       state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

        const token = localStorage.getItem(AppConstants.ACCESS_COOKIE_NAME);

        let canActivateResult: Subject<boolean> = new ReplaySubject(1);

        if (typeof token === typeof ''){
            this.router.navigate(['dashboard']);
            canActivateResult.next(false);
        }
        else {
            canActivateResult.next(true);
        }

        return canActivateResult;
    }
}
