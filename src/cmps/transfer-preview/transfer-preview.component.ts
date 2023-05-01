import { Component, Input } from '@angular/core';
import { Transfer } from 'src/models/transfer.model';
import { Move } from 'src/models/user.model';
@Component({
  selector: 'transfer-preview',
  templateUrl: './transfer-preview.component.html',
  styleUrls: ['./transfer-preview.component.scss'],
})
export class TransferPreviewComponent {
  @Input() transfer!: Move;
}
