export class Sale {

    id: any;
    amount: any;
    amountPaid: any;
    difference: any;
    payment: any;
    mesa: any
    productSolds: any;

    constructor(id: any, amount: any, amountPaid: any, difference: any,
        payment: any,mesa: any ,productSolds: any) {
        this.id = id;
        this.amount = amount;
        this.amountPaid = amountPaid;
        this.difference = difference;
        this.payment = payment;
        this.mesa = mesa
        this.productSolds = productSolds;
    }
}
