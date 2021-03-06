# Novatore Authentication Boilerplate

Novatore Authentication Boilerplate is a Node.js (sample) app to perform authentication with **Twitter**, **Facebook**, **LinkedIn**, **Google** using [passport](http://passportjs.org/).

Most of the code is related to **Contribute dot cloud** application.

## Features Included In Current Implementation

1. Signin UI with signin API
2. Signup UI with signup API (with two roles: student and teacher)
3. Confirmation email to user when signing up using [Node Mailer](https://www.npmjs.com/package/nodemailer) (Use you own key)
4. Role-based redirecton to different views after successful signin


## Main Libraries For Authentication

1. [Passport](https://www.npmjs.com/package/passport)
2. [Passport Facebook](https://www.npmjs.com/package/passport-facebook)
3. [Passport Twitter](https://www.npmjs.com/package/passport-twitter)
4. [Passport Google](https://www.npmjs.com/package/passport-google-oauth)
5. [Passport LinkedIn](https://www.npmjs.com/package/passport-linkedin)

## Implementation Example With Instructions(Facebook):

1. Create a facebook app from developers console. Copy app-secret, app id and paste in auth.js file. Also set the callback URL in your  facebook app

       //auth.js
       'facebookAuth' : {
               'clientID'      : 'FACEBOOK_APP_ID', // your App ID
               'clientSecret'  : 'FACEBOOK_APP_SECRET', // your App Secret
               'callbackURL'   : 'http://www.example.com/auth/facebook/callback'
        }
        
2. Hit that route from front-end like `<a href="/auth/facebook">Login with Facebook</a>`

    `app.get('/auth/facebook', passport.authenticate('facebook'));`


3. Url that is called by Facebook upon successful authentication

    `app.get('/auth/facebook/callback', passport.authenticate('facebook'));`


4. Code in `passport.js`


       var configAuth = require('./auth');
       var FacebookStrategy = require('passport-facebook').Strategy;
       passport.use(new FacebookStrategy({
           clientID: configAuth.facebookAuth.clientID,
           clientSecret: configAuth.facebookAuth.clientSecret,
           callbackURL: configAuth.facebookAuth.callbackURL,
          },
         function(accessToken, refreshToken, profile, done) {
           User.findOrCreate(..., function(err, user) {
            if (err) { return done(err); }
             done(null, user);
            });
          }
        ));


5. Follow a similar process for other social networks

**Note:** Email may or may not be recieved from a social network depending on its availability or the user's privacy settings.


## How to Run (prerequisites: mongodb, node and npm)

1. Run Mongodb (mongo url can be changed from server.js)
2. Install node modules `npm install`
3. Create log file `contribute-dot-cloud` in your local system like `/var/log/contribute-dot-cloud.log`
4. Run the app by passing configuration file `node app.js --config contribute-dot-cloud.json`
