import swaggerJSDoc from 'swagger-jsdoc';
import { SwaggerContact } from '../../../config/config.json';
import { version } from '../../../package.json';

const setupSwagger = () => {
    const swaggerOptions: swaggerJSDoc.Options = {
        definition: {
            openapi: '3.0.0',
            info: {
                title: 'Sweep API',
                version,
                contact: SwaggerContact,
                description: 'API for the sweep social media apps',
                license: {
                    name: 'MIT',
                    url: 'https://opensource.org/licenses/MIT',
                },
            },
        },
        apis: ['./src/routes/*.ts'],
    };
    return swaggerJSDoc(swaggerOptions);
};

export default setupSwagger;
