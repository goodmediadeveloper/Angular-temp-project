import {Directive, HostBinding, HostListener} from '@angular/core';

@Directive({
  selector: '[wfDropdown2]'
})

export class Dropdown2Directive {
  @HostBinding('class.show') isOpen = false;

  @HostListener('click') onClick() {
    this.isOpen = !this.isOpen;
  }
}
