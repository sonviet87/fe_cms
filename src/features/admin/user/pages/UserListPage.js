import { Box } from '@mui/material';
import userApi from 'api/userAPI';

import { LoadingOverlay } from 'components/Common/LoadingOverlay';
import React from 'react';
import UserFilter from '../components/UserFilter';
import UserList from '../components/UserList';


function UserListPage() {
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

    React.useEffect(() => {
        (async () => {
            setLoading(true);
            const res = await userApi.getAll(filter);
            if (res.status) {
                console.log(res.data.data);
                setList(res.data.data);
            }
            setLoading(false);
        })();
    }, [filter]);

    return (
        <Box sx={{ background: '#fff', padding: '20px', borderRadius: '8px' }} >
            {loading && (
                <LoadingOverlay />
            )}
            <UserFilter loading={loading} filter={filter} onSubmit={handleFilter} />
            <UserList list={list.users}
                pagination={list.pagination}
                loading={loading}
                filter={filter}
                onFilter={handleFilter}
            />
        </Box>
    );
}

export default UserListPage;