import { Component, Input,Output, EventEmitter } from '@angular/core';

export interface Task {
  id?:number,
  description:string,
  checked:boolean
}

@Component({
  selector: 'my-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent {

  @Input() task:Task;
  @Output() deleteElement = new EventEmitter<Task>();
  @Output() checked = new EventEmitter<Task>();
  deleteItem(){
    this.deleteElement.emit()
  }

  checkItem(){
    this.checked.emit()
  }


}
