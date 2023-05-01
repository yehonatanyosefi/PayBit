import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FriendEditComponent } from '../views/friend-edit/friend-edit.component';
import { FriendDetailsComponent } from '../views/friend-details/friend-details.component';
import { FriendIndexComponent } from '../views/friend-index/friend-index.component';
import { HomeComponent } from '../views/home/home.component';
import { AboutComponent } from '../views/about/about.component';
import { StatisticsComponent } from '../views/statistics/statistics.component';
import { AuthComponent } from '../views/auth/auth.component';
import { friendResolver } from '../services/friend.resolver';
import { authGuard } from '../guards/auth-guard';
const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent, canActivate: [authGuard] },
  { path: 'auth', component: AuthComponent },
  { path: 'about', component: AboutComponent, canActivate: [authGuard] },
  {
    path: 'statistics',
    component: StatisticsComponent,
    canActivate: [authGuard],
  },
  {
    path: 'friend/edit/:id',
    component: FriendEditComponent,
    resolve: { friend: friendResolver },
    canActivate: [authGuard],
  },
  {
    path: 'friend/edit',
    component: FriendEditComponent,
    canActivate: [authGuard],
  },
  {
    path: 'friend/:id',
    component: FriendDetailsComponent,
    resolve: { friend: friendResolver },
    canActivate: [authGuard],
  },
  { path: 'friend', component: FriendIndexComponent, canActivate: [authGuard] },
  { path: '**', redirectTo: 'home' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
