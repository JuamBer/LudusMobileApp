// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  firebase: {
    apiKey: "AIzaSyCmr0NS0VSEyAISiEilAt3S1gnWHYiME5g",
    authDomain: "luduschatarum.firebaseapp.com",
    projectId: "luduschatarum",
    storageBucket: "luduschatarum.appspot.com",
    messagingSenderId: "1045763538471",
    appId: "1:1045763538471:web:a918b002e20f9104085802"
  },

  routes: {
    login: 'auth/login',
    register: 'auth/register',

    home: 'sections/favs',
    explore: 'sections/home',
    home_game: 'sections/home/game',

    favs: 'sections/favs',
    profile: 'sections/profile',
    profile_settings: 'sections/profile/settings',
    admin: 'sections/admin',
    admin_add_game: 'sections/admin-add-game',
  },

  db_tables: {
    games: 'games',
    users: 'users',
    reviews: 'reviews',
    genders: 'genders',
    types: 'types',
    complexities: 'complexities'
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
// Import the functions you need from the SDKs you need
