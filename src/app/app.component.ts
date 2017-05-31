import { Component } from '@angular/core';
import { NvD3Module } from 'angular2-nvd3';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  public data = [];
  private nvD3: NvD3Module;
  public options = {
    chart: {
      type: 'lineChart',
      height: 450,
      x: function (d) { return d.year; },
      y: function (d) { return d.score; },
      showValues: true,

      transitionDuration: 500,
      xAxis: {
        axisLabel: 'X Axis'
      },
      yAxis: {
        axisLabel: 'Y Axis',
      }
    }
  };
  public changeListener($event): void {
    this.upload($event.target);
  }
  private upload(inputValue: any): void {

    var file: File = inputValue.files[0];
    var reader: FileReader = new FileReader();
    reader.onloadend = (e => {
      var csvData = reader.result;
      console.log(csvData);
      this.prepareChartData(csvData);
    });
    reader.onerror = () => {
      alert('Unable to read ' + file);
    };
    reader.readAsText(file);
  }
  private prepareChartData(value: any): void {
    var lines = value.split('\n');
    var finalObj = {};
    for (var line = 0; line < lines.length; line++) {
      var arr = lines[line].split(',');
      var list = [];
      arr.forEach((key, i) => {
        if (i != 0) {
          list.push({ "year": key.split('|')[0], "score": key.split('|')[1] });
        }
      });
      finalObj[arr[0]] = list;
    }
    Object.keys(finalObj).forEach((item) => {
      this.data.push({ 'key': item, "values": finalObj[item] });
    });
  }
}
