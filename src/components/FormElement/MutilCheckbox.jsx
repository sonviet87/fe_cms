import { Checkbox, Grid } from '@mui/material';
import React from 'react';
import { useController } from 'react-hook-form';

const MutilCheckBox = ({ options, control, name }) => {
    const { field } = useController({
        control,
        name
    });

    return (
        <>
            {options?.map((option, index) => (
                <Grid item xs={2} key={index}>
                    <Checkbox
                        onChange={(e) => {
                            const valueCopy = [...field.value];
                            if (e.target.checked) {
                                valueCopy.push(e.target.value); // append to array
                            } else {
                                const idx = valueCopy.findIndex(item => item === option.id.toString());
                                valueCopy.splice(idx, 1); // remove from array
                            }
                            field.onChange(valueCopy);
                        }}

                        checked={field.value.includes(option.id.toString())}
                        value={option.id}

                    />
                    <span>{option.name}</span>
                </Grid>
            ))}
        </>
    );
};
export default MutilCheckBox;