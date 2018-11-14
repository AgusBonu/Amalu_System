import { Component, OnInit} from '@angular/core';

import {FormControl, FormGroupDirective, NgForm, Validators, FormGroup} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';
import { FormBuilder, AbstractControl } from '@angular/forms';
import { HttpClient, HttpResponse } from '@angular/common/http';
import swal from 'sweetalert2';

export class MyErrorStateMatcher implements ErrorStateMatcher {
    isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
      const isSubmitted = form && form.submitted;
      return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
    }
  }

  
@Component({
  selector: 'app-nuevacategoria',
  templateUrl: './nuevacategoria.component.html',
  styleUrls: ['nuevacategoria.component.css']
})

export class NuevaCategoriaComponent implements OnInit{

    constructor(private http: HttpClient,private formBuilder: FormBuilder) {}

    emailFormControl = new FormControl('', [
        Validators.required,
        Validators.email,
      ]);
    
      validEmailRegister: boolean = false;
      validConfirmPasswordRegister: boolean = false;
      validPasswordRegister: boolean = false;
    
      validEmailLogin: boolean = false;
      validPasswordLogin: boolean = false;
    
      validTextType: boolean = false;
      validEmailType: boolean = false;
      validNumberType: boolean = false;
      validUrlType: boolean = false;
      pattern = "https?://.+";
      validSourceType: boolean = false;
      validDestinationType: boolean = false;
    
      matcher = new MyErrorStateMatcher();
      register : FormGroup;
      login : FormGroup;
      type : FormGroup;

    ngOnInit() {
        this.register = this.formBuilder.group({
            nombre: ['', Validators.required],
            descripcion: ['', Validators.required]
           });
    }

    
  
  emailValidationRegister(e){
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (re.test(String(e).toLowerCase())) {
        this.validEmailRegister = true;
    } else {
      this.validEmailRegister = false;
    }
  }
  passwordValidationRegister(e){
      if (e.length > 5) {
          this.validPasswordRegister = true;
      }else{
        this.validPasswordRegister = false;
      }
  }
  confirmPasswordValidationRegister(e){
    if (this.register.controls['password'].value === e) {
        this.validConfirmPasswordRegister = true;
    }else{
      this.validConfirmPasswordRegister = false;
    }
  }

  emailValidationLogin(e){
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (re.test(String(e).toLowerCase())) {
        this.validEmailLogin= true;
    } else {
      this.validEmailLogin = false;
    }
  }
  passwordValidationLogin(e){
      if (e.length > 5) {
          this.validPasswordLogin = true;
      }else{
        this.validPasswordLogin = false;
      }
  }


  textValidationType(e){
      if (e) {
          this.validTextType = true;
      }else{
        this.validTextType = false;
      }
  }
  emailValidationType(e){
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (re.test(String(e).toLowerCase())) {
        this.validEmailType = true;
    } else {
      this.validEmailType = false;
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
  confirmDestinationValidationType(e){
    if (this.type.controls['password'].value === e) {
        this.validDestinationType = true;
    }else{
      this.validDestinationType = false;
    }
  }


  
  isFieldValid(form: FormGroup, field: string) {
    return !form.get(field).valid && form.get(field).touched;
  }

  displayFieldCss(form: FormGroup, field: string) {
    return {
      'has-error': this.isFieldValid(form, field),
      'has-feedback': this.isFieldValid(form, field)
    };
  }
  get f() { return this.register.controls; }
  onRegister() {
    if (this.register.valid) {
        let nombre = this.f.nombre.value;
        let descripcion = this.f.descripcion.value;
        this.http.post<any>(
            'https://dab-development.com/webservice/ajax/control.php?op=registrarcategoria',
             {nombre: nombre,descripcion : descripcion}
          ).subscribe(resp => {
            swal({
              title: "Exito!",
              text: "Categoria registrada!",
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
  onLogin() {
    if (this.login.valid) {
    } else {
      this.validateAllFormFields(this.login);
    }
  }
  onType() {
    if (this.type.valid) {
    } else {
      this.validateAllFormFields(this.type);
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