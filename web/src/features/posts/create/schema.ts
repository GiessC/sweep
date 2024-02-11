import Validation from '@/config/validation.json';
import { MAX_LENGTH, MIN_LENGTH, REQUIRED } from '@/errors/ErrorMessages';
import * as Yup from 'yup';

export const MIN_TITLE_LENGTH = Validation.Posts.MIN_TITLE_LENGTH;
export const MAX_TITLE_LENGTH = Validation.Posts.MAX_TITLE_LENGTH;
export const MIN_CONTENT_LENGTH = Validation.Posts.MIN_CONTENT_LENGTH;
export const MAX_CONTENT_LENGTH = Validation.Posts.MAX_CONTENT_LENGTH;

const createPostSchema = Yup.object({
    title: Yup.string()
        .nonNullable()
        .required(REQUIRED('Title'))
        .min(MIN_TITLE_LENGTH, MIN_LENGTH('Title', MIN_TITLE_LENGTH))
        .max(MAX_TITLE_LENGTH, MAX_LENGTH('Title', MAX_TITLE_LENGTH)),
    content: Yup.string()
        .nonNullable()
        .required(REQUIRED('Content'))
        .min(MIN_CONTENT_LENGTH, MIN_LENGTH('Content', MIN_CONTENT_LENGTH))
        .max(MAX_CONTENT_LENGTH, MAX_LENGTH('Content', MAX_CONTENT_LENGTH)),
});

export default createPostSchema;
