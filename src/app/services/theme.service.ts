import { Injectable, Renderer2, RendererFactory2 } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  
   private renderer: Renderer2;
  private darkClass = 'dark';

  constructor(rendererFactory: RendererFactory2) {
    this.renderer = rendererFactory.createRenderer(null, null);
  }

  enableDarkMode() {
    this.renderer.addClass(document.documentElement, this.darkClass);
  }

  disableDarkMode() {
    this.renderer.removeClass(document.documentElement, this.darkClass);
  }

  toggleTheme() {
    document.documentElement.classList.toggle(this.darkClass);
  }

  isDarkMode(): boolean {
    return document.documentElement.classList.contains(this.darkClass);
  }
}
