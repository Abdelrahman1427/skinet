import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { CartService } from '../services/cart.service';
import { SnacknbarService } from '../services/snackbar.service';

export const emptyCartGuardGuard: CanActivateFn = (route, state) => {
  const cartService = inject(CartService);
  const router = inject(Router);
  const snack =inject(SnacknbarService);

  if(!cartService.cart() || cartService.cart()?.items.length === 0){
    snack.error('Your cart is empty');
    router.navigateByUrl('/cart');
    return false;
  }
  return true;
};
