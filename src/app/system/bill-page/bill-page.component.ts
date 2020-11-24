import {Component, OnDestroy, OnInit} from '@angular/core';
import {BillService} from '../shared/services/bill.service';
import {Observable, Subscription} from 'rxjs';
import {timer, combineLatest} from 'rxjs';
import {BillModel} from '../shared/models/bill.model';
import {delay} from "rxjs/operators";

@Component({
  selector: 'wf-bill-page',
  templateUrl: './bill-page.component.html',
  styleUrls: ['./bill-page.component.sass']
})
export class BillPageComponent implements OnInit, OnDestroy {

  private subscription1: Subscription;
  private subscription2: Subscription;
  currency: any;
  bill: BillModel;

  isLoaded = false;

  constructor(private billService: BillService) {
  }

  ngOnInit(): void {
    this.subscription1 = combineLatest(
      this.billService.getBill(),
      this.billService.getCurrency()
    ).subscribe((data: [BillModel, any]) => {
      this.bill = data[0];
      this.currency = data[1];
      this.isLoaded = true;
    });
  }

  onRefresh() {
    this.isLoaded = false;
    this.subscription2 = this.billService.getCurrency()
      .pipe(delay(2000))
      .subscribe((currency: any) => {
        this.currency = currency
      });
    this.isLoaded = true;
  }

  ngOnDestroy() {
    this.subscription1.unsubscribe();
    if (this.subscription2) this.subscription2.unsubscribe();
  }


}

