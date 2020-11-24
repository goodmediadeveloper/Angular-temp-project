import {Component, Input, OnInit} from '@angular/core';
import {BillModel} from "../../shared/models/bill.model";

@Component({
  selector: 'wf-bill-card',
  templateUrl: './bill-card.component.html',
  styleUrls: ['./bill-card.component.sass']
})
export class BillCardComponent implements OnInit {

  @Input() bill: BillModel;
  @Input() currency: any;

  usd: number;
  eur: number;

  constructor() { }

  ngOnInit(): void {
    const { rates } = this.currency;
    this.usd = rates['USD'] * this.bill.value;
    this.eur = rates['EUR'] * this.bill.value;
  }

}
