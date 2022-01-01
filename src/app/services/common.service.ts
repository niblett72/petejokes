import { alertTypes } from "../libraries/uicomponents/alerts/alerts.component";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";

@Injectable()
export class CommonService {
    private alertMessage$: BehaviorSubject<any>;
    constructor(){
        this.alertMessage$ = new BehaviorSubject({});
    }
    alertSuccess(msg: string): void {
        this.alertMessage$.next(this.setAlertData(msg, alertTypes.Success));
    }
    alertInfo(msg: string): void {
        this.alertMessage$.next(this.setAlertData(msg, alertTypes.Info));
    }
    alertWarning(msg: string): void {
        this.alertMessage$.next(this.setAlertData(msg, alertTypes.Warning));
    }
    alertError(msg: string): void {
        this.alertMessage$.next(this.setAlertData(msg, alertTypes.Error));
    }
    getAlert(): Observable<any> {
        return this.alertMessage$.asObservable();
    }
    setAlertData(msg: string, type: alertTypes): any {
        return {
            msg: msg,
            type: type
        };
    }
}