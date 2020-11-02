import Orfanato from '../models/Orfanato';
import images_view from './images_view';
import ImageView from './images_view';
export default {
    render(orfanato: Orfanato){
        return {
            id: orfanato.id,
            name: orfanato.name,
            latitude: orfanato.latitude,
            longitude: orfanato.longitude,
            about: orfanato.about,
            instructions: orfanato.instructions,
            opening_hours: orfanato.opening_hours,
            open_on_weekends: orfanato.open_on_weekends,
            images: images_view.renderMany(orfanato.images),

        }
    },
    
    renderMany(orfanatos: Orfanato[]){
        return orfanatos.map(orfanato => this.render(orfanato));
    }
}