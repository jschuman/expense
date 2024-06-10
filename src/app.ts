// Set up Express server
import express from 'express';
import passport, { Profile } from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import session from 'express-session';
import dotenv from 'dotenv';

dotenv.config();

const app: express.Application = express();
const port: number = parseInt(process.env.PORT || '3000');

// Middleware for parsing JSON
app.use(express.json());

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID ?? '',
    clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? '',
    callbackURL: "http://localhost:3001/auth/google/callback"
},
    async function (accessToken: string, refreshToken: string, profile: Profile, cb: Function) {        
        const [user, created] = await UserModel.findOrCreate({ 
            where: { googleId: profile.id }, 
            defaults: {
                email: profile?.emails ? profile.emails[0]?.value : '',
                firstName: profile?.name?.givenName,
                lastName: profile?.name?.familyName
            }
        });
        
        return cb(null, user);
    }
));

// use sessions
app.use(session({ 
    secret: process.env.SESSION_SECRET ?? '', 
    resave: false, 
    saveUninitialized: false 
}));

app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(function(user: any, done: Function) {
    done(null, user.id);
});
  
passport.deserializeUser(function(id, done) {
    UserModel.findByPk(id)
    .then((user: any) => {
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
  } catch (error: any) {
      console.error("Unable to connect to the database:", error.original);
  }
};  

initApp();

// import routes
const routes = require("./routes");
app.use('/', routes);

// import swagger
import swagger from './swagger';
swagger(app);