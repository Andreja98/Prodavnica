import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private router: Router) { }

  logOut() {
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('rola');
    this.router.navigate(['/home']);
  }

  logIn() {
    const token = sessionStorage.getItem('token');
    return !!token;
  }

  isVlasnik() {
    const rola = sessionStorage.getItem('rola');
    if (rola === "1")
      return true;
    else
      return false;
  }

  isRadnik() {
    const rola = sessionStorage.getItem('rola');
    if (rola === "2")
      return true;
    else
      return false;
  }

  ngOnInit() {
  }

}



