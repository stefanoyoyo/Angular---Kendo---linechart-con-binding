import { Component } from '@angular/core';

import { groupBy, GroupResult } from '@progress/kendo-data-query';

interface Sample {
    interval: number;
    service: string;
    yvalue: number;
}

@Component({
    selector: 'my-app',
    template: `
        <kendo-chart>
          <kendo-chart-series>
            <kendo-chart-series-item
                *ngFor="let item of series"
                [data]="item.items" 
                [markers]="{ visible: false }"
                [name]="item.value + ' ciao'"   
                field="yvalue"                                                                     
                categoryField="interval"
                type="line">
            </kendo-chart-series-item>
          </kendo-chart-series>
        </kendo-chart>
    `
})
/**
 *  [data]="item.items"             // variabile da cui prendere la serie
    [name]="item.value + ' ciao'"   // Nome della linea nella legenda  
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

    public series: GroupResult[];

    constructor() {
        this.series = groupBy(this.data, [{ field: 'service' }]) as GroupResult[];

        // Inspect the resulting data structure in the console
        console.log(JSON.stringify(this.series, null, 4));
    }
}
