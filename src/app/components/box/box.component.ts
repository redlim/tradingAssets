import {Injectable, Component, Input} from '@angular/core';
@Component({
    selector: 'box-component',
    templateUrl:'./box.component.html',
    styleUrls:['./box.component.css']

})
export class BoxComponent {
    @Input() icon;
    @Input() size;
    @Input() value;
    @Input() color;

    getClass(){
        return 'col-md-'+this.size
    }
}