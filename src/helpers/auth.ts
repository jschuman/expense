import axios from "axios";
import { Request, Response, NextFunction } from "express";

async function verifyAccessToken(accessToken: string): Promise<any> {
  const response = await axios.get(`https://www.googleapis.com/oauth2/v1/tokeninfo?access_token=${accessToken}`);
  return response.data; // This contains the token information
}

function ensureAuthenticated(req: Request, res: Response, next: NextFunction): void {
  const swaggerReferer = req?.headers?.referer?.endsWith("/api-docs/");
  
  if (swaggerReferer) {
    //check for bearer token
    const authHeader: string | undefined = req.headers.authorization;
    if (authHeader && authHeader.startsWith("Bearer ")) {
      const token = authHeader.split(" ")[1];
      if (token) {
        verifyAccessToken(token)
          .then(tokenInfo => {
            req.user = tokenInfo; // Add user info to request
            return next();
          })
          .catch(err => {
            console.log(err);
            res.status(401).send("Invalid token");
          });
      } else {
        res.status(401).send("Unauthorized");
      }
    } else {
      res.status(401).send("Unauthorized");
    }
  } else {
    if (req.isAuthenticated()) {
      return next();
    }

    res.redirect(`/auth/google?redirect=${encodeURIComponent(req.originalUrl)}`);
  }
}

export default ensureAuthenticated;