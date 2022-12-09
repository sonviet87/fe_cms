import categoryAPi from 'api/categoryAPI';
import { LoadingOverlay } from 'components/Common/LoadingOverlay';
import { WrapperPage } from 'components/Common/SlytedComponent/Wrapper';
import TitleForm from 'components/Common/TitleForm';
import React from 'react';
import { toast } from 'react-toastify';
import CategoryFilter from '../components/CategoryFilter';
import CategoryList from '../components/CategoryList';



function CategoryListPage() {
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

    const handleDelete = async (item) => {
        setLoading(true);
        const res = await categoryAPi.delete([item.id]);
        if (res.status) {
            if (res.data.status) {
                setFilter({
                    per_page: 10,
                    page: 1,
                });
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
            const res = await categoryAPi.getAll(filter);
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
            {loading && (
                <LoadingOverlay />
            )}
            <TitleForm lable="Danh mục sản phẩm" />
            <CategoryFilter loading={loading} filter={filter} onSubmit={handleFilter} />
            <CategoryList list={list.suppliers}
                pagination={list.pagination}
                loading={loading}
                filter={filter}
                onFilter={handleFilter}
                onDelete={handleDelete}
            />
        </WrapperPage>
    );
}

export default CategoryListPage;