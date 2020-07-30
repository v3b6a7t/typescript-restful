import Book from '../../models/bookModel';
import saveWithEmptyData from './tools/saveWithEmptyData'

saveWithEmptyData<typeof Book>(Book);
