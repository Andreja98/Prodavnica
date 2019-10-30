import { Component, OnInit } from '@angular/core';
import { KorisnikService } from '../korisnik/korisnik.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private service: KorisnikService,
    private toastr: ToastrService,
    private router: Router) { }

  ngOnInit() {
    if (sessionStorage.getItem('token') != null) {
      this.router.navigate(['/home']);
    }
  }

  onSubmit(form: FormGroup) {
    this.service.login(form.value).subscribe((data: any) => {

      sessionStorage.setItem('token', data.token);
      sessionStorage.setItem('rola', data.trenutni.rolaId)
      this.toastr.success('Uspesno ste se ulogovali', 'Prodavnica')
      this.router.navigate(['/listaMaterijala'])
    },
      (error: any) => { this.toastr.error("Uneti podaci su pogresni","Greska") }

    )
    this.service.loginForm.reset();
  }

}
