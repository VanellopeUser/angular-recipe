import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
// import { Subscription } from 'rxjs/Subscription';
import { Ingredient } from 'src/app/shared/ingredient.model';

import { ShoppingListService } from '../shopping-list.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  @ViewChild('f') slForm: NgForm;
  subscription: Subscription;
  editMode = false;
  editedItemIndex: number;
  editedItem: Ingredient;

// @Output() ingredientAdded = new EventEmitter<Ingredient>();

  constructor(private slService: ShoppingListService) { }

  ngOnInit(){
    this.subscription = this.slService.startedEditing
    .subscribe(
      (index: number) => {
        this.editedItemIndex = index;
        this.editMode = true;
        this.editedItem = this.slService.getIngredient(index);
        console.log(this.slForm);
        // console.log('hello',this.slForm);
        // alert('hello');
        this.slForm.setValue({
          name: this.editedItem.name,
          amount: this.editedItem.amount
        })
      }
      );
  }

  onSubmit(from: NgForm){
    const value = from.value;
    const newIngredient = new Ingredient(value.name, value.amount);
    // this.ingredientAdded.emit(newIngredient);
    if(this.editMode){
      this.slService.updateIngredient(this.editedItemIndex, newIngredient);
    } else {
      this.slService.addIngredient(newIngredient);
    }
    this.editMode = false;
    from.reset();
  }

  onClear(){
    this.slForm.reset();
    this.editMode = false;
  }

  onDelete(){
    this.slService.deleteIngredient(this.editedItemIndex);
    this.onClear();
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

}
