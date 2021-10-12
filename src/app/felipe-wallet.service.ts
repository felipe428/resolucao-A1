import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

interface USDeEUR {
  time: {
    updated: string;
  };
  bpi: {
    USD: {
      symbol: string;
      rate_float: number;
    };
    EUR: {
      symbol: string;
      rate_float: number;
    };
  };
}

interface BRL {
  bpi: {
    BRL: {
      rate_float: number;
    };
  };
}

@Injectable()
export class FelipeWalletService {
  USDeEURlist: Array<USDeEUR> = [];
  BRLlist: Array<BRL> = [];

  bitcoins: number = 0;

  dif: number = 0;

  constructor(private http: HttpClient) {
    this.updateBitcoinRates();
    setInterval(() => {
      this.updateBitcoinRates();
    }, 60000);
  }

  updateBitcoinRates() {
    this.http
      .get<USDeEUR>('https://api.coindesk.com/v1/bpi/currentprice.json')
      .subscribe((data) => {
        if (this.USDeEURlist.length > 0) {
          let length = this.USDeEURlist.length;
          this.dif =
            data.bpi.USD.rate_float -
            this.USDeEURlist[length - 1].bpi.USD.rate_float;
        }
        this.USDeEURlist.push(data);
      });

    this.http
      .get<BRL>('https://api.coindesk.com/v1/bpi/currentprice/BRL.json')
      .subscribe((data) => {
        this.BRLlist.push(data);
      });
  }

  addBitcoins(value: number) {
    let length = this.BRLlist.length;
    if (this.BRLlist.length > 0) {
      let btc = value / this.BRLlist[length].bpi.BRL.rate_float;
      this.bitcoins += btc;
    }
  }

  removeBitcoins(value: number) {
    let length = this.BRLlist.length;
    if (length > 0) {
      let btc = value / this.BRLlist[length].bpi.BRL.rate_float;
      this.bitcoins -= btc;
    }
  }

  getBTCinUSD() {
    let length = this.USDeEURlist.length;
    if (length > 0) {
      return this.bitcoins * this.USDeEURlist[length - 1].bpi.USD.rate_float;
    } else {
      return 0;
    }
  }

  getBTCinEUR() {
    let length = this.USDeEURlist.length;
    if (length > 0) {
      return this.bitcoins * this.USDeEURlist[length - 1].bpi.EUR.rate_float;
    } else {
      return 0;
    }
  }

  getBTCinBRL() {
    let length = this.BRLlist.length;
    if (length > 0) {
      return this.bitcoins * this.BRLlist[length - 1].bpi.BRL.rate_float;
    } else {
      return 0;
    }
  }
}
