import { Component } from '@angular/core';
import { RouterLinkActive, RouterLinkWithHref } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [RouterLinkWithHref, RouterLinkActive],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {}
