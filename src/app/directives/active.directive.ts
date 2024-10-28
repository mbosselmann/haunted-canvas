import { Directive, HostBinding, Input } from '@angular/core';

@Directive({
  selector: '[appActive]',
  standalone: true,
})
export class ActiveDirective {
  @Input('appActive')
  isActive = false;

  @HostBinding('class.active')
  get active() {
    return this.isActive;
  }
}
