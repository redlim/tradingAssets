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
        (asset)=>
          this.asset = asset);

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
