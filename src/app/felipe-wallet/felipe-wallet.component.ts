import { Component, OnInit } from '@angular/core';
import { FelipeWalletService } from '../felipe-wallet.service';

@Component({
  selector: 'app-felipe-wallet',
  templateUrl: './felipe-wallet.component.html',
  styleUrls: ['./felipe-wallet.component.css'],
})
export class FelipeWalletComponent implements OnInit {
  constructor(public wallet: FelipeWalletService) {}

  ngOnInit() {}
}
