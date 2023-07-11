import { Security } from '../utils/security.util';
import { Product } from './../models/product.model';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class DataService {

    constructor(public http: HttpClient) { }

    private baseUrl: String = 'http://localhost:3000/v1/'

    composeHeaders() {
        const token = Security.getToken();
        const headers = new HttpHeaders().set('Authorization', 'Bearer ' + token);
        return headers;
    }

    getProducts() {
        return this.http.get<Product[]>(this.baseUrl + 'products')
    }

    authenticate(data: any) {
        return this.http.post(this.baseUrl + 'accounts/authenticate', data)
    }

    refreshToken() {
        return this.http.post(this.baseUrl + 'accounts/refresh-token', null, { headers: this.composeHeaders() })
    }
    
    create(value: any) {
        return this.http.post(this.baseUrl + 'accounts', value)
    }

    resetPassword(value: any) {
        return this.http.post(this.baseUrl + 'accounts/reset-password', value)
    }

    getProfile(data: any) {
        return this.http.get(`${this.baseUrl}/accounts`, { headers: this.composeHeaders() })
    }

    updateProfile(data: any) {
        return this.http.put(`${this.baseUrl}/accounts`, data, { headers: this.composeHeaders() })
    }
}