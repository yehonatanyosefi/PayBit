import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { FriendFilterComponent } from '../cmps/friend-filter/friend-filter.component';
import { FriendListComponent } from '../cmps/friend-list/friend-list.component';
import { FriendPreviewComponent } from '../cmps/friend-preview/friend-preview.component';
import { AppHeaderComponent } from '../cmps/app-header/app-header.component';
import { SvgIconComponent } from '../cmps/svg-icon/svg-icon.component';
import { TransferListComponent } from '../cmps/transfer-list/transfer-list.component';
import { TransferPreviewComponent } from '../cmps/transfer-preview/transfer-preview.component';
import { TransferFormComponent } from '../cmps/transfer-form/transfer-form.component';

import { FriendEditComponent } from '../views/friend-edit/friend-edit.component';
import { FriendDetailsComponent } from '../views/friend-details/friend-details.component';
import { FriendIndexComponent } from '../views/friend-index/friend-index.component';
import { HomeComponent } from '../views/home/home.component';
import { AboutComponent } from '../views/about/about.component';
import { StatisticsComponent } from '../views/statistics/statistics.component';
import { AuthComponent } from 'src/views/auth/auth.component';

@NgModule({
  declarations: [
    AppComponent,
    FriendFilterComponent,
    FriendListComponent,
    FriendPreviewComponent,
    FriendEditComponent,
    FriendDetailsComponent,
    FriendIndexComponent,
    HomeComponent,
    AboutComponent,
    StatisticsComponent,
    AppHeaderComponent,
    SvgIconComponent,
    TransferListComponent,
    TransferPreviewComponent,
    TransferFormComponent,
    AuthComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    CommonModule,
    HttpClientModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
