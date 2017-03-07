import {Component, Input} from '@angular/core';
import {DataTable} from './datatable.component';

@Component({
    selector: 'column',
    template: ``,

})
export class ColumnComponent {
    @Input() value;
    @Input() header;

    constructor(table: DataTable) {
        table.addColumn(this)
    }
}