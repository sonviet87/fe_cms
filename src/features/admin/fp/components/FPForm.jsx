import { yupResolver } from '@hookform/resolvers/yup';
import { Grid } from '@mui/material';
import { Box } from '@mui/system';
import PropTypes from 'prop-types';
import React from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import LoadingButton from '@mui/lab/LoadingButton';
import TextFormik from 'components/FormElement/TextFormik';
import BasicSelect from 'components/FormElement/SelectBox';
import contactApi from 'api/contactAPI';

FPForm.propTypes = {
    initialValue: PropTypes.object,
    onSubmit: PropTypes.func,
};

function FPForm({ initialValue, onSubmit, itemValue, accountValue, contactValue, isEdit }) {
    const validationRules = {
        company: yup.string().required('Xin hãy điền thông tin công ty'),
    };

    const [contacts, setContacts] = React.useState([]);
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
        await onSubmit(formValues);
    };


    const handleCallAPIContact = async (formValues) => {
        const contactRs = await contactApi.getByIDUsers(2);
        if (contactRs.status) {
            setContacts(contactRs.data.data);
        }
        contactValue = contacts;
    }
    React.useEffect(() => {
        if (isEdit) {
            setValue('name', itemValue.name);
            setValue('account_id', itemValue.account_id);
            setValue('contact_id', itemValue.contact_id);
            setValue('user_id', itemValue.user_id);
            setValue('status', itemValue.status);
            setValue('selling', itemValue.selling);
            setValue('margin', itemValue.margin);
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
                <Grid item xs={12} md={12} >
                    <TextFormik name="name" label="Tên FP" control={control} />
                </Grid>
                <Grid item xs={12} md={6} >
                    <BasicSelect
                        name="account_id"
                        label="Tài khoản"
                        control={control}
                        options={accountValue}
                        onChange={() => { handleCallAPIContact() }}
                    />
                </Grid>
                <Grid item xs={12} md={6} >
                    <BasicSelect
                        name="contact_id"
                        label="Liên hệ"
                        control={control}
                        options={contactValue}


                    />
                </Grid>



                <Grid item xs={12} md={6}>
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

export default FPForm;
