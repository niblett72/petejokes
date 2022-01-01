import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { trigger, state, style, animate, transition, group } from '@angular/animations';
//Modified tsconfig.app.json to get jquery '$' to work.
//Replaced the value of "module" parameter from es2015 => commonjs
//Found this solution online...

export enum alertTypes {
    Info = "info",
    Success = "success",
    Warning = "warning",
    Error = "error"
}

@Component({
    selector: 'app-alert',
    template: `
        <div
            [@alert]="showAlert"
            id="alert-container"
            style="position:fixed; bottom: 2px; right: 2px; z-index: 9000"
            class="alert"
            [class.alert-success]="msgData.type=='success'"
            [class.alert-info]="msgData.type=='info'"
            [class.alert-warning]="msgData.type=='warning'"
            [class.alert-danger]="msgData.type=='error'">
            <strong>{{msgData.msg}}</strong>
        </div>
   `,
    animations: [
        trigger('alert', [
            state('*', style({ opacity: .0 })),
            transition('* => true, * => false',
                group([
                    animate('1s ease', style({ opacity: 1 })),
                    animate('2s 2.5s ease', style({ opacity: 0 }))
                ])
            ),
        ])
    ]
})
export class AlertsComponent implements OnChanges {
    showAlert: any = "";
    constructor() { }
    @Input() msgData: any; //{ msg: '', type: '' }
    ngOnChanges(changes: SimpleChanges) {
        const msgData = changes.msgData;
        this.msgData = msgData.currentValue;
        if (this.msgData.msg) {
            if (!this.showAlert) {
                this.showAlert = true;
            } else {
                this.showAlert = !this.showAlert;
            }
        }
    }
}
