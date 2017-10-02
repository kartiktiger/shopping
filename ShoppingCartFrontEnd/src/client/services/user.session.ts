import {Injectable} from '@angular/core';


export interface userSession
{
    userid:string;
    username:string;
    userrole:string;
    loggedin: boolean;
}

@Injectable()
export class UserSession implements userSession {

    public userid: string = null;
    public  username: string = null;
    public  userrole: string = null;
    public  loggedin: boolean = false; 

    constructor(){}

    isLoggedin(){     return this.loggedin;      }
    getUserRole(){    return this.userrole;     }
    getUsername(){      return this.username;     }
    getUserdetails(){
        return {userid: this.userid, username: this.username, userrole: this.userrole,loggedin: this.loggedin};
    }

    resetDetails(){
        this.username = null; 
        this.userrole = null; 
        this.loggedin = false; 
        this.userid = null; 
    }
    setDetails(data: any){
        this.userid = data.id; 
        this.username = data.username;
        this.userrole = data.role; 
        this.loggedin = true; 
    }
}