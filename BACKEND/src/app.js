import express, { json } from "express";
import cors from 'cors';
import morgan from 'morgan';

import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUI from 'swagger-ui-express';
import { options } from "./swaggerOptions";

const specs = swaggerJSDoc(options);

import MaterialesRoutes from './routes/materiales';
import OrdenesRoutes from './routes/ordenes';
import MaterialesOrdenesRoutes from './routes/materialesOrdenes'


const app = express();
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

//app.use(MaterialesRoutes);
app.use(OrdenesRoutes, MaterialesRoutes, MaterialesOrdenesRoutes);

app.use("/docs", swaggerUI.serve, swaggerUI.setup(specs));

export default app;
