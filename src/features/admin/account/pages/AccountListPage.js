import accountApi from 'api/accountAPI';
import { LoadingOverlay } from 'components/Common/LoadingOverlay';
import SkeletonList from 'components/Common/Skeleton/SkeletonList';
import { WrapperPage } from 'components/Common/SlytedComponent/Wrapper';
import TitleForm from 'components/Common/TitleForm';
import React from 'react';
import { toast } from 'react-toastify';
import UserFilter from '../components/AccountFilter';
import AccountList from '../components/AccountList';


function AccountListPage() {
    const [loading, setLoading] = React.useState(false);
    const [list, setList] = React.useState({
        users: [],
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
        const res = await accountApi.delete([item.id]);
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
            try {
                setLoading(true);
                const res = await accountApi.getAll(filter);
                if (res.status) {
                    setList({
                        users: res.data.data,
                        pagination: {
                            total: res.data.meta.total,
                            current_page: res.data.meta.current_page
                        },
                    });
                }
                setLoading(false);
            } catch (e) {
                console.log(e)
            }

        })();
    }, [filter]);

    return (
        <WrapperPage>

            <TitleForm lable="Danh sách tài khoản" />
            <UserFilter loading={loading} filter={filter} onSubmit={handleFilter} />
            {loading ? (
                <SkeletonList />
            ) : (<AccountList list={list.users}
                pagination={list.pagination}
                loading={loading}
                filter={filter}
                onFilter={handleFilter}
                onDelete={handleDelete}
            />)}
        </WrapperPage>
    );
}

export default AccountListPage;