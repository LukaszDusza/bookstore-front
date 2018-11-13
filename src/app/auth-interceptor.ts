import { Injectable } from "@angular/core";
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpResponse, HttpHeaders, } from "@angular/common/http";
import { Observable } from "rxjs";
import { tap } from 'rxjs/operators';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        //   const idToken = JSON.stringify(localStorage.getItem('AUTH_TOKEN'));
        const idToken = localStorage.getItem("AUTH_TOKEN");

        if (idToken) {

          //  console.log(idToken)
            const request = req.clone({

                // headers: new HttpHeaders({ 
                //     'Authorization': localStorage.getItem("AUTH_TOKEN"),
                //     'Content-Type': 'application/json',
                //     'Access-Control-Allow-Headers': 'Authorization'

                // })

                headers:
                    req.headers
                    .set('Authorization', localStorage.getItem("AUTH_TOKEN"))
                  //  .set('Content-Type', 'application/json')
                    

                        //    .set('Authorization', idToken)
                //  .set("Access-Control-Allow-Origin", "*")
                // .set("Access-Control-Allow-Methods", "POST, GET, OPTIONS, DELETE, PUT")    
                //  .set("access-control-expose-headers", "Authorization")   
                //  .set("Access-Control-Allow-Headers", "Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With")                        
            });
            return next.handle(request);

        } else {            
            return next.handle(req).pipe(tap((ev: HttpEvent<any>) => {
                if (ev instanceof HttpResponse) {
                    console.log("procesing response", ev);
                }
            })
            )
        }
    }
}