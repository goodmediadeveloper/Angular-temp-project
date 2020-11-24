import {Directive, HostBinding, HostListener} from '@angular/core';

@Directive({
  selector: '[wfDropdown]'
})

export class DropdownDirective {
  @HostBinding('class.show') isOpen = false;

  @HostListener('click') onClick() {
    this.isOpen = !this.isOpen;
  }
}
