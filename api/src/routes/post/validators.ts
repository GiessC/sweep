import { LENGTH, REQUIRED, TYPE } from '../../types/ErrorMessages';
import { body } from 'express-validator';
import { Post as config } from '../../../config/config.json';

const MIN_TITLE_LENGTH = config.Validation.MIN_TITLE_LENGTH;
const MAX_TITLE_LENGTH = config.Validation.MAX_TITLE_LENGTH;
const MIN_CONTENT_LENGTH = config.Validation.MIN_CONTENT_LENGTH;
const MAX_CONTENT_LENGTH = config.Validation.MAX_CONTENT_LENGTH;

export const createPostRequestValidators = [
    body(['title', 'content']).escape(),
    body('title')
        .isString()
        .withMessage(TYPE('Title', 'string'))
        .notEmpty({ ignore_whitespace: true })
        .withMessage(REQUIRED('Title'))
        .isLength({
            min: MIN_TITLE_LENGTH,
            max: MAX_TITLE_LENGTH,
        })
        .withMessage(LENGTH('Title', MIN_TITLE_LENGTH, MAX_TITLE_LENGTH)),
    body('content')
        .isString()
        .withMessage(TYPE('Content', 'string'))
        .notEmpty({ ignore_whitespace: true })
        .withMessage(REQUIRED('Content'))
        .isLength({
            min: MIN_CONTENT_LENGTH,
            max: MAX_CONTENT_LENGTH,
        })
        .withMessage(LENGTH('Content', MIN_CONTENT_LENGTH, MAX_CONTENT_LENGTH)),
];

export const getAllPostsRequestValidators = [];

export const getPostRequestValidators = [];

export const updatePostRequestValidators = [
    body(['title', 'content']).escape(),
    body('title').isLength({
        min: MIN_TITLE_LENGTH,
        max: MAX_TITLE_LENGTH,
    }),
    body('content').isLength({
        min: MIN_CONTENT_LENGTH,
        max: MAX_CONTENT_LENGTH,
    }),
];

export const deletePostRequestValidators = [];
