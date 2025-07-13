import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HlmToasterComponent } from '@spartan-ng/helm/sonner';
import { NgxMaskConfig, NgxMaskDirective, NgxMaskPipe } from 'ngx-mask';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HlmToasterComponent, NgxMaskDirective, NgxMaskPipe],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected title = 'app-avantesfinance';
}
