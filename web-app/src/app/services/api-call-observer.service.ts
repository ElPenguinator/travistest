import { Injectable } from '@angular/core';
import {Router} from "@angular/router";
import {AppConstants} from "../app-constants";
import {Subject} from "rxjs/Subject";

/**
 * Check Api error response to redirect to login if authentication failed.
 */
@Injectable()
export class ApiCallingObserverService {

    public updateListProject: Subject<boolean>;

    /**
     * ApiCallingObserverService constructor.
     */
    public constructor () {
        this.updateListProject = new Subject<boolean>();
    }

}
