import { Component, OnInit, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Appointment } from '../data-objects/appointment';
import { NumberUtil } from '../util-objects/number-util';
import { DialogResult } from '../data-objects/enums';

@Component({
  selector: 'app-appointment-editor',
  templateUrl: './appointment-editor.component.html',
  styleUrls: ['./appointment-editor.component.scss']
})
export class AppointmentEditorComponent implements OnInit {
  protected appointment: Appointment;
  protected formattedDate: string;

  constructor(protected dialogRef: MatDialogRef<AppointmentEditorComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) {
    this.appointment = this.data as Appointment;
    this.formattedDate = NumberUtil.toUsaDateFormat(this.appointment.calDate);
  }

  ngOnInit() {}

  protected close() {
    console.log('[appointment-editor] called "close()"');
    this.dialogRef.close(DialogResult.Ok);
  }

  protected save() {
    console.log('[appointment-editor] called "save()"');
    this.dialogRef.close(DialogResult.Saved);
  }

}
