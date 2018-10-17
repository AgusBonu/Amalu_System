import { Component, OnInit } from '@angular/core';

import {FormControl, FormGroupDirective, NgForm, Validators, FormGroup} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';
import { FormBuilder, AbstractControl } from '@angular/forms';
import { PasswordValidation } from './password-validator.component';
import { HttpClient, HttpResponse } from '@angular/common/http';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

declare const google: any;
declare const $: any;
@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.css']
})


export class TimeLineComponent {

  
  validTextType: boolean = false;
  type : FormGroup;
  datos : any[];
  chasis: string;

  constructor(private formBuilder: FormBuilder, private http: HttpClient) {}

   isFieldValid(form: FormGroup, field: string) {
     return !form.get(field).valid && form.get(field).touched;
   }

   displayFieldCss(form: FormGroup, field: string) {
     return {
       'has-error': this.isFieldValid(form, field),
       'has-feedback': this.isFieldValid(form, field)
     };
   }
   onType() {
     if (this.type.valid) {
      $( "#btnbuscar" ).prop( "disabled", true );
      $('#satelliteMap').removeClass();
      this.datos = [];
      this.chasis = this.f.text.value;
      this.showNotification('top','right','Buscando...','info')
      $( "#text").val('');
      this.http.get<any>(
        'http://172.18.6.171/WSE/api/Extranet/TrazabilidadVehiculoXVin?Vin=' + this.chasis, {}
      ).subscribe(resp => {
        console.log('hola');
      $( "#btnbuscar" ).prop( "disabled", false );
        this.comprobar(resp.Latitud,resp.Longitud,resp.Eventos);
      
      }, error => {
        $( "#btnbuscar" ).prop( "disabled", false );
        this.error();
      });
     } else {
       this.validateAllFormFields(this.type);
     }
   }

   error()
   {
    this.showNotification('top','right','VIN no encontrado.','danger')
   }

   showNotification(from: any, align: any, mensaje, colour) {
    const type = ['', 'info', 'success', 'warning', 'danger', 'rose', 'primary'];

    const color = Math.floor((Math.random() * 6) + 1);

    $.notify({
        icon: 'notifications',
        message: mensaje
    }, {
        type: colour,
        timer: 10,
        placement: {
            from: from,
            align: align
        },
        template: '<div data-notify="container" class="col-xs-11 col-sm-3 alert alert-{0} alert-with-icon" role="alert">' +
          '<button mat-raised-button type="button" aria-hidden="true" class="close" data-notify="dismiss">  <i class="material-icons">close</i></button>' +
          '<i class="material-icons" data-notify="icon">notifications</i> ' +
          '<span data-notify="title">{1}</span> ' +
          '<span data-notify="message">{2}</span>' +
          '<div class="progress" data-notify="progressbar">' +
            '<div class="progress-bar progress-bar-{0}" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="width: 0%;"></div>' +
          '</div>' +
          '<a href="{3}" target="{4}" data-notify="url"></a>' +
        '</div>'
    });
}

   comprobar(latitud,longitud,eventos)
   {
       if (eventos.length === 0)
       {
        this.showNotification('top','right','VIN no encontrado.','danger')
       }
       else
       {
        this.showNotification('top','right','VIN encontrado.','success')
         if ( latitud === 0)
         {
          this.datos = eventos;
         }
         else
         {
          // Satellite Map
          let myLatlng = new google.maps.LatLng(latitud, longitud);
          const mapOptions2 = {
              zoom: 17,
              scrollwheel: true, // we disable de scroll over the map, it is a really annoing when you scroll through page
              center: myLatlng,
              mapTypeId: google.maps.MapTypeId.roadmap
          };
          
          $('#satelliteMap').addClass('map map-big');
          let map = new google.maps.Map(document.getElementById('satelliteMap'), mapOptions2);

          let marker = new google.maps.Marker({
              position: myLatlng,
              title: 'Satellite Map!'
          });

          marker.setMap(map);
          this.datos = eventos;
         }

          
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

   textValidationType(e){
    if (e.length == 17) {
        this.validTextType = true;
    }else{
      this.validTextType = false;
    }
    }

    // convenience getter for easy access to form fields
    get f() { return this.type.controls; }
  
  ngOnInit() {
       this.type = this.formBuilder.group({
         // To add a validator, we must first convert the string value into an array. The first item in the array is the default value if any, then the next item in the array is the validator. Here we are adding a required validator meaning that the firstName attribute must have a value in it.
         text: [null, [Validators.required,Validators.compose([Validators.required, Validators.minLength(17)])]]
        });
  }

  

}
