import {
    MAX_LENGTH,
    MIN_LENGTH,
    REQUIRED,
} from '@/api/exceptions/errorMessages';
import * as Yup from 'yup';

//#region Constants
// Posts
// TODO: Extract these to config json files
export const MIN_TITLE_LENGTH = 1;
export const MAX_TITLE_LENGTH = 40;
export const MIN_CONTENT_LENGTH = 1;
export const MAX_CONTENT_LENGTH = 300;
//#endregion

//#region Schema
// Posts
export const createPostReqSchema = Yup.object({
    title: Yup.string()
        .required(REQUIRED('Title'))
        .min(MIN_TITLE_LENGTH, MIN_LENGTH('Title', MIN_TITLE_LENGTH))
        .max(MAX_TITLE_LENGTH, MAX_LENGTH('Title', MAX_TITLE_LENGTH)),
    content: Yup.string()
        .required(REQUIRED('Content'))
        .min(MIN_CONTENT_LENGTH, MIN_LENGTH('Content', MIN_CONTENT_LENGTH))
        .max(MAX_CONTENT_LENGTH, MAX_LENGTH('Content', MAX_CONTENT_LENGTH)),
});
export const editPostReqSchema = Yup.object({
    slug: Yup.string().required(REQUIRED('Slug')),
    title: Yup.string()
        .required(REQUIRED('Title'))
        .min(MIN_TITLE_LENGTH, MIN_LENGTH('Title', MIN_TITLE_LENGTH))
        .max(MAX_TITLE_LENGTH, MAX_LENGTH('Title', MAX_TITLE_LENGTH)),
    content: Yup.string()
        .required(REQUIRED('Content'))
        .min(MIN_CONTENT_LENGTH, MIN_LENGTH('Content', MIN_CONTENT_LENGTH))
        .max(MAX_CONTENT_LENGTH, MAX_LENGTH('Content', MAX_CONTENT_LENGTH)),
});
