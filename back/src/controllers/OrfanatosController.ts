import {Request, Response} from 'express';
import {getRepository} from 'typeorm';
import Orfanato from '../models/Orfanato';
import orfanatoView from '../views/orfanato_view';

import * as Yup from 'yup'

export default {
    async index(request: Request, response: Response){
        const orfantoRepository = getRepository(Orfanato);
        const orfanatos = await orfantoRepository.find({
            relations: ['images']
        });

        return response.json(orfanatoView.renderMany(orfanatos));
    },
    async show(request: Request, response: Response){
        const id =  request.params.id;
        const orfantoRepository = getRepository(Orfanato);
        const orfanato = await orfantoRepository.findOneOrFail(id, {
            relations: ['images']
        });

        return response.json(orfanatoView.render(orfanato));
    },
    async create(request: Request, response: Response){
        const {
            name,
            latitude,
            longitude,
            about,
            instructions,
            opening_hours,
            open_on_weekends
        } = request.body;
    
        const orfantoRepository = getRepository(Orfanato);
        const requestImages = request.files as Express.Multer.File[];
        const images = requestImages.map(image =>{
            return {path: image.filename}
        })
        
        const data = {
            name,
            latitude,
            longitude,
            about,
            instructions,
            opening_hours,
            open_on_weekends: open_on_weekends === 'true',
            images
        }

        const schema = Yup.object().shape({
            name: Yup.string().required(),
            latitude: Yup.number().required(),
            longitude: Yup.number().required(),
            about: Yup.string().required().max(300),
            instructions: Yup.string().required(),
            opening_hours: Yup.string().required(),
            open_on_weekends: Yup.boolean().required(),
            images: Yup.array(Yup.object().shape({
                path: Yup.string().required()
            }))
        });

        await schema.validate(data, {
            abortEarly: false,
        })
        const orfanato = orfantoRepository.create(data);
    
        await orfantoRepository.save(orfanato);
        return response.status(201).json(orfanato)
    }
};