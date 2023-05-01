import { Component, Input } from '@angular/core'
import { Transfer } from 'src/models/transfer.model'
import { Move } from 'src/models/user.model'
@Component({
  selector: 'transfer-list',
  templateUrl: './transfer-list.component.html',
  styleUrls: ['./transfer-list.component.scss'],
})
export class TransferListComponent {
  @Input() transfers!: Move[]
  constructor() {}
  trackByTransferAt(index: number, transfer: Move): string | undefined {
    return transfer.at.toString()
  }
}
