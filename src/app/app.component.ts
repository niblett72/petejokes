import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { MyAuthService } from './services/myAuth.service';
import { CommonService } from './services/common.service';

export interface peteJoke {
    jokeMeter: number;
    saidWhat: string;
    saidOn: Date;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
    peteJokes: peteJoke[];
    peteJoke: any;
    alert: any;
    constructor(private fire: AngularFirestore, private common: CommonService, myAuth: MyAuthService) {
        myAuth.anonymousLogin();
    }
    ngOnInit() {
        this.common.getAlert()
            .subscribe(
                (msg: any) => {
                    this.alert = msg;
                }
            );
        this.initpeteJoke();
        this.loadJokes();
    }
    addJoke(): void {
        if (this.isValid()) {
            this.fire.collection<peteJoke>('/jokes').add(this.peteJoke);
            this.common.alertSuccess("Joke context added.")
            this.loadJokes();
        } else {
            this.common.alertWarning("You must build out a context.");
        }
    }
    loadJokes(): void {
        this.fire.collection<peteJoke>('/jokes', q => q.orderBy('saidOn', 'desc')).valueChanges()
            .subscribe(
                jokes => {
                    this.peteJokes = jokes;
                    this.initpeteJoke();
                }
            )
    }
    initpeteJoke(): void {
        this.peteJoke = {
            saidOn: null,
            saidWhat: "",
            jokeMeter: 0
        }
    }
    isValid(): boolean {
        if (this.peteJoke.saidOn == null) return false;
        if (this.peteJoke.saidWhat == "") return false;
        if (this.peteJoke.jokeMeter == 0) return false;
        return true;
    }
}
