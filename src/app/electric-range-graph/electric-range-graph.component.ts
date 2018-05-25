import { Component,
         OnInit,
         ViewEncapsulation,
         AfterContentInit } from '@angular/core';
import * as d3 from 'd3';

@Component({
  selector: 'app-electric-range-graph',
  template: `<svg class="svg-container"></svg>`,
})

export class ElectricRangeGraphComponent implements OnInit, AfterContentInit {
  private carsRange: any;
  private transition: d3.Transition<any, any, any, any>;
  private animationDelay: number;
  private svgWidth: number;
  private svgHeigh: number;
  private barPadding: number;
  private bottomPadding: number;
  private rightPadding: number;
  private barHeight: number;
  private fontSize: number;
  private svg: any;
  private xScale: any;
  private xAxe: any;

  constructor() { }

  ngOnInit() { }

  ngAfterContentInit() {
    this.graphSetup();
    this.drawAxes();
    this.drawGraph();
  }
  // Private functions:
  private graphSetup() {
    this.carsRange = [
      {
      'image': 'https://cdn.drivek.it/configurator-icon/cars/es/400/RENAULT/ZOE/31529_BERLINA-5-PUERTAS/renault-zoe-side-view.png',
      'range': 210
      },
      {
        'image': 'https://cdn.drivek.it/configurator-icon/cars/es/400/RENAULT/ZOE/31529_BERLINA-5-PUERTAS/renault-zoe-side-view.png',
        'range': 410
      }
    ];
    this.svgHeigh = 250;
    this.svgWidth = 500;
    this.barPadding = 10;
    this.bottomPadding = 16;
    this.rightPadding = 16;
    this.barHeight = this.getBarHeight();
    this.animationDelay = 350;
    this.fontSize = 12;
    // D3 setup:
    this.transition = d3.transition().duration(this.animationDelay).ease(d3.easeLinear);
    this.xScale = d3.scaleLinear().domain([0, d3.max(this.carsRange) + 50]).range([0, this.svgWidth - this.rightPadding]);
    this.xAxe = d3.axisBottom(this.xScale);
    this.svg = d3.select('.svg-container')
                  .attr('width', this.svgWidth)
                  .attr('height', this.svgHeigh)
                  .style('border-color', 'black;');
  }
  private getBarHeight() {
    const realHeight = this.svgHeigh - this.bottomPadding;
    const gaps = (this.barPadding * (this.carsRange.length - 1));
    return (realHeight - gaps) / this.carsRange.length;
  }
  private drawAxes() {
    // X axe with data scale:
    this.svg.append('g')
            .attr('transform', 'translate(2, ' + (this.svgHeigh - this.bottomPadding) + ')')
            .call(this.xAxe);
    // Y axe:
    this.svg.append('line')
            .attr('x1', 2.5)
            .attr('y1', 0)
            .attr('x2', 2.5)
            .attr('y1', this.svgHeigh - this.bottomPadding)
            .attr('stroke-width', 1)
            .attr('stroke', 'black');
  }
  private drawGraph() {
    const pencil = d3.select('.svg-container')
      .selectAll('rect')
      .data(this.carsRange)
      .enter();

    pencil.append('rect')
        .attr('width', 0)
        .attr('height', this.barHeight)
        .attr('x', 3)
        .attr('y', (d, i) => (i * this.barHeight) + i * this.barPadding)
        .attr('fill', 'steelblue')
        .transition()
        .delay((d, i) => i * this.animationDelay)
        .duration(600)
        .attr('width', (d) => this.xScale(d))
        .text((d) => d);

    pencil.append('text')
        .attr('x', (d) => this.xScale(d) - (d + ' km').length * 2 - 30)
        .attr('y', (d, i) => this.barHeight * i + this.fontSize + 2 + i * this.barPadding)
        .attr('font-family', 'sans-serif')
        .attr('font-size', this.fontSize)
        .attr('fill', 'white')
        .text((d) => d + ' Km');

    pencil.append('svg:image')
        .attr('x', (d) => 0)
        .attr('y', (d, i) => this.barHeight * i + i * this.barPadding)
        .attr('width', this.barHeight)
        .attr('height', this.barHeight)
        .attr('xlink:href', 'http://carlosmmdiaz.es/resources/img/skills/angularjs.png')
        .transition()
        .delay((d, i) => i * this.animationDelay)
        .duration(600)
        .attr('x', (d) => this.xScale(d));
  }
}

