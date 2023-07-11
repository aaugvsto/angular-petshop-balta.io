import { ToastrService } from 'ngx-toastr';
import { CartUtil } from './../../../utils/cart.util';
import { Component, Input, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product.model';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html'
})
  
export class ProductCardComponent implements OnInit{
  @Input() product!: Product;
  
  constructor(
    private toastr: ToastrService
  ) { }

  addToCart(): void {
    CartUtil.add(
      this.product._id,
      this.product.title,
      1,
      this.product.price,
      this.product.images
    );

    this.toastr.success('Item adicionado ao carrinho!');
  }

  ngOnInit(): void {
  }

}
