import {
  AfterViewInit,
  Component,
  Input,
  ViewChild,
  ViewContainerRef
} from '@angular/core';

import { ICellEditorAngularComp } from 'ag-grid-angular';

@Component({
  selector: 'editor-cell',
  template: `
        <div #container class="gender" tabindex="0" (keydown)="onKeyDown($event)">
          <button (click)="onClick('M')" [ngClass]="{'selected' : male, 'default' : !male}">Male</button>
          <button (click)="onClick('F')" [ngClass]="{'selected' : female, 'default' : !female}">Female</button>
          <button (click)="onClick('X')" [ngClass]="{'selected' : nonbinary, 'default' : !nonbinary}">N/A</button>
            
        </div>
    `,
  styles: [
    `
      .gender {
        border-radius: 15px;
        border: 1px solid grey;
        background: #e6e6e6;
        padding: 15px;
        text-align: center;
        display: inline-block;
        outline: none;
      }

      .default {
        padding-left: 10px;
        padding-right: 10px;
        border: 1px solid transparent;
        padding: 4px;
      }

      .selected {
        padding-left: 10px;
        padding-right: 10px;
        border: 1px solid lightgreen;
        padding: 4px;
      }
    `
  ]
})
export class GenderEditorComponent
  implements ICellEditorAngularComp, AfterViewInit {
  private params: any;

  @ViewChild('container', { read: ViewContainerRef })
  public container;
  public gender = 'X';

  @Input()
  public male = false;

  @Input()
  public female = false;

  @Input()
  public nonbinary = false;

  // dont use afterGuiAttached for post gui events - hook into ngAfterViewInit instead for this
  ngAfterViewInit() {
    setTimeout(() => {
      this.container.element.nativeElement.focus();
    });
  }

  agInit(params: any): void {
    this.params = params;
    if (params.value === 'M') this.male = true;
    if (params.value === 'F') this.female = true;
    if (params.value === 'X') this.nonbinary = true;
  }

  getValue(): any {
    return this.params.value;
  }

  isPopup(): boolean {
    return true;
  }

  onClick(str: string) {
    this.params.value = str;
    this.params.api.stopEditing();
  }

  onKeyDown(event): void {
    const key = event.which || event.keyCode;
    if (key === 77) {
      this.params.value = 'M';
    } else if (key === 70) {
      this.params.value = 'F';
    } else if (key === 78) {
      this.params.value = 'X';
    }
    event.stopPropagation();
    this.params.api.stopEditing();
  }
}
