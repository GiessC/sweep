import TextField from '@mui/material/TextField';
import type { TextFieldProps } from '@mui/material/TextField';
import { useEffect, useMemo, useState } from 'react';
import type { ChangeEvent, KeyboardEvent } from 'react';
import { v4 as uuidv4 } from 'uuid';

export interface CodeInputProps extends TextFieldProps<'standard'> {
    numberOfDigits?: number;
    setValue: (value: number) => void;
}

const CodeInput = ({
    numberOfDigits = 6,
    setValue,
    ...props
}: CodeInputProps) => {
    const [values, setValues] = useState<string[]>(
        new Array(numberOfDigits).fill(''),
    );
    const ids = useMemo<string[]>(() => {
        const arr = [];
        for (let i = 0; i < numberOfDigits; i++) {
            arr.push(`code-input-${i}`);
        }
        return arr;
    }, [numberOfDigits]);

    useEffect(() => {
        let code = '';
        for (const letter of values) {
            code += letter;
        }
        setValue(Number(code));
    }, [setValue, values]);

    const goToNext = (index: number) => {
        document.getElementById(ids[index + 1])?.focus();
    };

    const goToPrevious = (index: number) => {
        document.getElementById(ids[index - 1])?.focus();
    };

    return (
        <div className='flex m-auto space-x-4'>
            {ids.map((id: string, index: number) => (
                <TextField
                    {...props}
                    className='w-12 rounded bg-white'
                    key={id}
                    id={id}
                    inputProps={{
                        style: { textAlign: 'center' },
                        onKeyDown: (event: KeyboardEvent<HTMLInputElement>) => {
                            const key = event.key;
                            const value = event.currentTarget.value;
                            if (key == 'Backspace' && !value && index > 0) {
                                goToPrevious(index);
                            }
                        },
                        ...props.inputProps,
                    }}
                    value={values[index]}
                    onChange={(event: ChangeEvent<HTMLInputElement>) => {
                        const value = event.target.value;
                        if (value && isNaN(Number(value))) return;
                        if (value.length > 1) {
                            setValues((prevValues: string[]) => {
                                const newValues = structuredClone(prevValues);
                                newValues[index + 1] = value[1];
                                return newValues;
                            });
                            goToNext(index);
                            event.preventDefault();
                            return;
                        }
                        setValues((prevValues: string[]) => {
                            const newValues = structuredClone(prevValues);
                            newValues[index] = value;
                            return newValues;
                        });
                        if (value && index < numberOfDigits - 1) {
                            goToNext(index);
                        } else if (!value && index > 0) {
                            goToPrevious(index);
                        }
                    }}
                />
            ))}
        </div>
    );
};

export default CodeInput;
