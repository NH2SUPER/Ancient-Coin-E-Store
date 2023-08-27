import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';

@Injectable({
  providedIn: 'root'
})
export class DialogService {

  constructor(private dialog: MatDialog) { }

  openConfirmDialog(): Promise<boolean> {
    
    const dialogRef = this.dialog.open(ConfirmDialogComponent);

    return dialogRef.afterClosed().toPromise();
  }
}
