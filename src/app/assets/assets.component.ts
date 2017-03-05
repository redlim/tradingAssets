import { Component } from '@angular/core';
import { Http} from '@angular/http';
import {AssetsService} from './services/assets.service';
import {Router } from '@angular/router'

@Component({
  selector: 'asset-list',
  templateUrl: './assets.component.html',
  styleUrls: ['./assets.component.css']
})

export class AssetsComponent {

  public constructor(private http : Http,private assetsService:AssetsService, private router:Router){}

  assets;
  filteredList;
  risk="";
  currency ="";
  enableFilter = true;
  ngOnInit() { this.getAssets(); }

  getAssets(){
    this.assetsService.getAssets().subscribe((items)=>this.assets = items);
  }
  detailsAsset(asset){
    this.router.navigate(['asset/'+asset.id]);
  }
  newAsset(){
    this.router.navigate(['/edit/asset/new']);
  }
  editAsset(asset){
    this.router.navigate(['/edit/asset/'+asset.id])
  }
  deleteAsset(asset){
    if (confirm('Estás seguro')) {
      this.assetsService.deleteItem(asset).subscribe((response)=>this.getAssets());

    }
  }
  getData(){
    if(this.risk !== "" || this.currency !== ""){
      return this.filteredList;
    }else{
      return this.assets;
    }
  }
  filterCurrency(){
    this.filteredList = this.assets.filter(function(el){
      var result="";
      for(var key in el){
        result+= el[key];
      }
      return result.toLowerCase().indexOf(this.currency.toLowerCase()) > -1;
    }.bind(this));
  }
  filterRisk(){
    this.filteredList = this.assets.filter(function(el){
      var result="";
      for(var key in el){
        result+= el[key];
      }
      return result.toLowerCase().indexOf(this.risk.toLowerCase()) > -1;
    }.bind(this));
  }

}
