import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private cartItems = new BehaviorSubject<any[]>([]);
  cartItems$ = this.cartItems.asObservable();

  addToCart(item: any): void {
    const currentItems = this.cartItems.value;

    // Check if the item already exists in the cart by comparing unique properties (e.g., `id`)
    const existingItem = currentItems.find(
      (cartItem) => cartItem.id === item.id
    );

    if (existingItem) {
      // If the item exists, show a prompt asking if the user wants to add more
      if (
        confirm(
          'This product is already in your cart. Do you want to add another?'
        )
      ) {
        // Increment the count of the existing product
        existingItem.count++;
        this.cartItems.next([...currentItems]); // Emit the updated array
      }
    } else {
      // If the item doesn't exist in the cart, add it as a new item
      item.count = 1; // Set the default count to 1 for the new item
      const updatedItems = [...currentItems, item]; // Add the new item to the array
      this.cartItems.next(updatedItems); // Emit the updated array
    }
  }
}
