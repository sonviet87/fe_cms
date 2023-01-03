import accountApi from 'api/accountAPI';
import categoryAPi from 'api/categoryAPI';
import reportApi from 'api/reportAPI';
import supplierApi from 'api/suppliertAPI';
import userApi from 'api/userAPI';
import SkeletonList from 'components/Common/Skeleton/SkeletonList';
import { WrapperPage } from 'components/Common/SlytedComponent/Wrapper';
import React from 'react';
import ReportDebtFPFilter from '../components/ReportDebtFPFilter';
import ReportDebtFPHeaderPage from '../components/ReportDebtFPHeaderPage';
import ReportList from '../components/ReportDebtFPList';

function ReportDebtFPListPage() {
    const [loading, setLoading] = React.useState(false);

    const [accounts, setAccounts] = React.useState([]);
    const [users, setUsers] = React.useState([]);
    const [suppliers, setSuppliers] = React.useState([]);
    const [categories, setCategories] = React.useState([]);

    const [list, setList] = React.useState({
        reports: [],
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
        const params = {
            ...filter,
            ...data,
        }
        setLoading(true);
        const res = await reportApi.getList(params);
        console.log(res.data.data)
        if (res.status) {
            setList({
                reports: res.data.data,
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
                let [accountRs, userRs, supplierRs, categoryRs] = await Promise.all([
                    accountApi.getList(),
                    userApi.getList(),
                    supplierApi.getlist(),
                    categoryAPi.getList(),
                ]);
                if (accountRs.status) {
                    setAccounts(accountRs.data.data);
                }
                if (userRs.status) {
                    setUsers(userRs.data.data);
                }
                if (supplierRs.status) {
                    setSuppliers(supplierRs.data.data);
                }
                if (categoryRs.status) {
                    setCategories(categoryRs.data.data);
                }

            } catch (error) {
                console.log('get fp by id error', error);
            }
        })();
    }, []);
    console.log(filter)
    return (
        <WrapperPage>
            <ReportDebtFPHeaderPage list={list.reports} filter={filter} />
            <ReportDebtFPFilter loading={loading} filter={filter} onSubmit={handleFilter} users={users} accounts={accounts} suppliers={suppliers} categories={categories} />
            {loading ? (
                <SkeletonList />
            ) : (<ReportList list={list.reports}
                pagination={list.pagination}
                loading={loading}
                filter={filter}
                onFilter={handleFilter}

            />)}
        </WrapperPage>
    );
}

export default ReportDebtFPListPage;