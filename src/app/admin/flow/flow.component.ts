import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

import { AppflowService } from '@app/admin/appflow.service';

import { GenderEditorComponent } from '@app/admin/flow/gender-editor/gender-editor.component';
import { CustomHeaderComponent } from '@app/admin/flow/custom-header/custom-header.component';

@Component({
  selector: 'aofront-flow',
  templateUrl: './flow.component.html',
  styleUrls: ['./flow.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FlowComponent implements OnInit {
  private frameworkComponents;
  private defaultColDef;
  private gridOptions;

  columnDefs = [
    {
      headerName: 'School Year',
      field: 'school_year.label'
    },
    {
      headerName: 'For',
      field: 'applying_for',
      filter: 'agSetColumnFilter',
      valueFormatter: v => {
        switch (v.value) {
          case -4:
            return 'PS-1';
            break;
          case -3:
            return 'PS-2';
            break;
          case -2:
            return 'PK-3';
            break;
          case -1:
            return 'PK-4';
            break;
          case 0:
            return 'K';
            break;
          case 1:
            return '1st';
            break;
          case 2:
            return '2nd';
            break;
          case 3:
            return '3rd';
            break;
          case 4:
            return '4th';
            break;
          case 5:
            return '5th';
            break;
          case 6:
            return '6th';
            break;
          case 7:
            return '7th';
            break;
          case 8:
            return '8th';
            break;
          default:
            return '';
            break;
        }
      }
    },
    {
      headerName: 'Student',
      groupId: 'student',
      children: [
        {
          headerName: 'Student',

          valueGetter: v => {
            return (
              v.data.student.last_name + ', ' + v.data.student.preferred_name
            );
          },
          columnGroupShow: 'closed'
        },
        {
          headerName: 'First Name',
          field: 'student.first_name',

          editable: true,
          columnGroupShow: 'open'
        },
        {
          headerName: 'Preferred Name',
          field: 'student.preferred_name',

          editable: true,
          columnGroupShow: 'open'
        },
        {
          headerName: 'Middle Name',
          field: 'student.middle_name',

          editable: true,
          columnGroupShow: 'open'
        },
        {
          headerName: 'Last Name',
          field: 'student.last_name',
          editable: true,
          columnGroupShow: 'open'
        },
        {
          headerName: 'Gender',
          field: 'student.gender',
          columnGroupShow: 'open',
          valueFormatter: v => {
            switch (v.value) {
              case 'M':
                return 'Male';
                break;
              case 'F':
                return 'Female';
                break;
              default:
                return 'N/A';
            }
          },
          cellEditor: 'genderEditor',
          editable: true
        },
        {
          headerName: 'Date of birth',
          field: 'student.dob',
          columnGroupShow: 'open',
          editable: true
        },
        {
          headerName: 'Age (months)',
          field: 'student_age_months',
          columnGroupShow: 'open'
        },
        {
          headerName: 'Age (years)',
          field: 'student_age_years',
          columnGroupShow: 'open'
        }
      ]
    },
    {
      headerName: 'Family',
      groupId: 'family',
      children: [
        {
          headerName: 'Family',
          field: 'student.families[0]',
          columnGroupShow: 'both',
          valueGetter: v => {
            return v.data.student.families[0].name;
          }
        },
        {
          headerName: 'Address',
          field: 'student.families[0].address.raw',
          columnGroupShow: 'open',
          valueGetter: v => {
            if (v.data.student.families[0].address) {
              return v.data.student.families[0].address.raw;
            } else return '';
          }
        },
        {
          headerName: 'Parents',
          field: 'student.families[0].parents',
          columnGroupShow: 'open',
          valueGetter: v => {
            if (v.data.student.families[0].parents) {
              let parents = '';
              for (const p of v.data.student.families[0].parents) {
                parents += p.first_name + ' ' + p.last_name + ' ';
              }
              return parents;
            } else return '';
          }
        }
      ]
    },
    {
      headerName: '✓',
      field: 'complete',
      valueFormatter: v => {
        switch (v.value) {
          case true:
            return '✓';
            break;
          default:
            return '';
            break;
        }
      }
    }
  ];

  rowData: any;

  constructor(private appflowService: AppflowService) {
    this.frameworkComponents = {
      genderEditor: GenderEditorComponent,
      agColumnHeader: CustomHeaderComponent
    };
    this.gridOptions = {
      onCellValueChanged: event => {
        this.appflowService
          .createOrUpdateAppflow(event.data, false)
          .subscribe();
        console.log(event.data);
      },
      onFirstDataRendered: event => {
        this.resizeAllColumns(event);
      },
      onColumnGroupOpened: event => {
        this.resizeAllColumns(event);
      }
    };
    this.defaultColDef = {
      width: 100,
      headerComponentParams: { menuIcon: 'bars' }
    };
  }

  private resizeAllColumns(event) {
    const allColumnIds = [];
    event.columnApi.getAllColumns().forEach(function(column) {
      allColumnIds.push(column.colId);
    });
    event.columnApi.autoSizeColumns(allColumnIds);
  }

  public openCloseGroup(name: string) {
    const group = this.gridOptions.columnApi.getColumnGroup(name);
    console.log(group);
    this.gridOptions.columnApi.setColumnGroupOpened(
      group.groupId,
      !group.isExpanded()
    );
  }

  ngOnInit() {
    this.rowData = this.appflowService.getAppflows();
  }

  public onRowDataChange(event) {
    // const data = event.data;
  }
}
