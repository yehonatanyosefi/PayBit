import { Component } from '@angular/core'
import { FriendService } from 'src/services/friend.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'PayBit'
  constructor(private friendService: FriendService) {}

  ngOnInit() {
    this.friendService.loadFriends().subscribe({
      error: (err) => console.log('err:', err),
    })
  }
}
