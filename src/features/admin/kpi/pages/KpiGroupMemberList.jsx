import React from 'react';
import {WrapperPage} from "../../../../components/Common/SlytedComponent/Wrapper";
import TitleForm from "../../../../components/Common/TitleForm";
import SkeletonList from "../../../../components/Common/Skeleton/SkeletonList";
import KpiMemberGroupFilter from "../components/KpiMemberGroupFilter";



function KpiGroupMemberList() {
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

    const handleDelete = async (item) => {
        setLoading(true);
       /* const res = await accountApi.delete([item.id]);
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
        }*/
        setLoading(false);
    };

    return (
        <WrapperPage>

            <TitleForm lable="Danh sách nhóm" />
            <KpiMemberGroupFilter loading={loading} filter={filter} onSubmit={handleFilter} />
            {/*  {loading ? (
                <SkeletonList />
            ) : (<KpiGroupMemberList list={list.members}
                              pagination={list.pagination}
                              loading={loading}
                              filter={filter}
                              onFilter={handleFilter}
                              onDelete={handleDelete}
            />)}*/}
        </WrapperPage>
    );
}

export default KpiGroupMemberList;