import { Component, OnInit } from '@angular/core';
import * as CanvasJSAngularChart from '../../assets/charts/canvasjs.angular.component';
var CanvasJSChart = CanvasJSAngularChart.CanvasJSChart;
@Component({
  selector: 'app-analysis',
  templateUrl: './analysis.component.html',
  styleUrls: ['./analysis.component.css']
})
export class AnalysisComponent implements OnInit {
  dps = [{x: 1, y: 10}, {x: 2, y: 13}, {x: 3, y: 18}, {x: 4, y: 20}, {x: 5, y: 17},{x: 6, y: 10}, {x: 7, y: 13}, {x: 8, y: 18}, {x: 9, y: 20}, {x: 10, y: 17}];   
  constructor() { }

  ngOnInit(): void {
  }
  chartOptions = {
    animationEnabled: true,
    exportEnabled: true,
    title:{
      text: "Quarterly Sales Revenue",
      fontFamily: "Calibri, Arial, sans-serif"
    },
    axisX:{
      title: "Quarter",
      reversed: true
    },
    axisY:{
      title: "Revenue",
      prefix: "",
      suffix: "k",
      includeZero: true
    },
    toolTip:  {
      shared: true
    },
    data: [{
      type: "stackedBar",
      name: "Clothing",
      showInLegend: "true",
      yValueFormatString: "#,###k",
      color: "#edae49",
      dataPoints: [
        {  y: 42, label: "Q1"},
        {  y: 53, label: "Q2" },
        {  y: 47, label: "Q3" },
        {  y: 60, label: "Q4" }
      ]
    },  {
      type: "stackedBar",
      name: "Others",
      showInLegend: "true",
      yValueFormatString: "#,###k",
      color: "#d1495b",
      dataPoints: [
        {  y: 46, label: "Q1"},
        {  y: 60, label: "Q2" },
        {  y: 58, label: "Q3" },
        {  y: 70, label: "Q4" }
      ]
    }]
  }	
}               