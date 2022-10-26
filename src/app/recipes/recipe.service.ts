import { Injectable } from "@angular/core";
import { Subject } from "rxjs";

import { Ingredient } from "../shared/ingredient.model";
import { ShoppingListService } from "../shopping-list/shopping-list.service";
import { Recipe } from "./recipe.model";

@Injectable()
export class RecipeService {
  recipeChanged = new Subject<Recipe[]>();
    

    // private recipes: Recipe[] = [
    //     new Recipe('Simple Cookies',
    //     'This is simply a test',
    //     'assets/img/cookies.png',
    //     [
    //       new Ingredient('Choclate chip', 3),
    //       new Ingredient('Brown sugar', 2)
    //     ]),
    //     new Recipe('Caramel Croissant',
    //     'This is simply a test'
    //     ,'/assets/img/c.png',
    //     [
    //       new Ingredient('Caramel', 3),
    //       new Ingredient('Dough',2)
    //     ])
    //   ];

      private recipes: Recipe[] = [];

      constructor(private slService: ShoppingListService){}

      setRecipes(recipe: Recipe[]) {
        this.recipes = recipe;
        this.recipeChanged.next(this.recipes.slice());
        // console.log(this.recipes);
      }

      getRecipes() {
        return this.recipes.slice();
      }

      getRecipe(index: number){
        // console.log(index);
        return this.recipes[index];
      }

      addIngredientsToShoppingList(ingredients: Ingredient[]){
        this.slService.addIngredients(ingredients);
      }

      addRecipe(recipe: Recipe) {
        this.recipes.push(recipe);
        this.recipeChanged.next(this.recipes.slice());
      }

      updateRecipe(index: number, newRecipe: Recipe){
        this.recipes[index] = newRecipe;
        this.recipeChanged.next(this.recipes.slice());
      }

      deleteRecipe(index: number){
        this.recipes.splice(index, 1);
        this.recipeChanged.next(this.recipes.slice());
      }
    }