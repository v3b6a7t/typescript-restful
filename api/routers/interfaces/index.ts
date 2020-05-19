import { Request } from 'express';
import { Document } from 'mongoose';

export interface ExtendedRequest extends Request {
    docFoundById?: Document;
    docProcessed?: Document;
}