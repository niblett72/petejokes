import { Component, Input, forwardRef, OnInit, Output, EventEmitter, ElementRef, AfterContentInit } from "@angular/core";
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from "@angular/forms";

@Component({
    selector: 'n-scales',
    templateUrl: 'scales.component.html',
    styleUrls: ['scales.component.css'],
    providers: [{
        provide: NG_VALUE_ACCESSOR,
        useExisting: forwardRef(() => ScalesComponent),
        multi: true
    }]
})
export class ScalesComponent implements ControlValueAccessor, OnInit {
    model: number;
    constructor() {}
    ngOnInit() {}
    @Input() set value(val: number) {
        this.model = val;
    }
    @Output() select: EventEmitter<any> = new EventEmitter();
    onChange = (value: number) => {};
    onTouched = () => {};
    writeValue(value: number): void {
        this.onChange(value);
        this.onTouched();
        this.select.emit(null);
    }
    registerOnChange(fn: (value: number) => void): void {
        this.onChange = fn;
    }
    registerOnTouched(fn: () => void): void {
        this.onTouched = fn;
    }

}