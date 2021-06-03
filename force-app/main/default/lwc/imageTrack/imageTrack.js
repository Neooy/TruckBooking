
import LightningDatatable from 'lightning/datatable';
import salesforcec from './salesforcec.html';

export default class ImageTrack extends LightningDatatable  {
    static customTypes = {
        image: {
            template: salesforcec
        }
    };
}