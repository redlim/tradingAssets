import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router'
import {AssetsService} from './services/assets.service'

export interface Asset {
  id?:number,
  name:string,
  isin:string,
  prices?:Object
}

@Component({
  selector: 'asset-detail',
  templateUrl: './assets.detail.component.html'
})

export class AssetDetailComponent {

  asset:Asset;
  values:Array<any>;
  labels:Array<any>;
  lineChartData:Array<any> = [
    {data: this.values, label: 'Prices'}
  ];
  pagination = 10;

  constructor(private router: Router, activatedRoute: ActivatedRoute, private assetsService: AssetsService) {

    let id = activatedRoute.snapshot.params['id'];

    assetsService.getAsset(id).subscribe(
        (asset)=> {
          this.asset = asset;
          this.setGraphData(asset.prices)
        }
          );
  }

  gotoAssets() {
    this.router.navigate(['/assets']);
  }
  editAsset(id){
    this.router.navigate(['/edit/asset/'+id]);
  }
  deleteAsset(asset){
    if (confirm('Estás seguro')) {
      this.assetsService.deleteItem(asset).subscribe((response)=>this.gotoAssets());
    }
  }
  setGraphData(data){
   let dataFormatted = data.reduce(function (acum,d) {
      acum.data.push(d.value);
      acum.labels.push(d.date);
      return acum;
    },{data:[],labels:[]});
    this.lineChartLabels = dataFormatted.labels.slice(dataFormatted.data.length-this.pagination,dataFormatted.data.length);
    this.lineChartData = [{data: dataFormatted.data.slice(dataFormatted.data.length-this.pagination,dataFormatted.data.length), label: 'Prices'}];
    console.log(this.lineChartLabels);
  }

  public lineChartLabels:Array<any> = this.labels;
  public lineChartOptions:any = {
    responsive: true
  };
  public lineChartColors:Array<any> = [
    { // grey
      backgroundColor: 'rgba(148,159,177,0.2)',
      borderColor: 'rgba(148,159,177,1)',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    }
  ];
  public lineChartLegend:boolean = true;
  public lineChartType:string = 'line';

  public randomize():void {
    let _lineChartData:Array<any> = new Array(this.lineChartData.length);
    for (let i = 0; i < this.lineChartData.length; i++) {
      _lineChartData[i] = {data: new Array(this.lineChartData[i].data.length), label: this.lineChartData[i].label};
      for (let j = 0; j < this.lineChartData[i].data.length; j++) {
        _lineChartData[i].data[j] = Math.floor((Math.random() * 100) + 1);
      }
    }
    this.lineChartData = _lineChartData;
  }

  // events
  public chartClicked(e:any):void {
    console.log(e);
  }

  public chartHovered(e:any):void {
    console.log(e);
  }
}
