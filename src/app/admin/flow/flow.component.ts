import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

import { AppflowService } from '@app/admin/appflow.service';

import { GenderEditorComponent } from '@app/admin/flow/gender-editor/gender-editor.component';

@Component({
  selector: 'aofront-flow',
  templateUrl: './flow.component.html',
  styleUrls: ['./flow.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FlowComponent implements OnInit {
  private frameworkComponents;
  private gridOptions;

  columnDefs = [
    {
      headerName: 'School Year',
      field: 'school_year.label'
    },
    {
      headerName: 'For',
      field: 'applying_for',
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
      children: [
        {
          headerName: 'First Name',
          field: 'student.first_name',

          editable: true
          // onCellValueChanged: ret => {
          //
          // }
        },
        {
          headerName: 'Last Name',
          field: 'student.last_name',
          columnGroupShow: 'open'
        },
        {
          headerName: 'Date of birth',
          field: 'student.dob',
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
      genderEditor: GenderEditorComponent
    };
    this.gridOptions = {
      onCellValueChanged: event => {
        this.appflowService
          .createOrUpdateAppflow(event.data, false)
          .subscribe();
        console.log(event.data);
      }
    };
  }

  ngOnInit() {
    this.rowData = this.appflowService.getAppflows();
  }

  public onRowDataChange(event) {
    // const data = event.data;
  }
}
