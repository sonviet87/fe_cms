import { yupResolver } from '@hookform/resolvers/yup';
import { Button, Grid, Table, TableBody, TableContainer, TableRow } from '@mui/material';
import { Box } from '@mui/system';
import PropTypes from 'prop-types';
import React from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
import * as yup from 'yup';
import LoadingButton from '@mui/lab/LoadingButton';
import TextFormik from 'components/FormElement/TextFormik';
import BasicDatePicker from 'components/FormElement/DatetimePicker';
import { TableCellStyled, WrapperBox } from 'features/admin/fp/style/StyledFP';
import BasicSelect from 'components/FormElement/SelectBox';
import AddIcon from '@mui/icons-material/Add';
import { BasicButtonStyled } from 'components/Common/SlytedComponent/Button';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import WarrantyUploadFile from './WarrantyUploadFile';
import fpApi from 'api/fpAPI';
WarrantyForm.propTypes = {
    initialValue: PropTypes.object,
    onSubmit: PropTypes.func,
};


function WarrantyForm({ initialValue, onSubmit, itemValue, isEdit, fps }) {
    const validationRules = {
        name: yup.string().required('Xin điền tên'),
        fp_id: yup.string().required('Xin chọn mã PAKD'),
        details: yup.lazy(() =>
            yup.array().of(
                yup.object({
                    serial: yup.string().required('Xin hãy điện serial number'),
                    time_warranty: yup.string().required('Xin hãy chọn thời gian bảo hành'),
                    type: yup.string().required('Xin hãy chọn loại'),

                }),
            ),
        ),

    };

    const schema = yup.object().shape(validationRules);
    const {
        control,
        handleSubmit,
        formState: { isSubmitting, errors },
        setValue,
        setError,
        getValues,
        reset
    } = useForm({
        defaultValues: initialValue,
        resolver: yupResolver(schema),
    });

    const { fields, append, remove } = useFieldArray({
        control,
        name: 'details',
        rules: {
            required: true,
        },
    });

    const handleFormSubmit = async (formValues) => {
        if (!onSubmit) return;
        console.log(formValues)
        //await onSubmit(formValues);
    };

    const handleCallAPIFP = async (fpID) => {
        if (fpID === '' || fpID === undefined) return;
        try {
            const fpDetailsRs = await fpApi.get(fpID);
            if (fpDetailsRs.status) {
                remove();
                fpDetailsRs.data.data.details.forEach((item, index) => {
                    append({
                        category: item.category.name,
                        serial: '',
                        time_warranty: '',
                        type: 1,
                    })
                })
                setValue('account', fpDetailsRs.data.data.account)
            }
        } catch (error) {
            console.log('Error', error.message);
        }
    };


    React.useEffect(() => {
        if (isEdit) {
            setValue('name', itemValue.name);
            setValue('fp_id', itemValue.fp_id);
            setValue('start_day', itemValue.start_day);
            setValue('end_day', itemValue.end_day);
            setValue('email', itemValue.email);
            setValue('phone', itemValue.phone);



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
                    <TextFormik name="name" label="Tên" control={control} />
                </Grid>
                <Grid item xs={12} md={6}>

                    <BasicSelect
                        name="fp_id"
                        label="Mã PAKD"
                        onChangeAjax={handleCallAPIFP}
                        control={control}
                        options={fps}
                        sx={{ minWidth: '250px' }}

                    />
                </Grid>

                <Grid item xs={12} md={6}>
                    <TextFormik name="account" label="Khách hàng" control={control} />
                </Grid>
                <Grid item xs={12} md={6} >
                    <BasicDatePicker
                        name="start_day"
                        lableText="Ngày bắt đầu"
                        control={control}
                    />
                </Grid>
                <Grid item xs={12} md={6}>
                    <BasicDatePicker
                        name="end_day"
                        lableText="Ngày kết thúc"
                        control={control}
                    />
                </Grid>

                <Grid item xs={12} md={6}>
                    <TextFormik name="email" label="Email" control={control} />
                </Grid>
                <Grid item xs={12} md={6}>
                    <TextFormik name="phone" label="Điện thoại" control={control} />
                </Grid>
                <Grid item xs={12}>
                    <WrapperBox>
                        <TableContainer  >
                            <Table aria-label="simple table">
                                <TableBody>
                                    {fields.map((field, index) => (
                                        <React.Fragment key={field.id}>
                                            <TableRow >
                                                <TableCellStyled>
                                                    <TextFormik name={`details[${index}].category`} label="Danh mục" control={control} />
                                                </TableCellStyled>
                                                <TableCellStyled>
                                                    <TextFormik name={`details[${index}].serial`} label="Serial Number" control={control} />
                                                </TableCellStyled>
                                                <TableCellStyled>
                                                    <TextFormik name={`details[${index}].time_warranty`} label="Thời gian bảo hành" control={control} />
                                                </TableCellStyled>
                                                <TableCellStyled>
                                                    <BasicSelect
                                                        name={`details[${index}].type`}
                                                        label="Loại"
                                                        control={control}
                                                        options={[
                                                            { id: 1, name: 'Tháng' },
                                                            { id: 2, name: 'Năm' }
                                                        ]}
                                                        sx={{ minWidth: '250px' }}

                                                    />
                                                </TableCellStyled>

                                            </TableRow>

                                        </React.Fragment>
                                    ))}

                                </TableBody>
                            </Table>
                        </TableContainer>


                    </WrapperBox>

                </Grid>

                <Grid item xs={12}>
                    <WarrantyUploadFile control={control} setValue={setValue} isEdit={isEdit} itemValue={itemValue} errors={errors} setError={setError} />
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

export default WarrantyForm;
