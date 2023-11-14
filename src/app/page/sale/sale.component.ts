import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ProductService } from 'src/app/service/product.service';
import { SaleService } from 'src/app/service/sale.service';
import { SaleDialogComponent } from '../sale-dialog/sale-dialog.component';
import { ProductSold } from './productSold';
import { Sale } from './sale';
import {ActivatedRoute} from "@angular/router";
@Component({
  selector: 'app-sale',
  templateUrl: './sale.component.html',
  styleUrls: ['./sale.component.css']
})
export class SaleComponent implements OnInit {

  productsSolds: ProductSold[] = [];
  formAddItem: FormGroup;
  //ordem das colunas no html
  ordemColunasTabela = ['id', 'quantity', 'name', 'price', 'priceTotal'];
  totalElementos = 0;
  pagina = 0;
  tamanho = 5;
  pageSizeOptions: number[] = [5, 10, 15, 100]; // [10,20,30] quantidade de item por página
  mensagemErros: String[] = []; //array de strings dos erros retornados do backend
  statusCaixa = "Caixa Livre";
  data: any
  pagar: any;
  id: any;
  sale: any;

  constructor(
    private productService: ProductService,
    private saleService: SaleService,
    private formBilder: FormBuilder,
    private snackBar: MatSnackBar,
    public dialog: MatDialog,
    public router: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.montarFormulario();
    this.id = this.router.snapshot.queryParamMap.get('id');

    if(this.id){
      this.saleService.findById(Number(this.id)).subscribe( res => {
        console.log('res', res)
        this.sale = res;
        this.productsSolds = res.productSolds;
      })
    }
  }

  montarFormulario() {
    this.formAddItem = this.formBilder.group({
      //validando os dados do formulário
      id: [null, [Validators.required, Validators.maxLength(13), Validators.minLength(1)]],
      quantidade: [null, [Validators.required, Validators.maxLength(50)]],
    })
  }

  limparFormulario() {
    this.formAddItem.reset();
    this.productsSolds = [];
    this.statusCaixa = "Caixa Livre";
  }

  openDialog(): void {
    //verificar se existe itens na tabela
    if (this.productsSolds.length <= 0) {
      this.snackBar.open('É necessário inserir ao menos um item para realizar a venda venda!', 'Atenção', {
        duration: 3000
      })
    } else {
      //abrir dialog
      let dialogRef = this.dialog.open(SaleDialogComponent, {
        width: '300px',
        data: {
          //itens que serão levados do pdv para o dialog
          pagar: this.pagar
        }
      });
      //confirmar venda
      dialogRef.afterClosed().subscribe(result => {
        const venda = new Sale(
          null,
          result.pagar,
          parseFloat(String(result.pago).replace(",", ".")),
          parseFloat(String(result.troco).replace(",", ".")),
          result.payment,
          '',
          this.productsSolds
        );

        console.log('update', venda)

        if(this.id){

          venda.mesa = this.sale.mesa;
          venda.id = this.id

          this.saleService.updateSale(this.id,venda).subscribe( res => {
            this.snackBar.open('Venda alterada com sucesso!', 'Sucesso', {
              duration: 2000
            })
            //limpar formulário
            this.load();
          })
        } else {
          // salvar venda
          this.saleService.save(venda).subscribe(resposta => {
            this.snackBar.open('Venda realizada com sucesso!', 'Sucesso', {
              duration: 2000
            })
            //limpar formulário
            this.load();
          }, errorResponse => {
            // exibir mensagem snackbar
            this.snackBar.open(errorResponse.error.message, 'ERRO', {
              duration: 2000
            })
          })
        }
      });
    }
  }

  openDialogComanda(): void {
    //verificar se existe itens na tabela
    if (this.productsSolds.length <= 0) {
      this.snackBar.open('É necessário inserir ao menos um item para abrir a comanda!', 'Atenção', {
        duration: 3000
      })
    } else {
      //abrir dialog
      let dialogRef = this.dialog.open(SaleDialogComponent, {
        width: '300px',
        data: {
          //itens que serão levados do pdv para o dialog
          pagar: this.pagar,
          titulo: 'Abrir Comanda',
          comanda: true,
        }
      });
      //confirmar venda
      dialogRef.afterClosed().subscribe(result => {
        const venda = new Sale(
          null,
          result.pagar,
          parseFloat(String(result.pago).replace(",", ".")),
          parseFloat(String(result.troco).replace(",", ".")),
          result.payment,
          result.mesa,
          this.productsSolds
        );

        // salvar venda
        this.saleService.save(venda).subscribe(resposta => {
          this.snackBar.open('Comanda aberta!', 'Sucesso', {
            duration: 2000
          })
          //limpar formulário
          this.load();
        }, errorResponse => {
          // exibir mensagem snackbar
          this.snackBar.open(errorResponse.error.message, 'ERRO', {
            duration: 2000
          })
        })
      });
    }
  }

  load() {
    //Session storage salva os dados como string
   // (sessionStorage.refresh == 'true' || !sessionStorage.refresh) && location.reload();
   // sessionStorage.refresh = true;

  }

  adicionarItem() {
    const formValues = this.formAddItem.value;
    this.productService.findProductByIdActive(formValues.id).subscribe((response) => {
      const total = response.price * formValues.quantidade;
      const productSold = new ProductSold(
        null,
        response,
        response.price,
        total,
        formValues.quantidade
      );

      this.productsSolds = this.productsSolds.concat(productSold);
      this.statusCaixa = "Venda em Aberto";
    }, errorResponse => {
      // exibir mensagem snackbar
      this.snackBar.open(errorResponse.error.message, 'ERRO', {
        duration: 3000
      })
    })
  }

  getTotalCost() {
    this.pagar = this.productsSolds.map(t => t.priceTotal).reduce((acc, value) => acc + value, 0)
    return this.pagar;
  }
}
