import { Component, OnInit } from '@angular/core'
import { UserService } from 'src/services/user.service'
import { User } from 'src/models/user.model'
@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  user: User | null = null
  constructor(private userService: UserService) {}
  ngOnInit(): void {
    this.user = this.userService.getLoggedInUser()
  }
}
