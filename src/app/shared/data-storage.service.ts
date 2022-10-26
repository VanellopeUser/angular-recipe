import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Recipe } from "../recipes/recipe.model";
import { exhaustMap, map, take, tap } from "rxjs/operators";
import { RecipeService } from "../recipes/recipe.service";
import { AuthService } from "../auth/auth.service";

@Injectable({ providedIn: 'root' })
export class DataStorageService {
    constructor(private http: HttpClient, private recipeService: RecipeService, private authService: AuthService) { }

    storeRecipe() {
        const recipes = this.recipeService.getRecipes();
        this.http
            .put('https://recipe-book-angular-be22a-default-rtdb.asia-southeast1.firebasedatabase.app/recipes.json', recipes)
            .subscribe(response => {
                console.log(response)
            });
    }

    fetchRecipes() {
        
                // console.log('user.token ', user.token)
                // console.log('user.token ', user)
                // console.log('user.token ', user.email)
                return this.http
                    .get<Recipe[]>('https://recipe-book-angular-be22a-default-rtdb.asia-southeast1.firebasedatabase.app/recipes.json',
                        
                    )
                    .pipe(
            map(recipes => {
                // console.log('hello 1',recipes);
                return recipes.map(recipe => {
                    return {
                        ...recipe,
                        ingredients: recipe.ingredients ? recipe.ingredients : []
                    };
                });
            }),
            tap(recipes => {
                // console.log('hello 2')
                this.recipeService.setRecipes(recipes);
            })
        );

    }

}