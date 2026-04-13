import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {Login} from '../../components/login/login'
import {Register} from '../../components/register/register'
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-connexion',
  imports: [CommonModule, Login, Register , MatButtonModule],
  templateUrl: './connexion.html',
  styleUrl: './connexion.css',
})
export class Connexion {
  isRegisterMode: boolean = true;

  toggleMode() {
    this.isRegisterMode = !this.isRegisterMode;
  }
}
