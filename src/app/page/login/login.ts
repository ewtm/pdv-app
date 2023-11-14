export class Login {
   name: string;
   id: number;
   price: any;
   active: any;

    constructor(id: number, name: string, price: any, active: any) {
        this.id = id;
        this.name = name;
        this.price = price;
        this.active = active;
    }
}
