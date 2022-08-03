import { Component } from '@angular/core';

import { groupBy, GroupResult } from '@progress/kendo-data-query';

interface Sample {
    interval: number;
    service: string;
    yvalue: number;
}

interface Sample2 {
    interval: Date;
    service: string;
    yvalue: number;
}

@Component({
    selector: 'my-app',
    template: `
    
    ---GRAFICO 1---

        <kendo-chart>
          <kendo-chart-series>
            <kendo-chart-series-item
                *ngFor="let serie of series"
                [data]="serie.items" 
                [markers]="{ visible: false }"
                [name]="serie.value + ' ciao'"   
                field="yvalue"                                                                     
                categoryField="interval"
                type="line">
            </kendo-chart-series-item>
          </kendo-chart-series>
        </kendo-chart>

        ---GRAFICO 2---

        <kendo-chart>
        <kendo-chart-series>
          <kendo-chart-series-item
              *ngFor="let serie of series2"
              [data]="serie.items" 
              [markers]="{ visible: false }"
              [name]="serie.value + ' ciao'"   
              field="yvalue"                                                                     
              categoryField="interval"
              type="line">
          </kendo-chart-series-item>
        </kendo-chart-series>
      </kendo-chart>
    `
})
/**
 *  [data]="serie.items"            // variabile (array) da cui prendere la serie
    [name]="serie.value + ' ciao'"  // Nome della linea nella legenda  
    field="yvalue"                  // Valore asse Y          
    categoryField="interval"        // Valore asse X
    type="line"
    >
 */

export class AppComponent {
    public data: Sample[] = [{
        interval: 1, service: 'Service 1', yvalue: 0
    }, {
        interval: 2, service: 'Service 1', yvalue: 0
    }, {
        interval: 3, service: 'Service 1', yvalue: 0
    }, {
        interval: 1, service: 'Service 2', yvalue: 0
    }, {
        interval: 2, service: 'Service 2', yvalue: 0
    }, {
        interval: 3, service: 'Service 2', yvalue: 0
    }];

    public data2: Sample2[] = [{
        interval: new Date(2018, 11, 1), service: 'Service 1', yvalue: 0
    }, {
        interval: new Date(2018, 11, 2), service: 'Service 1', yvalue: 1
    }, {
        interval: new Date(2018, 11, 3), service: 'Service 1', yvalue: 2
    }, {
        interval: new Date(2018, 11, 4), service: 'Service 2', yvalue: 3
    }, {
        interval: new Date(2018, 11, 5), service: 'Service 2', yvalue: 4
    }, {
        interval: new Date(2018, 11, 6), service: 'Service 2', yvalue: 5
    }];

    public series: GroupResult[];
    public series2: GroupResult[];

    constructor() {
        this.series = groupBy(this.data, [{ field: 'service' }]) as GroupResult[];
        this.series2 = groupBy(this.data2, [{ field: 'service' }]) as GroupResult[];

        // Inspect the resulting data structure in the console
        console.log(JSON.stringify(this.series, null, 4));
    }
}
