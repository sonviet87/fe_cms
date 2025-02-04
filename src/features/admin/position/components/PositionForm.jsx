import React from 'react';
import { Box } from '@mui/system';
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import {Button, DialogActions, Grid} from "@mui/material";
import Dialog from "@mui/material/Dialog";
import * as yup from "yup";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import TextFormik from 'components/FormElement/TextFormik';
import LoadingButton from "@mui/lab/LoadingButton";
import {toast} from "react-toastify";
import positionAPI from "../../../../api/positionAPI";


function PositionForm({handleClose,open,id,loadList}) {
    const initialValue = {
        name: '',
    };
    const validationRules = {
        name: yup.string().required('Tên không được bỏ trống'),
    };
    const schema = yup.object().shape(validationRules);
    const {
        control,
        reset,
        handleSubmit,
        formState: { isSubmitting },
        setValue
    } = useForm({
        defaultValues: initialValue,
        resolver: yupResolver(schema),
    });

    const handleFormSubmit = async (formValues) => {

       // setLoading(true);
        try {
            let res;
            if (id !== undefined) {
                res = await positionAPI.update(id, formValues);
            } else {
                res = await positionAPI.add(formValues);
            }

            if (res.status) {
                console.log('res.message', res.message);
                if (res.data.status) {
                    toast.success(res.message);

                } else {
                    toast.error(res.data.message);
                }
            } else {
                toast.error(res.message);
            }

           await loadList();

        } catch (error) {
            console.log('Error', error.message);
        }
       // setLoading(false);

        await closeModal();
    };
    const closeModal = async () => {
        reset();
        await handleClose();

    };

    React.useEffect(() => {
        if(id === undefined){
            setValue('name','');
        }else{

            (async () => {
                try {
                    const res = await positionAPI.get(id);

                    if (res.status) {
                        setValue('name', res.data.data.name?? '');

                    } else {
                        toast.error(res.message);

                    }
                } catch (error) {
                    console.log('get account by id error', error);
                }

            })();
        }
    });
    return (
        <Dialog
            open={open}
            onClose={closeModal}
        >
            <DialogTitle>{id ===undefined? 'Thêm chức vụ': 'Cập nhật chức vụ'}</DialogTitle>
            <DialogContent>
                <Box
                    component="form"
                    noValidate
                    autoComplete="off"
                >
                    <Grid container spacing={2}>
                        <Grid item xs={12}  >
                            <TextFormik name="name" label="Chức vụ" control={control} />
                        </Grid>
                    </Grid>
                </Box>

            </DialogContent>
            <Grid item xs={12} md={12}>

            </Grid>
            <DialogActions>
                <Button onClick={closeModal}>Hủy</Button>
                <LoadingButton
                    onClick={handleSubmit(handleFormSubmit)}
                    color="primary"
                    loading={isSubmitting}
                    loadingIndicator="Loading..."
                    variant="contained"
                >
                    Lưu
                </LoadingButton>
            </DialogActions>
        </Dialog>
    );
}

export default PositionForm;