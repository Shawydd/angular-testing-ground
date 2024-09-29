import { Component, Input, Output } from '@angular/core';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrl: './test.component.css'
})
export class TestComponent {
  @Input() inpy: any;
  @Output() outy: any;

  isVisible = true

  onInput(event: Event) {
                    // Typecasting - Valore specifico nell'input
    console.log( (<HTMLInputElement>event.target).value )
  }

}
