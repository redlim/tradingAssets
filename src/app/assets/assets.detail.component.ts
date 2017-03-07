import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router'
import {AssetsService} from './services/assets.service'
import {AngularFire, FirebaseListObservable} from 'angularfire2';
import {AssetsComponent} from './assets.component'

const highcharts = require('highcharts');


export interface Asset {
  id?:number,
  name:string,
  isin:string,
  value:string
}

@Component({
  selector: 'asset-detail',
  templateUrl: './assets.detail.component.html',
  styleUrls: ['./assets.detail.component.css']
})

export class AssetDetailComponent {
  activeCommentsLocalStorage:Boolean = false;
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
        });

  }

  loadComments(id){
    this.comments = JSON.parse(localStorage.getItem("assetComments"+id));
  }

  addComment(comment,id){

    // using Firebase
    const itemObservable = this.af.database.list('comments'+id);
    let date = new Date();
    itemObservable.push({content:comment,date:date.toISOString()});

    // Using LocalStorage
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
      },
      title: {
        text: title
      },
      subtitle: {
        text: subtitle
      },
      xAxis: {
        type: 'datetime',
        dateTimeLabelFormats: {
          day: '%e. %b',
          month: '%b \'%y',
          year: '%Y'
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

      plotOptions:{
        area: {
          fillColor: {
            linearGradient: {
              x1: 0,
              y1: 0,
              x2: 0,
              y2: 1
            },
            stops: [
              [0, highcharts.getOptions().colors[0]],
              [1, highcharts.Color(highcharts.getOptions().colors[0]).setOpacity(0).get('rgba')]
            ]
          },
          marker: {
            radius: 2
          },
          lineWidth: 1,
          states: {
            hover: {
              lineWidth: 1
            }
          },
          threshold: null
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
}


highcharts.createElement('link', {
  href: 'https://fonts.googleapis.com/css?family=Unica+One',
  rel: 'stylesheet',
  type: 'text/css'
}, null, document.getElementsByTagName('head')[0]);

highcharts.theme = {
  colors: ['#2b908f', '#90ee7e', '#f45b5b', '#7798BF', '#aaeeee', '#ff0066', '#eeaaee',
    '#55BF3B', '#DF5353', '#7798BF', '#aaeeee'],
  chart: {
    backgroundColor: {
      linearGradient: {x1: 0, y1: 0, x2: 1, y2: 1},
      stops: [
        [0, '#2a2a2b'],
        [1, '#3e3e40']
      ]
    },
    style: {
      fontFamily: '\'Unica One\', sans-serif'
    },
    plotBorderColor: '#606063'
  },
  title: {
    style: {
      color: '#E0E0E3',
      textTransform: 'uppercase',
      fontSize: '20px'
    }
  },
  subtitle: {
    style: {
      color: '#E0E0E3',
      textTransform: 'uppercase'
    }
  },
  xAxis: {
    gridLineColor: '#707073',
    labels: {
      style: {
        color: '#E0E0E3'
      }
    },
    lineColor: '#707073',
    minorGridLineColor: '#505053',
    tickColor: '#707073',
    title: {
      style: {
        color: '#A0A0A3'

      }
    }
  },
  yAxis: {
    gridLineColor: '#707073',
    labels: {
      style: {
        color: '#E0E0E3'
      }
    },
    lineColor: '#707073',
    minorGridLineColor: '#505053',
    tickColor: '#707073',
    tickWidth: 1,
    title: {
      style: {
        color: '#A0A0A3'
      }
    }
  },
  tooltip: {
    backgroundColor: 'rgba(0, 0, 0, 0.85)',
    style: {
      color: '#F0F0F0'
    }
  },
  plotOptions: {
    series: {
      dataLabels: {
        color: '#B0B0B3'
      },
      marker: {
        lineColor: '#333'
      }
    },
    boxplot: {
      fillColor: '#505053'
    },
    candlestick: {
      lineColor: 'white'
    },
    errorbar: {
      color: 'white'
    }
  },
  legend: {
    itemStyle: {
      color: '#E0E0E3'
    },
    itemHoverStyle: {
      color: '#FFF'
    },
    itemHiddenStyle: {
      color: '#606063'
    }
  },
  credits: {
    style: {
      color: '#666'
    }
  },
  labels: {
    style: {
      color: '#707073'
    }
  },

  drilldown: {
    activeAxisLabelStyle: {
      color: '#F0F0F3'
    },
    activeDataLabelStyle: {
      color: '#F0F0F3'
    }
  },

  navigation: {
    buttonOptions: {
      symbolStroke: '#DDDDDD',
      theme: {
        fill: '#505053'
      }
    }
  },

  // scroll charts
  rangeSelector: {
    buttonTheme: {
      fill: '#505053',
      stroke: '#000000',
      style: {
        color: '#CCC'
      },
      states: {
        hover: {
          fill: '#707073',
          stroke: '#000000',
          style: {
            color: 'white'
          }
        },
        select: {
          fill: '#000003',
          stroke: '#000000',
          style: {
            color: 'white'
          }
        }
      }
    },
    inputBoxBorderColor: '#505053',
    inputStyle: {
      backgroundColor: '#333',
      color: 'silver'
    },
    labelStyle: {
      color: 'silver'
    }
  },

  navigator: {
    handles: {
      backgroundColor: '#666',
      borderColor: '#AAA'
    },
    outlineColor: '#CCC',
    maskFill: 'rgba(255,255,255,0.1)',
    series: {
      color: '#7798BF',
      lineColor: '#A6C7ED'
    },
    xAxis: {
      gridLineColor: '#505053'
    }
  },

  scrollbar: {
    barBackgroundColor: '#808083',
    barBorderColor: '#808083',
    buttonArrowColor: '#CCC',
    buttonBackgroundColor: '#606063',
    buttonBorderColor: '#606063',
    rifleColor: '#FFF',
    trackBackgroundColor: '#404043',
    trackBorderColor: '#404043'
  },

  // special colors for some of the
  legendBackgroundColor: 'rgba(0, 0, 0, 0.5)',
  background2: '#505053',
  dataLabelsColor: '#B0B0B3',
  textColor: '#C0C0C0',
  contrastTextColor: '#F0F0F3',
  maskColor: 'rgba(255,255,255,0.3)'
};
highcharts.setOptions(highcharts.theme);
