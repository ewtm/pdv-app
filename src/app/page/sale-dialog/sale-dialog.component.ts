import {Component, Inject, OnInit} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PaymentService } from 'src/app/service/payment.service';
import { Payment } from '../payment/payment';

@Component({
  selector: 'app-example-dialog',
  templateUrl: 'sale-dialog.component.html',
})
export class SaleDialogComponent  implements OnInit {
  payments: Payment[] = [];
  troco = 0.0;

  tituloDialog = 'Fechamento de venda';
  nameBtn = 'Confirmar Venda';

  constructor(
    public dialogRef: MatDialogRef<SaleDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private paymentService: PaymentService) {
      this.data.pago=0;
      this.data.payment=null;
      this.calc();
     }

  onCancel(): void {
    this.dialogRef.close();
  }

  ngOnInit(): void {
    this.listPayment();

    if(this.data.comanda) {
      this.tituloDialog = this.data.titulo
      this.nameBtn = this.data.titulo
    }

  }

  listPayment() {
    this.paymentService.findAll().subscribe((response) => {
      this.payments = response;
    });
  }
  calc() {
    this.troco = this.data.pago - this.data.pagar;
    this.data.troco = String(this.troco.toFixed(2));
  }
}
