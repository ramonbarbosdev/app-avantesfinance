import { Component, Input } from '@angular/core';
import {  HlmCardImports } from '@spartan-ng/helm/card';
@Component({
  selector: 'app-layout-chart-component',
  imports: [HlmCardImports],
  templateUrl: './layout-chart-component.html',
  styleUrl: './layout-chart-component.scss',
})
export class LayoutChartComponent {

  @Input() titulo: string ="";
  @Input() subtitulo: string ="";

}
