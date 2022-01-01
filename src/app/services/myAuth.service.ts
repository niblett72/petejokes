import { Injectable } from "@angular/core";
import { AngularFireAuth } from "angularfire2/auth";

@Injectable()
export class MyAuthService {


  authState: any = null;

  constructor(private afAuth: AngularFireAuth) {

            this.afAuth.authState.subscribe((auth) => {
              this.authState = auth;
            });
          }

  anonymousLogin() {
    return this.afAuth.auth.signInAnonymously()
        .then((user) => {
            this.authState = user
        })
        .catch(err => {
            console.error(err);

        });
    }

    signOut(): void {
        this.afAuth.auth.signOut();
    }

}