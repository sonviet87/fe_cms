
import contactApi from 'api/contactAPI';
import { LoadingOverlay } from 'components/Common/LoadingOverlay';
import SkeletonList from 'components/Common/Skeleton/SkeletonList';
import { WrapperPage } from 'components/Common/SlytedComponent/Wrapper';
import TitleForm from 'components/Common/TitleForm';
import React from 'react';
import { toast } from 'react-toastify';
import SalaryFilter from '../components/SalaryFilter';
import SalaryList from '../components/SalaryList';
import salaryApi from "../../../../api/salaryAPI";


function SalaryListPage() {
    const [loading, setLoading] = React.useState(false);
    const [list, setList] = React.useState({
        salary: [],
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
        const res = await salaryApi.delete([item.id]);
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
            const res = await salaryApi.getPaginnation(filter);
            if (res.status) {
                setList({
                    salary: res.data.data,
                    pagination: {
                        total: res.data.meta.total,
                        current_page: res.data.meta.current_page
                    },
                });
            }
            setLoading(false);
        })();
    }, [filter]);

    return (
        <WrapperPage>

            <TitleForm lable="Danh sách lương" />
            <SalaryFilter loading={loading} filter={filter} onSubmit={handleFilter} />
            {loading ? (
                <SkeletonList />
            ) : (<SalaryList list={list.salary}
                             pagination={list.pagination}
                             loading={loading}
                             filter={filter}
                             onFilter={handleFilter}
                             onDelete={handleDelete}
            />)}
        </WrapperPage>
    );
}

export default SalaryListPage;