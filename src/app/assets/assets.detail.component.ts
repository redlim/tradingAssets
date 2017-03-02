import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router'
import {AssetsService} from './services/assets.service'

export interface Asset {
  id?:number,
  name:string,
  isin:string
}

@Component({
  selector: 'asset-detail',
  templateUrl: './assets.detail.component.html'
})

export class AssetDetailComponent {

  asset:Asset;

  constructor(private router: Router, activatedRoute: ActivatedRoute, private assetsService: AssetsService) {

    let id = activatedRoute.snapshot.params['id'];
    assetsService.getAsset(id).subscribe(
        (asset)=>{
          this.asset = asset;
          this.generateChart(asset.prices);
        });
  }
  options:Object;

  generateChart(data){
    let result = data.reduce(function (acum,d) {
      acum.push([new Date(d.date),d.value]);
      return acum;
    },[]);
    this.options = {
      chart: {
        zoomType: 'x',
        type: 'spline'
      },
      title: {
        text: 'Snow depth at Vikjafjellet, Norway'
      },
      subtitle: {
        text: 'Irregular time data in Highcharts JS'
      },
      xAxis: {
        type: 'datetime',
        dateTimeLabelFormats: { // don't display the dummy year
          month: '%e. %b',
          year: '%b'
        },
        title: {
          text: 'Date'
        }
      },
      yAxis: {
        title: {
          text: 'Snow depth (m)'
        },
        min: 0
      },
      tooltip: {
        headerFormat: '<b>{series.name}</b><br>',
        pointFormat: '{point.x:%e. %b}: {point.y:.2f} m'
      },

      plotOptions: {
        spline: {
          marker: {
            enabled: true
          }
        }
      },

      series: [{
        name: 'Winter 2014-2015',
        data: result
      }]
    };

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
}
