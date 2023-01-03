import debtApi from 'api/debtAPI';
import debtSupplierApi from 'api/debtSupplierAPI';
import SkeletonList from 'components/Common/Skeleton/SkeletonList';
import { WrapperPage } from 'components/Common/SlytedComponent/Wrapper';
import TitleForm from 'components/Common/TitleForm';
import React from 'react';
import { toast } from 'react-toastify';
import DebtFilter from '../components/DebtSupplierFilter';
import DebtList from '../components/DebtSupplierList';


function DebtSupplierListPage() {
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
        const res = await debtApi.delete([item.id]);
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
                const res = await debtSupplierApi.getAll(filter);
                if (res.status) {
                    console.log(res.data.data)
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

            <TitleForm lable="Danh sách công nợ nhà cung cấp" />
            <DebtFilter loading={loading} filter={filter} onSubmit={handleFilter} />
            {loading ? (
                <SkeletonList />
            ) : (<DebtList list={list.users}
                pagination={list.pagination}
                loading={loading}
                filter={filter}
                onFilter={handleFilter}
                onDelete={handleDelete}
            />)}
        </WrapperPage>
    );
}

export default DebtSupplierListPage;