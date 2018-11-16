// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  config: {
    api: "http://localhost:8080/api/v1/",
    login: "http://localhost:8080/login",
    uploads: "http://localhost:8080/files/upload"
    // api: "http://77.55.219.133:8080/bookstore/api/v1/",
    // login: "http://77.55.219.133:8080/bookstore/login",
    // uploads: "http://77.55.219.133:8080/bookstore/files/upload"
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
