import { Injectable } from '@angular/core';
import {Router} from "@angular/router";
import {AppConstants} from "../app-constants";

/**
 * Check Api error response to redirect to login if authentication failed.
 */
@Injectable()
export class CheckAuthService {

    /**
     * CheckAuthService constructor.
     * @param {Router} router
     */
    public constructor (private router: Router) {}

    /**
     * If returned status code of api service is == 401,
     * remove the known access_token and navigate to login
     * @param apiError
     */
    public check (apiError: any) {
        if (apiError.status === 401) {
            localStorage.removeItem(AppConstants.ACCESS_COOKIE_NAME);
            localStorage.removeItem(AppConstants.LOGIN_USER);
            this.router.navigate(['login']);
        }
    }
}
