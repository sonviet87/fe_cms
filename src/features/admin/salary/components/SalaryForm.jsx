import { yupResolver } from '@hookform/resolvers/yup';
import { Grid } from '@mui/material';
import { Box } from '@mui/system';
import PropTypes from 'prop-types';
import React from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import LoadingButton from '@mui/lab/LoadingButton';
import TextFormik, {TextFieldNumber} from 'components/FormElement/TextFormik';
import BasicSelect from 'components/FormElement/SelectBox';



SalaryForm.propTypes = {
    initialValue: PropTypes.object,
    onSubmit: PropTypes.func,
};


function SalaryForm({ initialValue, onSubmit, itemValue, usersValue, accountsValue, isEdit }) {
    const validationRules = {
        salary: yup.string().required('Xin điền lương'),
        level: yup.string().required('Xin điền cấp độ lương'),

    };

    const schema = yup.object().shape(validationRules);
    const {
        control,
        handleSubmit,
        formState: { isSubmitting },
        setValue
    } = useForm({
        defaultValues: initialValue,
        resolver: yupResolver(schema),
    });

    const handleFormSubmit = async (formValues) => {
        if (!onSubmit) return;
        formValues.salary =parseFloat(formValues.salary.replace(/,/g, ''));
        await onSubmit(formValues);
    };

    React.useEffect(() => {
        if (isEdit) {
            setValue('salary', itemValue.salary);
            setValue('level', itemValue.level);


        }
    }, [itemValue]);



    return (
        <Box
            component="form"
            noValidate
            autoComplete="off"
            onSubmit={handleSubmit(handleFormSubmit)}

        >
            <Grid container spacing={2}>
                <Grid item xs={12} md={6} >
                    <TextFormik name="level" label="Cấp lương" control={control} />
                </Grid>
                <Grid item xs={12} md={6}>
                    <TextFieldNumber name="salary" label="Lương" control={control} />
                </Grid>

                <Grid item xs={12} md={12}>
                    <LoadingButton
                        onClick={handleSubmit(handleFormSubmit)}
                        color="primary"
                        loading={isSubmitting}
                        loadingIndicator="Loading..."
                        variant="contained"
                    >
                        Lưu
                    </LoadingButton>
                </Grid>
            </Grid>
        </Box>
    );
}

export default SalaryForm;
