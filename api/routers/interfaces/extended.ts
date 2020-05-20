import { Request } from 'express';
import { DocumentType } from './types';

export interface RequestExt extends Request {
    docFoundById?: DocumentType;
    docProcessed?: DocumentType;
}