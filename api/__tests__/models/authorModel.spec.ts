import Author from '../../models/authorModel';
import saveWithEmptyData from './tools/saveWithEmptyData'

saveWithEmptyData<typeof Author>(Author);
