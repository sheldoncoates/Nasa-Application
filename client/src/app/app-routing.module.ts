import { NgModule } from '@angular/core';
import { RouterModule, Routes, CanActivate } from '@angular/router';
import { AuthGuard } from './auth-guard.service';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
import { CollectionComponent } from './collection/collection.component';
import { SearchComponent } from './search/search.component';
import { PolicyComponent } from './policy/policy.component';

//how all routing is handled
const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  {path: 'profile', component: ProfileComponent, canActivate: [AuthGuard]},
  {path: 'home', component: HomeComponent},
  {path: 'collection', component: CollectionComponent, canActivate: [AuthGuard]},
  {path: 'search', component: SearchComponent, canActivate: [AuthGuard]},
  {path: 'policy', component: PolicyComponent}
  ];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
