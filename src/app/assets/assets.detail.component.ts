import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router'
import {AssetsService} from './services/assets.service'
import {AngularFire, FirebaseListObservable,FirebaseObjectObservable} from 'angularfire2';
export interface Asset {
  id?:number,
  name:string,
  isin:string,
  value:string
}

@Component({
  selector: 'asset-detail',
  templateUrl: './assets.detail.component.html'
})

export class AssetDetailComponent {

  asset:Asset;
  options:Object;
  comments:Object;
  fireComments: FirebaseListObservable<any[]>;
  comment:String;
  constructor(private router: Router, activatedRoute: ActivatedRoute, private assetsService: AssetsService, private af: AngularFire) {


    let id = activatedRoute.snapshot.params['id'];
    assetsService.getAsset(id).subscribe(
        (asset)=>{
          this.asset = asset;
          this.generateChart(asset.prices,asset.name,asset.currency.name);
          this.loadComments(asset.id);
          this.fireComments = af.database.list("comments"+id);
          console.log(this.fireComments)
        });

  }
  loadComments(id){
    this.comments = JSON.parse(localStorage.getItem("assetComments"+id));
  }
  addComment(comment,id){

    const itemObservable = this.af.database.list('comments'+id);
    let date = new Date();
    itemObservable.push({content:comment,date:date.toISOString()});

    let comments = JSON.parse(localStorage.getItem("assetComments"+id)) || [];
    comments.push({content:comment,date:new Date()});
    localStorage.setItem("assetComments"+id,JSON.stringify(comments));
    this.comments = comments;
    this.comment = "";
  }
  formatRiskData(data){
    if(data){
      let i = 1;
      let level ="sub_family";
      let name = data.name;
      while(data[level]){
        name+= '/ '+data[level].name;
        data = data[level];
      }
      return name;
    }
  }
  formatData(data){
    if(data){
      let i = 2;
      let level = Object.keys(data).indexOf('region_level'+i)> -1 ? 'region_level' : 'sector_level';
      let name = data.name;
      while(data[level+i]){
        name+= '/ '+data[level+i].name;
        data = data[level+i];
        i++
      }
      return name;
    }
  }

  generateChart(data,title,subtitle){
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
        text: title
      },
      subtitle: {
        text: subtitle
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
          text: 'prices ('+ subtitle+')'
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
        name: 'Prices',
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
