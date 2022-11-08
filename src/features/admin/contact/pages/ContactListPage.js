
import contactApi from 'api/contactAPI';
import { LoadingOverlay } from 'components/Common/LoadingOverlay';
import { WrapperPage } from 'components/Common/SlytedComponent/Wrapper';
import TitleForm from 'components/Common/TitleForm';
import React from 'react';
import { toast } from 'react-toastify';
import ContactFilter from '../components/ContactFilter';
import ContactList from '../components/ContactList';


function ContactListPage() {
    const [loading, setLoading] = React.useState(false);
    const [list, setList] = React.useState({
        users: [],
        pagination: {
            total: 0,
            current_page: 0
        },
    });

    const [filter, setFilter] = React.useState({
        per_page: 5,
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
        const res = await contactApi.delete([item.id]);
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
            const res = await contactApi.getAll(filter);
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
        })();
    }, [filter]);

    return (
        <WrapperPage>
            {loading && (
                <LoadingOverlay />
            )}
            <TitleForm lable="Danh sách liên hệ" />
            <ContactFilter loading={loading} filter={filter} onSubmit={handleFilter} />
            <ContactList list={list.users}
                pagination={list.pagination}
                loading={loading}
                filter={filter}
                onFilter={handleFilter}
                onDelete={handleDelete}
            />
        </WrapperPage>
    );
}

export default ContactListPage;