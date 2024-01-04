import {Box, Grid} from "@mui/material";
import * as yup from "yup";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import TextFormik from "../../../../components/FormElement/TextFormik";
import SelectAllTransferList from "./TransferList";
import {useSelector} from "react-redux";
import {selectListUser} from "../../user/userSlice";

function KpiGroupMemberForm({ initialValue, onSubmit, itemValue, usersValue, isEdit }) {
    const users = useSelector(selectListUser);
    const validationRules = {

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

    return (
        <>
            <TextFormik name="name" label="Tên nhóm" control={control} />
            <SelectAllTransferList lists={users} />
            <Box sx={{mt:4}}>
                <Grid container spacing={2}>
                    <Grid item xs={4}>
                        <div>Mục tiêu tháng</div>
                        <TextFormik name="profit_months" label="Lợi nhuận" control={control} />
                    </Grid>
                    <Grid item xs={4}>
                        <div>Mục tiêu quý</div>
                        xs=4
                    </Grid>
                    <Grid item xs={4}>
                        <div>Mục tiêu Năm</div>
                        xs=4
                    </Grid>
                </Grid>
            </Box>
        </>
    );

}

export default KpiGroupMemberForm;