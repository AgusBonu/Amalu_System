import { Component, OnInit} from '@angular/core';

import {FormControl, FormGroupDirective, NgForm, Validators, FormGroup} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';
import { FormBuilder, AbstractControl } from '@angular/forms';
import { HttpClient, HttpResponse, HttpHeaders} from '@angular/common/http';
import swal from 'sweetalert2';


  
@Component({
  selector: 'app-nuevoproducto',
  templateUrl: './nuevoproducto.component.html',
  styleUrls: ['nuevoproducto.component.css']
})

export class NuevoProductoComponent implements OnInit{

    constructor(private http: HttpClient,private formBuilder: FormBuilder) {}

      validTextType: boolean = false;
      validEmailType: boolean = false;
      validNumberType: boolean = false;
      validUrlType: boolean = false;
      pattern = "https?://.+";
      validSourceType: boolean = false;
      validDestinationType: boolean = false;
      categorias: any[];
    
      register : FormGroup;
      selectedFile: File = null;

    ngOnInit() {
      this.http.post<any>(
        'https://dab-development.com/webservice/ajax/control.php?op=listarcategoria',
         {}
      ).subscribe(resp => {
        this.categorias = resp.data;
      });
        this.register = this.formBuilder.group({
          nombre: ['', Validators.required],
          categoria: ['', Validators.required],
          descripcion: ['', Validators.required],
          imagen: ['', Validators.required],
          cantidad: [null, Validators.required],
          precio: [null, Validators.required],
          talle: [null, Validators.required],
          link: [null, Validators.required]
        });
    }
    

  textValidationType(e){
      if (e) {
          this.validTextType = true;
      }else{
        this.validTextType = false;
      }
  }
  numberValidationType(e){
      if (e) {
          this.validNumberType = true;
      }else{
        this.validNumberType = false;
      }
  }
  urlValidationType(e){
    try {
      new URL(e);
      this.validUrlType = true;
    } catch (_) {
      this.validUrlType = false;
    }
  }
  sourceValidationType(e){
      if (e) {
          this.validSourceType = true;
      }else{
        this.validSourceType = false;
      }
  }

  
  // convenience getter for easy access to form fields
  get f() { return this.register.controls; }

  isFieldValid(form: FormGroup, field: string) {
    return !form.get(field).valid && form.get(field).touched;
  }

  displayFieldCss(form: FormGroup, field: string) {
    return {
      'has-error': this.isFieldValid(form, field),
      'has-feedback': this.isFieldValid(form, field)
    };
  }


  onFileSelected(event) {
    this.selectedFile = <File>event.target.files[0];
    console.log(event);
  }

  onRegister() {
    if (this.register.valid) {
      const fd = new FormData();
      fd.append('image', this.selectedFile, this.selectedFile.name);
      fd.append('nombre', this.f.nombre.value);
      fd.append('categoria', this.f.categoria.value);
      fd.append('cantidad', this.f.cantidad.value);
      fd.append('descripcion', this.f.descripcion.value);
      fd.append('precio', this.f.precio.value);
      fd.append('talle', this.f.talle.value);
      fd.append('link', this.f.link.value);

      this.http.post<any>(
        'https://dab-development.com/webservice/ajax/control.php?op=registrarproducto',
        fd,
         {}
      ).subscribe(resp => {
        swal({
          title: "Exito!",
          text: "Producto insertado correctamente!",
          buttonsStyling: false,
          confirmButtonClass: "btn btn-success",
          type: "success"
        }).catch(swal.noop);
        this.register.reset();
      });
    } else {
      console.log(this.register);
      this.validateAllFormFields(this.register);
    }
  }

  validateAllFormFields(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach(field => {
      const control = formGroup.get(field);
      if (control instanceof FormControl) {
        control.markAsTouched({ onlySelf: true });
      } else if (control instanceof FormGroup) {
        this.validateAllFormFields(control);
      }
    });
  }
}