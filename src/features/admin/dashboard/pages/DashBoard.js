import React from 'react';
import DashBoardFilter from '../components/DashBoardFilter';
import DashBoardList from '../components/DashBoardList';
import { Box } from '@mui/system';

import managerApi from 'api/mangerAPI';
import FileSaver from 'file-saver';
import { CircularProgress } from '@mui/material';

const DashBoard = () => {

    const [loading, setLoading] = React.useState(false);
    const [list, setList] = React.useState({
        data: [],
        pagination: {
            total: 0,
            current_page: 0
        },
    });

    const [filter, setFilter] = React.useState({
        per_page: 5,
        page: 1,
    });
    const handleFilter = async (data) => {
        setFilter({
            ...filter,
            ...data,
        });
    };

    const handleExportExel = (data) => {
        (async () => {
            setLoading(true);
            const res = await managerApi.getExportExel(data);
            if (res.status) {
                FileSaver.saveAs(res.data, 'text.xlsx');
            }
            setLoading(false);
        })();
    }

    React.useEffect(() => {

    }, [filter]);

    return (

        <Box padding={3}>
            {loading && (
                <Box sx={{ display: 'flex', height: '100%', width: '100%', alignItems: 'center', justifyContent: 'center', position: 'absolute', top: '0', left: '0' }}>
                    <CircularProgress size={100} />
                </Box>
            )}
            <DashBoardFilter loading={loading} filter={filter} onSubmit={handleFilter} onExport={handleExportExel} />
            <DashBoardList list={list.data}
                pagination={list.pagination}
                loading={loading}
                filter={filter}
                onFilter={handleFilter}
            />
        </Box>
    );

}

export default DashBoard;