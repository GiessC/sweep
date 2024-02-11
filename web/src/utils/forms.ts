import { yupResolver } from '@hookform/resolvers/yup';
import {
    DefaultValues,
    FieldValues,
    Resolver,
    UseFormProps,
} from 'react-hook-form';
import { ObjectSchema } from 'yup';

export const USE_FORM_CONFIG = <T extends FieldValues>(
    defaultValues: DefaultValues<T>,
    schema: ObjectSchema<T>,
): UseFormProps<T> => {
    return {
        defaultValues,
        resolver: yupResolver(schema) as unknown as Resolver<T, any>,
        reValidateMode: 'onBlur',
        mode: 'onTouched',
    };
};
