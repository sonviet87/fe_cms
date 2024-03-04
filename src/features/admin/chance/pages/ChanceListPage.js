
import SkeletonList from 'components/Common/Skeleton/SkeletonList';
import {WrapperBoxAlign, WrapperPage} from 'components/Common/SlytedComponent/Wrapper';
import TitleForm from 'components/Common/TitleForm';
import React from 'react';
import { toast } from 'react-toastify';
import chanceApi from "../../../../api/chanceAPI";
import ChanceFilter from "../components/ChanceFilter";
import ChanceList from "../components/ChanceList";
import {Box} from "@mui/system";
import ChanceExportExcel from "../components/ChanceExportExcel";
import * as yup from "yup";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import AddIcon from "@mui/icons-material/Add";
import {Button} from "@mui/material";
import {useNavigate} from "react-router-dom";
import EqualizerIcon from "@mui/icons-material/Equalizer";

function ChanceListPage() {
    const navigate = useNavigate();
    const [loading, setLoading] = React.useState(false);
    const [list, setList] = React.useState({
        chances: [],
        pagination: {
            total: 0,
            current_page: 0
        },
    });

    const [filter, setFilter] = React.useState({
        per_page: 10,
        page: 0,
    });
    const handleFilter = async (data) => {
        setFilter({
            ...filter,
            ...data,
        });

    };

    const handleDelete = async (item) => {
        setLoading(true);
        const res = await chanceApi.delete([item.id]);
        if (res.status) {
            if (res.data.status) {
                setFilter({
                    per_page: 10,
                    page: 1,
                });
                toast.success(res.data.message);
            } else {
                toast.error(res.data.message);
            }

        } else {
            toast.error(res.message);
        }
        setLoading(false);
    };
    const schema = yup.object().shape({
        startDay: yup.string().required('hãy chọn ngày bắt đầu'),
        endDay: yup.string().required('hãy chọn ngày kết thúc'),
    });

    const methods = useForm({
        defaultValues: {
            account_id: "",
            contact_id: "",
            startDay: "",
            endDay: "",
            user_id: "",
        },
        resolver: yupResolver(schema),
    });

    React.useEffect(() => {

        (async () => {
            setLoading(true);
            const res = await chanceApi.getAll(filter);
            try {
                if (res.status) {
                    setList({
                        chances: res.data.data,
                        pagination: {
                            total: res.data.meta.total,
                            current_page: res.data.meta.current_page
                        },
                    });
                }
                else {
                    toast.error(res.message);
                }
            } catch (error) {
                toast.error("Bạn không có quyền truy cập");
                console.log('Lỗi hệ thống', error);
            }
            setLoading(false);
        })();
    }, [filter]);

    return (
        <WrapperPage>
            <WrapperBoxAlign align="space-between" isborder={0}>
                <TitleForm lable="Cơ hội kinh doanh" isborder={0} />
                <Box>
                    <Button
                        color="primary"
                        variant="contained"
                        startIcon={<AddIcon />}
                        sx={{ mb: 2, mr: 2 }}
                        size="small"
                        onClick={() => { navigate('add') }}
                    >
                        Thêm
                    </Button>

                    <ChanceExportExcel data={list} filter={filter} methods={methods} />
                </Box>


            </WrapperBoxAlign>
            <ChanceFilter loading={loading} filter={filter} onSubmit={handleFilter} methods={methods} />
            {loading ? (
                <SkeletonList />
            ) : (<ChanceList list={list.chances}
                pagination={list.pagination}
                loading={loading}
                filter={filter}
                onFilter={handleFilter}
                onDelete={handleDelete}
            />)}

        </WrapperPage>
    );
}

export default ChanceListPage;