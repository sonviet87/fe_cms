
import SkeletonList from 'components/Common/Skeleton/SkeletonList';
import { WrapperPage } from 'components/Common/SlytedComponent/Wrapper';
import TitleForm from 'components/Common/TitleForm';
import React from 'react';
import { toast } from 'react-toastify';
import chanceApi from "../../../../api/chanceAPI";
import ChanceFilter from "../components/ChanceFilter";
import ChanceList from "../components/ChanceList";

function ChanceListPage() {
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
            <TitleForm lable="Cơ hội kinh doanh" />
            <ChanceFilter loading={loading} filter={filter} onSubmit={handleFilter} />
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