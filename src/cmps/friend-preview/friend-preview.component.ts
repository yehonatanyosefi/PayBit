import { Component, OnInit, Input } from '@angular/core'
import { Friend } from 'src/models/friend.model'
@Component({
  selector: 'friend-preview',
  templateUrl: './friend-preview.component.html',
  styleUrls: ['./friend-preview.component.scss'],
})
export class FriendPreviewComponent implements OnInit {
  @Input() friend!: Friend

  ngOnInit(): void {}
}
