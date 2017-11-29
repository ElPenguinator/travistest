import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from '@angular/router';
import { Observable } from 'rxjs/Observable';
import {AppConstants} from "../../app-constants";
import {Subject} from "rxjs/Subject";
import {ReplaySubject} from "rxjs/ReplaySubject";

/**
 * Guard which check if the user is login
 */
@Injectable()
export class AuthGuard implements CanActivate {

    /**
     * AuthGuard constructor.
     * @param {Router} router
     */
    public constructor (private router: Router) {}

    /**
     * Check if current user can access to the page.
     * @param {ActivatedRouteSnapshot} next
     * @param {RouterStateSnapshot} state
     * @return {Observable<boolean> | Promise<boolean> | boolean}
     */
    public canActivate(next: ActivatedRouteSnapshot,
                state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

        const token = localStorage.getItem(AppConstants.ACCESS_COOKIE_NAME);

        let canActivateResult: Subject<boolean> = new ReplaySubject(1);

        if (typeof token !== typeof ''){
            this.navigateToLogin (canActivateResult);
        }
        else {
            // TODO call a service to check if token
            canActivateResult.next(true);
        }

        return canActivateResult;
    }

    /**
     * Navigate to login page and call next method of guard result with false.
     * @param {Subject<boolean>} canActivateResult
     */
    private navigateToLogin (canActivateResult: Subject<boolean>) {
        canActivateResult.next(false);
        this.router.navigate(['login']);
    }
}
