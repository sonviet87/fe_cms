import reportApi from 'api/reportAPI';
import SkeletonList from 'components/Common/Skeleton/SkeletonList';
import { WrapperPage } from 'components/Common/SlytedComponent/Wrapper';
import TitleForm from 'components/Common/TitleForm';
import React from 'react';
import ReportFilter from '../components/ReportFilter';
import ReportList from '../components/ReportList';

function ReportListPage() {
    const [loading, setLoading] = React.useState(false);
    const [list, setList] = React.useState({
        suppliers: [],
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
            const res = await reportApi.getList(filter);
            console.log(res.data.data)
            if (res.status) {
                setList({
                    suppliers: res.data.data,
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
            <TitleForm lable="Thống kê phương án kinh doanh" />
            <ReportFilter loading={loading} filter={filter} onSubmit={handleFilter} />
            {loading ? (
                <SkeletonList />
            ) : (<ReportList list={list.suppliers}
                pagination={list.pagination}
                loading={loading}
                filter={filter}
                onFilter={handleFilter}

            />)}
        </WrapperPage>
    );
}

export default ReportListPage;