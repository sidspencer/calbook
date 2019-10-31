import { Component, OnInit, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Appointment } from '../classes/appointment';
import { CalDate } from '../classes/cal-date';

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
  }

  ngOnInit() {
    
  }

  protected close() {
    console.log('[appointment-editor] called "close()"');
    this.dialogRef.close(0);
  }

  protected save() {
    console.log('[appointment-editor] called "save()"');
    this.dialogRef.close(0);
  }

}
