import {Component, Input} from '@angular/core';

@Component({
  selector: 'wf-currency-card',
  templateUrl: './currency-card.component.html',
  styleUrls: ['./currency-card.component.sass']
})
export class CurrencyCardComponent {

  @Input() currency: any;
  currencies: string[] = ['USD', 'EUR'];

}
