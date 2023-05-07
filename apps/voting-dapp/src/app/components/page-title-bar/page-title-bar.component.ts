import {ChangeDetectionStrategy, Component, EventEmitter, Input, Output,} from '@angular/core';
import {MatSlideToggleChange} from "@angular/material/slide-toggle";
import {MatSelectChange} from "@angular/material/select";
import {LanguageService} from "../../language.service";

@Component({
  selector: 'voting-dapp-page-title-bar',
  templateUrl: './page-title-bar.component.html',
  styleUrls: ['./page-title-bar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PageTitleBarComponent {
  @Input()
  title?: string;

  @Input()
  actionButtonText?: string;

  @Input()
  action2ButtonText?: string = '';

  @Output()
  actionButtonClickedEvent: EventEmitter<void> = new EventEmitter<void>();

  @Output()
  action2ButtonClickedEvent: EventEmitter<void> = new EventEmitter<void>();

  constructor(
    public language: LanguageService
  ) {
  }

  accessibilityChange($event: MatSlideToggleChange) {
    if ($event.checked) {
      (window as any).accessibilityMode = true;
    } else {
      (window as any).accessibilityMode = false;
    }
  }

  changeLanguage($event: MatSelectChange) {
    this.language.changeLanguage($event.value);
  }

  getAccessibility() {
    return (window as any).accessibilityMode;
  }
}
