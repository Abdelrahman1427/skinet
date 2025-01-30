import { Component, inject } from '@angular/core';
import { ShopService } from '../../../Core/services/shop.service';
import { MatDivider } from '@angular/material/divider'
import { MatSelectionList, MatListOption } from '@angular/material/list'
import { MatButton } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
@Component({
  selector: 'app-filters-dialog',
  standalone: true,
  imports: [
      MatDivider,
      MatSelectionList,
      MatListOption,
      MatButton
  ],
  templateUrl: './filters-dialog.component.html',
  styleUrl: './filters-dialog.component.scss'
})
export class FiltersDialogComponent {
  shopService =inject(ShopService)

  private dialogRef = inject(MatDialogRef<FiltersDialogComponent>);
  data = inject(MAT_DIALOG_DATA);

  selectedBrands: String[] = this.data.selectedBrands;
  selectedTypes : String [] = this.data.selectedTypes;

  applyFilters(){
    this.dialogRef.close({
      selectedBrands : this.selectedBrands,
      selectedTypes: this.selectedTypes
    })
  }
}
