import { Injectable } from "@angular/core";
import { Router, CanActivate} from "@angular/router";
import { Observable } from "rxjs";
import { Security } from "../utils/security.util";

@Injectable()
export class AuthService implements CanActivate {
    
    constructor(private router: Router) { }

    canActivate(): boolean {
        var token = !Security.getToken()
        if (token) {
            this.router.navigate(['/login'])
            return false
        }

        return true;
    }

}