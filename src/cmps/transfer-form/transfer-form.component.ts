import { Component, OnInit, Input } from '@angular/core'
import { UserService } from 'src/services/user.service'
import { User } from 'src/models/user.model'
import { Friend } from 'src/models/friend.model'
@Component({
  selector: 'transfer-form',
  templateUrl: './transfer-form.component.html',
  styleUrls: ['./transfer-form.component.scss'],
})
export class TransferFormComponent implements OnInit {
  @Input() friend!: Friend
  transferAmount: number | null = null
  amountError: string | null = null
  user: User | null = null
  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.user = this.userService.getLoggedInUser()
  }

  transferFunds() {
    if (!this.transferAmount || !this.user) return
    if (this.transferAmount > this.user?.dollars) {
      this.amountError = 'The entered amount is too high.'
    } else {
      this.userService.transferFunds(
        this.transferAmount,
        this.friend.name,
        this.friend._id
      )
      this.userService.setFriendTransfers(this.friend._id)
      this.transferAmount = null
      this.amountError = null
    }
  }
}
