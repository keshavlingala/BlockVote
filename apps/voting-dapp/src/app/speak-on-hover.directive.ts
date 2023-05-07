import {Directive, ElementRef, HostListener, Input, Renderer2} from '@angular/core';

@Directive({
  // eslint-disable-next-line @angular-eslint/directive-selector
  selector: '[accessibility]'
})
export class SpeakOnHoverDirective {
  @Input() text: string;
  speechSynthesis: SpeechSynthesis = window.speechSynthesis

  constructor(private elementRef: ElementRef, private renderer: Renderer2) {
  }

  @HostListener('mouseenter')
  async onMouseEnter() {
    if ((window as any).accessibilityMode) {
      const message = new SpeechSynthesisUtterance(this.text ? this.text : this.elementRef.nativeElement.innerText);
      message.voice = speechSynthesis.getVoices().find(voice => voice.name === 'Google US English');
      this.speechSynthesis.speak(message);
    }
  }

  @HostListener('mouseleave')
  async onMouseLeave() {
    if ((window as any).accessibilityMode) {
      this.speechSynthesis.cancel();
    }
  }


}
