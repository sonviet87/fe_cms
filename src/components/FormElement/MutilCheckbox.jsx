import { Checkbox } from '@mui/material';
import React from 'react';
import { useController } from 'react-hook-form';


const MutilCheckBox = ({ options, control, name }) => {
    const { field } = useController({
        control,
        name
    });
    const [value, setValue] = React.useState(field.value || []);

    return (
        <>
            {options.map((option, index) => (
                <>
                    {console.log("mutl", value.includes(option.id))}
                    <Checkbox
                        onChange={(e) => {
                            const valueCopy = [...value];

                            // update checkbox value
                            valueCopy[index] = e.target.checked ? e.target.value : null;
                            console.log("valueCopy", valueCopy);
                            // send data to react hook form
                            field.onChange(valueCopy);

                            // update local state
                            setValue(valueCopy);
                        }}
                        key={option.id}
                        checked={value.includes(option.id)}
                        value={option.id}
                        label={option.name}
                    />
                </>
            ))}
        </>
    );
};
export default MutilCheckBox;