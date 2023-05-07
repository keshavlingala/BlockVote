// This file can be replaced during build_old by using the `fileReplacements` array.
// `ng build_old --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  campaignFactory: {
    // Gaache Address
    address: '0x4b5aE7300fBD0f6cf671ADF70dE53Fc6C8B1B54A',
    // Sepolia Address
    // address: '0x41e2d4640487f9a565A8D3de21c5b7F75eF8ca1B',
    options: {
      gasPrice: '20000000000',
    },
  },
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
