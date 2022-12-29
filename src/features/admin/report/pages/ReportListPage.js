import accountApi from 'api/accountAPI';
import reportApi from 'api/reportAPI';
import supplierApi from 'api/suppliertAPI';
import userApi from 'api/userAPI';
import SkeletonList from 'components/Common/Skeleton/SkeletonList';
import { WrapperPage } from 'components/Common/SlytedComponent/Wrapper';
import TitleForm from 'components/Common/TitleForm';
import React from 'react';
import ReportFilter from '../components/ReportFilter';
import ReportList from '../components/ReportList';

function ReportListPage() {
    const [loading, setLoading] = React.useState(false);

    const [accounts, setAccounts] = React.useState([]);
    const [users, setUsers] = React.useState([]);
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
        // setFilter({
        //     ...filter,
        //     ...data,
        // });
        const params = {
            ...filter,
            ...data,
        }
        setLoading(true);
        const res = await reportApi.getList(params);
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
    }
    React.useEffect(() => {

        (async () => {
            try {
                let [accountRs, userRs] = await Promise.all([
                    accountApi.getList(),
                    userApi.getList()

                ]);
                if (accountRs.status) {
                    setAccounts(accountRs.data.data);
                }
                if (userRs.status) {
                    setUsers(userRs.data.data);
                }

            } catch (error) {
                console.log('get fp by id error', error);
            }
        })();
    }, [filter]);

    return (
        <WrapperPage>
            <TitleForm lable="Thống kê phương án kinh doanh" />
            <ReportFilter loading={loading} filter={filter} onSubmit={handleFilter} users={users} accounts={accounts} />
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