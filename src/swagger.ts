import swaggerJsDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { Application } from 'express';

const options = {
  definition: {
    openapi: '3.1.0',
    info: {
      title: 'Express API with Swagger',
      version: '1.0.0',
    },
    components: {
      securitySchemes: {
        OAuth2: {
          type: 'oauth2',
          flows: {
            implicit: {
              authorizationUrl: 'https://accounts.google.com/o/oauth2/v2/auth',
              scopes: {
                'openid': 'OpenID Connect scope',
                'profile': 'Access to your profile',
                'email': 'Access to your email'
              }
            }
          }
        }
      }
    }
  },
  apis: ['./src/routes/*.ts'], // files containing annotations as above
};

const specs: object = swaggerJsDoc(options);

export default function swagger(app: Application): any {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
};