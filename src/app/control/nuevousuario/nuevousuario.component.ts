import { Component, OnInit} from '@angular/core';

import {FormControl, FormGroupDirective, NgForm, Validators, FormGroup} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';
import { FormBuilder, AbstractControl } from '@angular/forms';
import { HttpClient, HttpResponse, HttpHeaders} from '@angular/common/http';
import swal from 'sweetalert2';


  
@Component({
  selector: 'app-nuevousuario',
  templateUrl: './nuevousuario.component.html',
  styleUrls: ['nuevousuario.component.css']
})

export class NuevoUsuarioComponent implements OnInit{

    constructor(private http: HttpClient,private formBuilder: FormBuilder) {}
    emailFormControl = new FormControl('', [
      Validators.required,
      Validators.email,
    ]);
      validTextType: boolean = false;
      validEmailType: boolean = false;
      validNumberType: boolean = false;
      validUrlType: boolean = false;
      pattern = "https?://.+";
      validSourceType: boolean = false;
      validDestinationType: boolean = false;
      categorias: any[];
    
      register : FormGroup;

    ngOnInit() {
        this.register = this.formBuilder.group({
          nombre: ['', Validators.required],
          documento: ['', Validators.required],
          direccion: ['', Validators.required],
          telefono: ['', Validators.required],
          email: [null, [Validators.required,Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")]],
          cargo: [null, Validators.required],
          login: [null, Validators.required],
          contra: [null, Validators.required],
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



  onRegister() {
    if (this.register.valid) {

      let EnviarDatos = {
        nombre: this.f.nombre.value,
        documento: this.f.documento.value,
        direccion: this.f.direccion.value,
        telefono: this.f.telefono.value,
        email: this.f.email.value,
        login: this.f.login.value,
        contra: this.f.contra.value
      }
      this.http.post<any>(
        'https://dab-development.com/webservice/ajax/control.php?op=registrarusuario',
         {EnviarDatos}
      ).subscribe(resp => {
        swal({
          title: "Exito!",
          text: "Usuario insertado correctamente!",
          buttonsStyling: false,
          confirmButtonClass: "btn btn-success",
          type: "success"
        }).catch(swal.noop);
        this.register.reset();
      });
    } else {
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