// Set up Express server
const express = require('express');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const session = require('express-session');
require('dotenv').config();

const app = express();
const port = 3000;

// Middleware for parsing JSON
app.use(express.json());

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:3000/auth/google/callback"
},
    async function (accessToken, refreshToken, profile, cb) {
        const [user, created] = await UserModel.findOrCreate({ 
            where: { googleId: profile.id }, 
            defaults: {
                email: profile.emails[0].value,
                firstName: profile.name.givenName,
                lastName: profile.name.familyName
            }
        });
        
        return cb(null, user);
    }
));

// use sessions
app.use(session({ 
    secret: process.env.SESSION_SECRET, 
    resave: false, 
    saveUninitialized: false 
}));

app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(function(user, done) {
    done(null, user.id);
});
  
passport.deserializeUser(function(id, done) {
    UserModel.findByPk(id)
    .then((user) => {
        done(null, user);
    });
});

const db = require("./models");
const sequelize = db.sequelize;
const UserModel = db.User;

const initApp = async () => {
  console.log("Testing the database connection..");
  
  /**
   * Test the connection.
   * You can use the .authenticate() function to test if the connection works.
   */
  try {
      await sequelize.authenticate();
      console.log("Connection has been established successfully.");
      
      //Start the web server on the specified port.
      app.listen(port, () => {
          console.log(`Server is up and running at: http://localhost:${port}`);
      });
  } catch (error) {
      console.error("Unable to connect to the database:", error.original);
  }
};  

initApp();

// import routes
const routes = require("./routes");
app.use('/', routes);

// import swagger
const swagger = require('./swagger');
swagger(app);