import { Component, OnInit, ElementRef, OnDestroy } from '@angular/core';
import { AuthService } from '../../auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
declare var $: any;
import { Router } from '@angular/router';

@Component({
    selector: 'app-login-cmp',
    templateUrl: './login.component.html'
})

export class LoginComponent implements OnInit, OnDestroy {
    test: Date = new Date();
    private toggleButton: any;
    private sidebarVisible: boolean;
    private nativeElement: Node;

    loginForm: FormGroup;
    message: string;
    returnUrl: string;

    constructor(private router: Router, private formBuilder: FormBuilder,private element: ElementRef,public authService: AuthService) {
        this.nativeElement = element.nativeElement;
        this.sidebarVisible = false;
    }

    ngOnInit() {
        var navbar : HTMLElement = this.element.nativeElement;
        this.toggleButton = navbar.getElementsByClassName('navbar-toggle')[0];
        const body = document.getElementsByTagName('body')[0];
        body.classList.add('login-page');
        body.classList.add('off-canvas-sidebar');
        const card = document.getElementsByClassName('card')[0];
        setTimeout(function() {
            // after 1000 ms we add the class animated to the login/register card
            card.classList.remove('card-hidden');
        }, 700);

        this.loginForm = this.formBuilder.group({
            userid: ['', Validators.required],
            password: ['', Validators.required]
          });
          this.returnUrl = '/';
          this.authService.logout();
    }


    login() {
        // stop here if form is invalid
        if (this.loginForm.invalid) {
            return;
        }
        else{
          this.authService.getUserDetails(this.f.userid.value, this.f.password.value).subscribe(data => {
            if(data[0].success == 'true') {
              this.authService.setLoggedIn('true',this.f.userid.value, data[0].nombre)
              this.router.navigate([this.returnUrl])
            } else {
                this.showNotification('top','right','Credenciales invalidas.','danger');
            }
          })
        }    
    }
    // convenience getter for easy access to form fields
    get f() { return this.loginForm.controls; }
  
    sidebarToggle() {
        var toggleButton = this.toggleButton;
        var body = document.getElementsByTagName('body')[0];
        var sidebar = document.getElementsByClassName('navbar-collapse')[0];
        if (this.sidebarVisible == false) {
            setTimeout(function() {
                toggleButton.classList.add('toggled');
            }, 500);
            body.classList.add('nav-open');
            this.sidebarVisible = true;
        } else {
            this.toggleButton.classList.remove('toggled');
            this.sidebarVisible = false;
            body.classList.remove('nav-open');
        }
    }
    ngOnDestroy(){
      const body = document.getElementsByTagName('body')[0];
      body.classList.remove('login-page');
      body.classList.remove('off-canvas-sidebar');
    }

    showNotification(from: any, align: any, mensaje, colour) {
        const type = ['', 'info', 'success', 'warning', 'danger', 'rose', 'primary'];
    
        const color = Math.floor((Math.random() * 6) + 1);
    
        $.notify({
            icon: 'notifications',
            message: mensaje
        }, {
            type: colour,
            timer: 1000,
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
}
