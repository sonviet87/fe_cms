import React from 'react';
import {WrapperPage} from "../../../../components/Common/SlytedComponent/Wrapper";
import TitleForm from "../../../../components/Common/TitleForm";
import SkeletonList from "../../../../components/Common/Skeleton/SkeletonList";
import KpiMemberGroupFilter from "../components/KpiMemberGroupFilter";
import fpApi from "../../../../api/fpAPI";
import {toast} from "react-toastify";
import kpiMemberGroupsApi from "../../../../api/kpiMemberGroupsAPI";
import KpiGroupMemberList from "../components/KpiGroupMemberList";



function KpiGroupMemberListPage() {
    const [loading, setLoading] = React.useState(false);
    const [list, setList] = React.useState({
        members: [],
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
    React.useEffect(() => {

        (async () => {
            setLoading(true);
            const res = await kpiMemberGroupsApi.getList(filter);
            try {
                if (res.status) {
                    setList({
                        members: res.data.data,
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
        const res = await kpiMemberGroupsApi.delete([item.id]);
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

            <TitleForm lable="Danh sách nhóm" />
            <KpiMemberGroupFilter loading={loading} filter={filter} onSubmit={handleFilter} />
            {loading ? (
                <SkeletonList />
            ) : (<KpiGroupMemberList list={list.members}
                                         pagination={list.pagination}
                                         loading={loading}
                                         filter={filter}
                                         onFilter={handleFilter}
                                         onDelete={handleDelete}
            />)}
        </WrapperPage>
    );
}

export default KpiGroupMemberListPage;