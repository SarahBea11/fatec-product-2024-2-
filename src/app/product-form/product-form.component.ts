import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../product.service';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrl: './product-form.component.css'
})
export class ProductFormComponent implements OnInit{

  formGroupProduct: FormGroup; //criar o ReactiveFormsModule em app.module.ts

    constructor(private router: Router,
                private activeRoute: ActivatedRoute,
                private service: ProductService,
                private formBuilder: FormBuilder //serve para criar o FormGroup
               ){

      this.formGroupProduct = formBuilder.group({
        id      : [''], // esses nomes devem ser igual aos que estão no product.ts
        name    : [''],
        price   : [''],
        category: [''] //Informações dentro no nosso FormGroup
      })
 }

  ngOnInit() {
    const id = Number(this.activeRoute.snapshot.paramMap.get("id"));
    this.loadProduct(id);
  }

  loadProduct(id: number) {
    this.service.getProductById(id).subscribe({
      next: data => this.formGroupProduct.setValue(data) // essa linha nós fizemos uma chamada para mostrar as informações de cada produto,
      // após isso, de um ng s -o para ver na Web
    });
  }
   update(){
    this.service.update(this.formGroupProduct.value).subscribe({
      next: () => this.router.navigate(['products'])
    })

  }

}
