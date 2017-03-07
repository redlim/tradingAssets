import {Component, Injectable} from '@angular/core';
import {AssetsService} from './services/assets.service';
import {Router } from '@angular/router'

@Component({
  selector: 'asset-list',
  templateUrl: './assets.component.html',
  styleUrls: ['./assets.component.css']
})

export class AssetsComponent {

  public constructor(private assetsService:AssetsService, private router:Router){}

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

  getData(){
    if(this.risk !== "" || this.currency !== ""){
      return this.filteredList;
    }else{
      return this.assets;
    }
  }

  filterCurrency(){
    this.filteredList = this.assets.filter((el)=> {
      return el.currency.toLowerCase().indexOf(this.currency.toLowerCase()) > -1;
    });
  }

  filterRisk(){
    this.filteredList = this.assets.filter((el)=>{
      return el.risk_family.toLowerCase().indexOf(this.risk.toLowerCase()) > -1;
    });
  }

}
