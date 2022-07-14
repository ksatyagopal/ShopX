import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Order } from 'Models/Order';
import { CanvasJS } from 'src/assets/charts/canvasjs.angular.component';
import { OrdersService } from '../orders.service';

@Component({
  selector: 'app-charts',
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.css']
})
export class ChartsComponent implements OnInit {
orders:Order[]=[];
totalorders:number;
dataPoints1 = []
datapoints2=[]
chartoptions={}
chartdata={}
  constructor(private orderobj:OrdersService) { }

  ngOnInit(): void {
	this.orderobj.getAllorder().subscribe(data=>{this.orders=data;  
    this.totalorders=this.orders.length;
	var reduced=this.orders.reduce((acc, o) => (acc[o.orderStatus] = (acc[o.orderStatus] || 0) + 1, acc), {});
	console.log(reduced);
	 var result2 = Object.keys(reduced).map(x =>  {
		return {name : x, value : reduced[x]}}) 
	for(var j=0;j<result2.length;j++){
		result2[j].value=((result2[j].value/this.totalorders)*100);
	}
	console.log(result2);
	for(var k=0;k<result2.length;k++){
		this.dataPoints1.push({name: String(result2[k].name), y: Number(result2[k].value).toPrecision(3)});
	}
	console.log(this.dataPoints1);
	this.chartoptions = {
		animationEnabled: true,
		theme: "light2",
		exportEnabled: true,
		subtitles: [{
		  text: "Total Orders Overview",fontFamily: "Calibri, Arial, sans-serif"
		}],
		data: [{
		  type: "pie", 
		  showInLegend:true,
		  indexLabel: "{name}: {y}%", 
		  dataPoints: this.dataPoints1
		}]
	  }
	  for(var j=0;j<this.orders.length;j++){
		const date=new Date(this.orders[j].orderedOn);
		console.log();
		this.datapoints2.push({x:date, y: Number(this.orders[j].totalAmount)});
		}
	  this.chartdata = {
		animationEnabled: true,
		zoomEnabled: true,     
		gridThickness: 2,
		theme: "dark2",
		axisX:{
			title: "Date/Time"
		   },
		   axisY:{
			title: "Revenue (Rs)"
		   },
		exportEnabled: true,
     data: [{        
      type: "area",
	  
	  xValueType: "dateTime",
      dataPoints: this.datapoints2
    }]}
     });
  }
  
}
