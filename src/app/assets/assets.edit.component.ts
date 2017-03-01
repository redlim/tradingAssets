import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router'
import {AssetsService} from './services/assets.service'
import {Asset} from  './assets.detail.component'
@Component({
  selector: 'asset-edit',
  templateUrl: './assets.edit.component.html'
})

export class AssetsEditComponent {

  asset:Asset;
  constructor(private router: Router, activatedRoute: ActivatedRoute,private assetsService: AssetsService) {
    this.asset = {
      "name":"",
      "isin":"",
    };
    let id = activatedRoute.snapshot.params['id'];
    if(id !== "new"){
      console.log(id);
      assetsService.getAsset(id).subscribe(
        asset=> this.asset = asset);
    }else{
      this.asset = {
        "name":"",
        "isin":"",
      }
    }
  }

  saveAsset(){
    this.assetsService.setAsset(this.asset).subscribe((ok)=>this.router.navigate(['/assets']))
  }


}
