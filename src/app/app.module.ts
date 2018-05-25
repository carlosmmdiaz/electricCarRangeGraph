// @angularjs:
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Injector } from '@angular/core';
import { createCustomElement } from '@angular/elements';
// Components:
import { AppComponent } from './app.component';
import { ElectricRangeGraphComponent } from './electric-range-graph/electric-range-graph.component';

@NgModule({
  declarations: [AppComponent, ElectricRangeGraphComponent],
  imports: [BrowserModule],
  entryComponents: [ElectricRangeGraphComponent],
  bootstrap: [AppComponent]
})
export class AppModule {
  // constructor(private injector: Injector) {
  //   const customElectricRangeGraph = createCustomElement(ElectricRangeGraphComponent, { injector });
  //   customElements.define('custom-electric-range-graph', ElectricRangeGraphComponent);
  // }
  // ngDoBootstrap() {}
}
