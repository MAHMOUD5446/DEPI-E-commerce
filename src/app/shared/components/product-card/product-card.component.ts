import {
  Component,
  OnInit,
  Input,
  EventEmitter,
  Output,
  ViewChild,
  ElementRef,
} from '@angular/core';
import { CartService } from '../../../cart-service.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss'],
})
export class ProductCardComponent implements OnInit {
  @Input() product: any;
  @Input() showOverlay: boolean = false;
  @Output() item = new EventEmitter();

  quantity: number = 1; // Initialized to 1
  showBtn: boolean = false;

  constructor(private cartService: CartService, private router: Router) {}

  ngOnInit(): void {}

  getStars(rating: number): (boolean | null)[] {
    return Array.from({ length: 5 }, (_, index) => {
      if (rating >= index + 1) return true;
      if (rating >= index + 0.5) return null;
      return false;
    });
  }

  addToCart(product: any) {
    this.cartService.addToCart({
      image: this.product.image,
      name: this.product.name,
      id: this.product.id,
      price: Math.floor(this.product.price),
    });
  }
}
