import React,{useState} from 'react';
import TitleForm from "../../../../components/Common/TitleForm";
import {WrapperPage} from "../../../../components/Common/SlytedComponent/Wrapper";
import {toast} from "react-toastify";

import {useSelector} from "react-redux";
import {selectListUser} from "../../user/userSlice";
import SkeletonList from "../../../../components/Common/Skeleton/SkeletonList";
import TechnicalProjectFilter from "../components/TechnicalProjecteFilter";
import TechnicalReviewList from "../components/TechnicalReviewList";
import technicalReviewtAPI from "../../../../api/technicalReviewtAPI";
import TechnicalReviewFilter from "../components/TechnicalReviewFilter";


function ListTechnicalReviewPage() {
    const [loading, setLoading] = React.useState(false);

    const users = useSelector(selectListUser);
    const [list, setList] = React.useState({
        list: [],
        pagination: {
            total: 0,
            current_page: 0
        },
    });


    const [filter, setFilter] = React.useState({
        per_page: 10,
        page: 0,
        //list: 'list'
    });

    const handleFilter = async (data) => {
        console.log(data)
        setFilter({
            ...filter,
            ...data,
        });
    };
    const handleDelete = async (item) => {
        setLoading(true);
        const res = await technicalReviewtAPI.delete([item.id]);
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
    React.useEffect(() => {

        (async () => {
            setLoading(true);
            const res = await technicalReviewtAPI.getAll(filter);
            try {
                if (res.status) {

                    setList({
                        list: res.data.data,
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
            <TitleForm lable="Đánh giá chất lượng chăm sóc khách hàng" />
            <TechnicalReviewFilter loading={loading} filter={filter} onSubmit={handleFilter} users={users}   />
            {loading ? (
                <SkeletonList />
            ) : (<TechnicalReviewList list={list.list}
                                     pagination={list.pagination}
                                     loading={loading}
                                     filter={filter}
                                     onFilter={handleFilter}
                                     onDelete={handleDelete}
            />)}

        </WrapperPage>
    );
}

export default ListTechnicalReviewPage;