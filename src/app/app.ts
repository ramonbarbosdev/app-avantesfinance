import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HlmToasterComponent } from '@spartan-ng/helm/sonner';
import { LoadingService } from './services/loading.service';
import { CommonModule } from '@angular/common';
import { HlmSpinnerComponent } from '@spartan-ng/helm/spinner';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    HlmToasterComponent,
    CommonModule,
    HlmSpinnerComponent,
  ],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected title = 'app-avantesfinance';
  loading$ = inject(LoadingService).loading$;
}
