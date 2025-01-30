import { Component, inject, OnInit } from '@angular/core';
import { ShopService } from '../../Core/services/shop.service';
import { Product } from '../../shared/models/product';
import { MatCard } from '@angular/material/card';
import {MatDialog} from '@angular/material/dialog';
import { ProductItemComponent } from "./product-item/product-item.component";
 import { FiltersDialogComponent } from './filters-dialog/filters-dialog.component';
import { MatButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatPaginator, PageEvent } from '@angular/material/paginator';

import { MatMenu, MatMenuTrigger } from '@angular/material/menu';
import { MatListOption, MatSelectionList, MatSelectionListChange } from '@angular/material/list';
import { ShopParams } from '../../shared/models/shopParams';
import { Pagination } from '../../shared/models/Pagination';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-shop',
  standalone: true,
  imports: [
    MatCard, 
    ProductItemComponent,
    MatButton,
    MatIcon,
    MatMenu,
    MatSelectionList,
    MatListOption,
    MatMenuTrigger,
    MatPaginator,
    FormsModule
  ],
  templateUrl: './shop.component.html',
  styleUrl: './shop.component.scss'
})
export class ShopComponent implements OnInit {

  private shopSerivce = inject(ShopService)
  private dialogService = inject(MatDialog)
  products?: Pagination<Product>;

  sortOptions =[
    { name: 'Alphabetical' , value:'name'},
    { name: 'Price: Low-High' , value:'priceAsc'},
    { name:'Price: High-Low', value:'priceDesc' }
  ]
  shopParams =new ShopParams;
  pageSizeOptions =[5 , 10 , 15 ,20]
  ngOnInit(): void {
    this.initializeShop();
  }

  initializeShop(){
    this.shopSerivce.getBrands();
    this.shopSerivce.getTyped();
    this.getProduct();
  }

  getProduct(){
    this.shopSerivce.getProduct(this.shopParams).subscribe({
      next : response => this.products = response,
      error : error => console.log(error),
    })
  }

  onSearchChange(){
    this.shopParams.pageNumber =1; 
    this.getProduct();
  }

  handlePageEvent(event: PageEvent) {
    this.shopParams.pageNumber = event.pageIndex + 1;
    this.shopParams.pageSize = event.pageSize;
    this.getProduct();
  }

  onSortChange(event: MatSelectionListChange) {
    const selectedOption = event.options[0];
    if(selectedOption){
      this.shopParams.sort = selectedOption.value;
      this.shopParams.pageNumber =1;
      this.getProduct(); 
    }
  }
  openFilterDialog(){
    const dialogRef = this.dialogService.open(FiltersDialogComponent, {
      minWidth: '500px',
      data:{
        selectedBrands :this.shopParams.brands,
        selectedTypes: this.shopParams.types
      }
    });
    dialogRef.afterClosed().subscribe({
      next : result =>{
        if(result) {
          console.log(result);
          this.shopParams.brands = result.selectedBrands;
          this.shopParams.types  = result.selectedTypes;
          this.shopParams.pageNumber = 1;
          this.getProduct();
        }
      }
    })
  }

}
