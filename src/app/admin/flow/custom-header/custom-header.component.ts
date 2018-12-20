import { Component, ViewChild, ElementRef } from '@angular/core';
import { ILoadingOverlayAngularComp } from 'ag-grid-angular';

@Component({
  selector: 'ag-header-component',
  template: `
              <div class="ag-cell-label-container" role="presentation" >
          
          <div ref="eLabel" class="ag-header-cell-label" role="presentation">
          <span *ngIf="params.enableMenu" #menuButton ref="eMenu" class="ag-header-icon" aria-hidden="true" (click)="onMenuClicked($event)"><fa-icon icon="{{params.menuIcon}}"></fa-icon></span>
            <span ref="eText" class="ag-header-cell-text" role="columnheader" style="margin-left:2px">{{params.displayName}}</span>
            <span ref="eSortAsc" class="ag-header-icon " (click)="onSortRequested('asc', $event)" [ngClass]="ascSort"><fa-icon icon="long-arrow-up"></fa-icon></span>
            <span ref="eSortDesc" class="ag-header-icon " (click)="onSortRequested('desc', $event)" [ngClass]="descSort"><fa-icon icon="long-arrow-down"></fa-icon></span>
            <span ref="eSortNone" class="ag-header-icon" (click)="onSortRequested('', $event)" [ngClass]="noSort" ><fa-icon icon="times"></fa-icon></span>
          </div> 
              </div>
    `,
  styles: [
    `
      .ag-theme-material .ag-header-cell {
        line-height: 0pt;
      }
      .customHeaderMenuButton {
        margin-top: 5px;
        margin-left: 4px;
        float: left;
      }

      .customHeaderLabel {
        margin-left: 5px;
        margin-top: 3px;
      }

      .customSortDownLabel {
        float: left;
        margin-left: 10px;
        margin-top: 5px;
      }

      .customSortUpLabel {
        float: left;
        margin-left: 3px;
        margin-top: 4px;
      }

      .customSortRemoveLabel {
        float: left;
        font-size: 11px;
        margin-left: 3px;
        margin-top: 6px;
      }

      .active {
        color: cornflowerblue;
      }
    `
  ]
})
export class CustomHeaderComponent {
  private params: any;

  private ascSort: string;
  private descSort: string;
  private noSort: string;

  @ViewChild('menuButton', { read: ElementRef })
  public menuButton;

  agInit(params): void {
    this.params = params;

    params.column.addEventListener(
      'sortChanged',
      this.onSortChanged.bind(this)
    );
    this.onSortChanged();
  }

  onMenuClicked() {
    this.params.showColumnMenu(this.menuButton.nativeElement);
  }

  onSortChanged() {
    this.ascSort = this.descSort = this.noSort = 'inactive';
    if (this.params.column.isSortAscending()) {
      this.ascSort = 'active';
    } else if (this.params.column.isSortDescending()) {
      this.descSort = 'active';
    } else {
      this.noSort = 'active';
    }
  }

  onSortRequested(order, event) {
    this.params.setSort(order, event.shiftKey);
  }
}
