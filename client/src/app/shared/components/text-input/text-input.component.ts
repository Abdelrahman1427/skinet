import { Component, Input, Self } from '@angular/core';
import { ControlValueAccessor, FormControl, NgControl, ReactiveFormsModule } from '@angular/forms';
import { MatError, MatFormField, MatInput, MatLabel } from '@angular/material/input';

@Component({
  selector: 'app-text-input',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormField,
    MatInput,
    MatError,
    MatLabel
  ],
  templateUrl: './text-input.component.html',
  styleUrl: './text-input.component.scss'
})
export class TextInputComponent implements ControlValueAccessor {
 @Input() label ='';
 @Input() type ='text';

  constructor(@Self() public controlDir: NgControl){
    this.controlDir.valueAccessor =this;
  }
  writeValue(obj: any): void {
  }
  registerOnChange(fn: any): void {
  }
  registerOnTouched(fn: any): void {
  }

  get control(){
    return this.controlDir.control as FormControl
  }
}
// ControlValueAccessor -> make the component work as input in reactive form
// NgControl -> link the component with FormControl 
// @self() -> ensures that NgControl is only retrieved from the current FormControl and not inherited from any ancestor components or directives