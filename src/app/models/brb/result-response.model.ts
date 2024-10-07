import { GeneralOptions } from './general-options.model';

export interface ResultResponse {
    'resultId': string;
    'username': string;
    'content': GeneralOptions;
    'resultDate': Date;
}