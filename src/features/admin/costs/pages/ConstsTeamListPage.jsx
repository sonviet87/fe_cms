import React from 'react';
import {WrapperPage} from "../../../../components/Common/SlytedComponent/Wrapper";
import TitleForm from "../../../../components/Common/TitleForm";
import SkeletonList from "../../../../components/Common/Skeleton/SkeletonList";
import {toast} from "react-toastify";


import costsFixedAPI from "../../../../api/costsFixed";
import ConstsTeamList from "../components/ConstsTeamList";
import CostsTeamFilter from "../components/CostsTeamFilter";
import costsTeamAPI from "../../../../api/costsTeam";

function ConstsTeamListPage() {
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
            const res = await costsTeamAPI.getAll(filter);
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
        const res = await costsTeamAPI.delete([item.id]);
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

            <TitleForm lable="Danh sách chi phí nhóm" />
            <CostsTeamFilter loading={loading} filter={filter} onSubmit={handleFilter} />
            {loading ? (
                <SkeletonList />
            ) : (<ConstsTeamList list={list.costs}
                                  pagination={list.pagination}
                                  loading={loading}
                                  filter={filter}
                                  onFilter={handleFilter}
                                  onDelete={handleDelete}
            />)}
        </WrapperPage>
    );
}

export default ConstsTeamListPage;