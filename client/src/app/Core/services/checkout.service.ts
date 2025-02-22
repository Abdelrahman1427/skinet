import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { DeliveryEstimate } from '@stripe/stripe-js';
import { map, of } from 'rxjs';
import { DeliveryMethod } from '../../shared/models/deliveryMethods';

@Injectable({
  providedIn: 'root'
})
export class CheckoutService {
  baseUrl = environment.apiUrl;
  private http = inject(HttpClient);
  deliveryMethods: DeliveryMethod[] =[];
  constructor() { }
  getDeliveryMethod(){
    if(this.deliveryMethods.length > 0) return of(this.deliveryMethods);
    return this.http.get<DeliveryMethod[]>(this.baseUrl + 'payments/delivery-methods').pipe(
      map(methods =>{
        this.deliveryMethods = methods.sort((a,b)=> b.price - a.price);
        return methods;
      })
    )

  }

}
