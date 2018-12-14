import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

import { AppflowService } from '@app/admin/appflow.service';

@Component({
  selector: 'aofront-flow',
  templateUrl: './flow.component.html',
  styleUrls: ['./flow.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FlowComponent implements OnInit {
  columnDefs = [
    {
      headerName: 'Student',
      children: [
        {
          headerName: 'First Name',
          field: 'student.first_name',

          editable: true,
          onCellValueChanged: ret => {
            this.appflowService
              .createOrUpdateAppflow(ret.data, false)
              .subscribe();
            console.log(ret);
          }
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
          headerName: 'Age',
          field: 'student_age_months',
          columnGroupShow: 'open'
        }
      ]
    },
    { headerName: 'Complete', field: 'complete' }
  ];

  rowData: any;

  constructor(private appflowService: AppflowService) {}

  ngOnInit() {
    this.rowData = this.appflowService.getAppflows();
  }
}
