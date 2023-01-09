import accountApi from 'api/accountAPI';
import fpApi from 'api/fpAPI';
import reportApi from 'api/reportAPI';
import reportDebtFPApi from 'api/reportDebtFPAPI';
import userApi from 'api/userAPI';
import SkeletonList from 'components/Common/Skeleton/SkeletonList';
import { WrapperPage } from 'components/Common/SlytedComponent/Wrapper';
import moment from 'moment';
import React from 'react';
import ReportDebtFPFilter from '../components/ReportDebtFPFilter';
import ReportDebtFPHeaderPage from '../components/ReportDebtFPHeaderPage';
import ReportList from '../components/ReportDebtFPList';

function ReportDebtFPListPage() {
    const [loading, setLoading] = React.useState(false);

    const [accounts, setAccounts] = React.useState([]);
    const [users, setUsers] = React.useState([]);
    const [fps, setFps] = React.useState([]);

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
        data.startDay = moment(data.startDay).format('YYYY-MM-DD');
        data.endDay = moment(data.endDay).format('YYYY-MM-DD');
        setFilter({
            ...filter,
            ...data,
        });
        const params = {
            ...filter,
            ...data,
        }
        setLoading(true);
        const res = await reportDebtFPApi.getList(params);
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
                let [accountRs, userRs, fpRs] = await Promise.all([
                    accountApi.getList(),
                    userApi.getList(),
                    fpApi.getList()
                ]);
                if (accountRs.status) {
                    setAccounts(accountRs.data.data);
                }
                if (userRs.status) {
                    setUsers(userRs.data.data);
                }

                if (fpRs.status) {
                    const fpList = fpRs.data.data.map((item) => { return { id: item.id, name: item.code } })
                    setFps(fpList);
                }

            } catch (error) {
                console.log('get fp by id error', error);
            }
        })();
    }, []);

    return (
        <WrapperPage>
            <ReportDebtFPHeaderPage list={list.reports} filter={filter} />
            <ReportDebtFPFilter loading={loading} filter={filter} onSubmit={handleFilter} users={users} accounts={accounts} fps={fps} />
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