import {Router} from 'express';
import multer from 'multer';

import OrfanatosController from './controllers/OrfanatosController';
import uploadConfig from './config/upload';

const routes = Router();
const upload = multer(uploadConfig); 

routes.get('/orfanatos', OrfanatosController.index);
routes.get('/orfanatos/:id', OrfanatosController.show);


routes.post('/orfanatos', upload.array('images'),OrfanatosController.create);

export default routes;