import { TextField, TextFieldProps } from '@mui/material';
import { useEffect, useMemo, useState } from 'react';
import type { ChangeEvent, KeyboardEvent } from 'react';
import { v4 as uuidv4 } from 'uuid';

export interface CodeInputProps extends TextFieldProps<'standard'> {
    numberOfDigits?: number;
    value: string;
    setValue: (value: string) => void;
}

const CodeInput = ({
    numberOfDigits = 6,
    value: codeValue,
    setValue,
    ...props
}: CodeInputProps) => {
    const [values, setValues] = useState<string[]>(
        new Array(numberOfDigits).fill(''),
    );
    const ids = useMemo<string[]>(() => {
        const arr = [];
        for (let i = 0; i < numberOfDigits; i++) {
            arr.push(uuidv4());
        }
        return arr;
    }, [numberOfDigits]);

    useEffect(() => {
        let code = '';
        for (const letter of values) {
            code += letter;
        }
        setValue(code);
    }, [setValue, values]);

    return (
        <div className='flex space-x-4'>
            {ids.map((id: string, index: number, array: string[]) => (
                <TextField
                    {...props}
                    className='w-12 rounded bg-white'
                    key={id}
                    id={id}
                    inputProps={{
                        style: { textAlign: 'center' },
                        maxLength: 1,
                        onKeyDown: (event: KeyboardEvent<HTMLInputElement>) => {
                            console.log(event.key, codeValue[index]);
                            if (
                                event.key === 'Backspace' &&
                                !codeValue[index]
                            ) {
                                event.preventDefault();
                                setValues((prev: string[]) => {
                                    prev[index] = '';
                                    return prev;
                                });
                                document
                                    .getElementById(array[index - 1])
                                    ?.focus();
                            }
                        },
                        ...props.inputProps,
                    }}
                    value={values[index]}
                    onChange={(event: ChangeEvent<HTMLInputElement>) => {
                        const value = event.target.value;
                        setValues((prev: string[]) => {
                            prev[index] = value;
                            return prev;
                        });
                        if (value) {
                            if (index == numberOfDigits - 1) return;
                            document.getElementById(array[index + 1])?.focus();
                        } else {
                            if (index == 0) return;
                            document.getElementById(array[index - 1])?.focus();
                        }
                    }}
                />
            ))}
        </div>
    );
};

export default CodeInput;
