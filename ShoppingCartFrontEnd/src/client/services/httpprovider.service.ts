import {Injectable} from '@angular/core';
import {Http, Response, Request, RequestMethod, Headers} from '@angular/http';
 
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

@Injectable()
export class HttpServiceProvider
{
    domain:string ="http://localhost:8080/";
    http:Http;
    constructor(http:Http)
    {
        this.http = http;
    }

    requestForHttp(url:string, method:string, data:any, headersFromRequest:Headers)
    {
        let headers = new Headers();
        headers.append('Content-Type','application/json');

        if(headersFromRequest !== undefined && headersFromRequest !== null)
        {
           Object.keys(headersFromRequest).forEach(function(key)
           {
               headers.append(key, headersFromRequest[key]);
           })
        }

let requestMethod : any;
        if(method=== "GET"){ requestMethod = RequestMethod.Get}
        else if(method=== "POST"){ requestMethod = RequestMethod.Post}
        else if(method=== "PUT"){ requestMethod = RequestMethod.Put}
        else if(method=== "DELETE"){ requestMethod = RequestMethod.Delete}
        else if(method=== "PATCH"){ requestMethod = RequestMethod.Patch}
        else{ requestMethod = RequestMethod.Get}


        return this.http.request(new Request({
            method:requestMethod, 
            url:url, 
            body:JSON.stringify(data), 
            headers:headers
        })).map((response:Response)=> { 
                                console.log("response.json() :" +response.json());
                                return response.json();
                            }
                ).catch((error:Response) => {
                                console.log("error.json() :" + JSON.stringify(error.json()) );
                                return Observable.throw(error.json());
                }
                );    
    }
}