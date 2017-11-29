import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {AppConstants} from "../../../app-constants";

/**
 * Represents the top bar logic of the dashboard.
 */
@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.css']
})
export class TopBarComponent {

    /**
     * TopBarComponent constructor.
     * @param {Router} router
     */
    public constructor (private router: Router) {}

    /**
     * Do the logout.
     */
    public doLogout () {
        localStorage.removeItem(AppConstants.ACCESS_COOKIE_NAME);
        localStorage.removeItem(AppConstants.LOGIN_USER);
        // TODO Call logout api service
        this.router.navigate(['login'])
    }

}
