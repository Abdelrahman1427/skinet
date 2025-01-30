import { Component, inject, OnInit } from '@angular/core';
import { ShopService } from '../../Core/services/shop.service';
import { Product } from '../../shared/models/product';
import { MatCard } from '@angular/material/card';
import {MatDialog} from '@angular/material/dialog';
import { ProductItemComponent } from "./product-item/product-item.component";
 import { FiltersDialogComponent } from './filters-dialog/filters-dialog.component';
import { MatButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
@Component({
  selector: 'app-shop',
  standalone: true,
  imports: [
    MatCard, 
    ProductItemComponent,
    MatButton,
    MatIcon
  ],
  templateUrl: './shop.component.html',
  styleUrl: './shop.component.scss'
})
export class ShopComponent implements OnInit {

  private shopSerivce = inject(ShopService)
  private dialogService = inject(MatDialog)
  products: Product[] = [];
  selectedBrands :string[] = [];
  selectedTypes :string[] = [];

  
  ngOnInit(): void {
    this.initializeShop();
  }

  initializeShop(){
    this.shopSerivce.getBrands();
    this.shopSerivce.getTyped();
    this.shopSerivce.getProduct().subscribe({
      next : response => this.products = response.data,
      error : error => console.log(error),
    })
  }

  openFilterDialog(){
    const dialogRef = this.dialogService.open(FiltersDialogComponent, {
      minWidth: '500px',
      data:{
        selectedBrands :this.selectedBrands,
        slectedTypes: this.selectedTypes
      }
    });
    dialogRef.afterClosed().subscribe({
      next : result =>{
        if(result) {
          console.log(result);
          this.selectedBrands = result.selectedBrands;
          this.selectedTypes  = result.selectedTypes;
        }
      }
    })
  }

}
