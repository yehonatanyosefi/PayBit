import { Component, Input } from '@angular/core';
import { Friend } from 'src/models/friend.model';

@Component({
  selector: 'friend-list',
  templateUrl: './friend-list.component.html',
  styleUrls: ['./friend-list.component.scss'],
})
export class FriendListComponent {
  @Input() friends!: Friend[] | null;
  trackByFriendId(index: number, friend: Friend): string | undefined {
    return friend._id;
  }
}
