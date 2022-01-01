import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { ScalesComponent } from './scales/scales.component';
import { AlertsComponent } from './alerts/alerts.component';

@NgModule({
    declarations: [
        ScalesComponent,
        AlertsComponent
    ],
    imports: [
        BrowserModule,
        FormsModule
    ],
    exports: [
        ScalesComponent,
        AlertsComponent
    ]
})
export class UIComponentsModule { }