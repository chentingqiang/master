import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CheckBoxService {
  constructor() { }
  listOfSelection = [
    {
      text: '全选',
      onSelect: () => {
        this.checkAll(true);
      }
    },
    {
      text: '选中偶数行',
      onSelect: () => {
        this.listOfDisplayData.forEach((data, index) => (this.mapOfCheckedId[data.id] = index % 2 !== 0));
        this.refreshStatus();
      }
    },
    {
      text: '选中奇数行',
      onSelect: () => {
        this.listOfDisplayData.forEach((data, index) => (this.mapOfCheckedId[data.id] = index % 2 === 0));
        this.refreshStatus();
      }
    }
  ];
  isAllDisplayDataChecked = false;
  isIndeterminate = false;
  listOfDisplayData: any[] = [];
  mapOfCheckedId: { [key: string]: boolean } = {};//选中的map
  // Array<{ id: number; name: string; age: number; address: string }>
  currentPageDataChange($event: any): void {
    console.log('初始化event', $event);
    this.listOfDisplayData = $event;
    this.refreshStatus();
  }
  refreshStatus(): void {
    this.isAllDisplayDataChecked = this.listOfDisplayData.every(item => this.mapOfCheckedId[item.id]);
    this.isIndeterminate =
      this.listOfDisplayData.some(item => this.mapOfCheckedId[item.id]) && !this.isAllDisplayDataChecked;
  }
  checkAll(value: boolean): void {
    this.listOfDisplayData.forEach(item => (this.mapOfCheckedId[item.id] = value));
    this.refreshStatus();
  }
}
