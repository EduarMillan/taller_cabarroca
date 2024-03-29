import express from 'express';
import cors from 'cors';
import morgan from 'morgan';

import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUI from 'swagger-ui-express';
import options from './swaggerOptions';

import MaterialesRoutes from './routes/materiales';
import OrdenesRoutes from './routes/ordenes';
import MaterialesOrdenesRoutes from './routes/materialesOrdenes';
import MaterialesPreciosRoutes from './routes/precio_Materiales';

const specs = swaggerJSDoc(options);

const app = express();
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

// app.use(MaterialesRoutes);
app.use(OrdenesRoutes, MaterialesRoutes, MaterialesOrdenesRoutes, MaterialesPreciosRoutes);

app.use('/docs', swaggerUI.serve, swaggerUI.setup(specs));

export default app;
