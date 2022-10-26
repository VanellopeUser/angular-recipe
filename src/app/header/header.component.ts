import { OnDestroy, OnInit } from '@angular/core';
import { Component, EventEmitter, Output  } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { DataStorageService } from '../shared/data-storage.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy{
  collapsed = true;
  isAuthenticated = false;
  private userSub: Subscription;

  constructor(
    private dataStorageService: DataStorageService, 
    private authService: AuthService) {}

  ngOnInit() {
    this.userSub = this.authService.user.subscribe(user => {
      this.isAuthenticated = !!user;
      // console.log(user);
      console.log(!user);
      console.log(!!user);
    });
  }

  onSaveData(){
    this.dataStorageService.storeRecipe();
  }

  onFetchData(){
    // console.log('demon', this.dataStorageService.fetchRecipes().subscribe());
    this.dataStorageService.fetchRecipes().subscribe();
  }

  onLogout(){
    this.authService.logout();
  }

  ngOnDestroy(){
    this.userSub.unsubscribe();
  }
}
// export class HeaderComponent {
  // @Output() featureSelected = new EventEmitter<string>();
  // collapsed = true;

  // onSelect(feature: string){
  //   this.featureSelected.emit(feature);
  // }
// }