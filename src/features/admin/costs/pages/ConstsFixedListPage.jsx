import React from 'react';
import {WrapperPage} from "../../../../components/Common/SlytedComponent/Wrapper";
import TitleForm from "../../../../components/Common/TitleForm";
import SkeletonList from "../../../../components/Common/Skeleton/SkeletonList";
import {toast} from "react-toastify";

import CostsFixedList from "../components/CostsFixedList";
import costsFixedAPI from "../../../../api/costsFixed";
import CostsFixedFilter from "../components/CostsFixedFilter";

function ConstsFixedListPage() {
    const [loading, setLoading] = React.useState(false);
    const [list, setList] = React.useState({
        costs: [],
        pagination: {
            total: 0,
            current_page: 0
        },
    });

    const [filter, setFilter] = React.useState({
        per_page: 10,
        page: 1,
    });

    const handleFilter = async (data) => {
        setFilter({
            ...filter,
            ...data,
        });
    };
    React.useEffect(() => {

        (async () => {
            setLoading(true);
            const res = await costsFixedAPI.getAll(filter);
            try {
                if (res.status) {

                    setList({
                        costs: res.data.data,
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
    const handleDelete = async (item) => {
        setLoading(true);
        const res = await costsFixedAPI.delete([item.id]);
        if (res.status) {
            if (res.data.status) {
                setFilter({
                    per_page: 10,
                    page: 1,
                });
                console.log(res)
                toast.success(res.data.message);
            } else {
                toast.error(res.data.message);
            }



        } else {
            toast.error(res.message);
        }
        setLoading(false);
    };

    return (
        <WrapperPage>

            <TitleForm lable="Danh sách chi phí cố định" />
            <CostsFixedFilter loading={loading} filter={filter} onSubmit={handleFilter} />
            {loading ? (
                <SkeletonList />
            ) : (<CostsFixedList list={list.costs}
                                 pagination={list.pagination}
                                 loading={loading}
                                 filter={filter}
                                 onFilter={handleFilter}
                                 onDelete={handleDelete}
            />)}
        </WrapperPage>
    );
}

export default ConstsFixedListPage;