import React from 'react';
import { WrapperPage } from 'components/Common/SlytedComponent/Wrapper';
import TitleForm from "../../../../components/Common/TitleForm";
import positionAPI from "../../../../api/positionAPI";
import {toast} from "react-toastify";

import PositionList from "../components/PositionList";
import SkeletonList from "../../../../components/Common/Skeleton/SkeletonList";
import PositionFilter from "../components/PositionFilter";

import PositionForm from "../components/PositionForm";
function AdminPositionListPage() {
    const [loading, setLoading] = React.useState(false);
    const [id, setID] = React.useState(undefined);

    const [open, setOpen] = React.useState(false);
    const [list, setList] = React.useState({
        positions: [],
        pagination: {
            total: 0,
            current_page: 0
        },
    });

    const loadList = async () => {
        const res = await positionAPI.getAll(filter);
        if (res.status) {
            setList({
                positions: res.data.data,
                pagination: {
                    total: res.data.meta.total,
                    current_page: res.data.meta.current_page
                },
            });
        }
    };



    const handleClickOpen = (id) => {
        setID(id)
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };
    const handleFilter = async (data) => {
        setFilter({
            ...filter,
            ...data,
        });
    };

    const [filter, setFilter] = React.useState({
        per_page: 10,
        page: 0,
    });
    const handleDelete = async (item) => {
        setLoading(true);
        const res = await positionAPI.delete([item.id]);
        if (res.status) {
            if (res.data.status) {
                await loadList();
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
                await loadList();
                setLoading(false);
            } catch (e) {
                console.log(e)
            }

        })();
    }, [filter]);
    return (
        <WrapperPage>
            <PositionForm handleClose={handleClose} open={open} id={id} loadList ={loadList} />
            <TitleForm lable="Danh sách chức vụ" />
            <PositionFilter handleClickOpen={handleClickOpen} handleClickClose={handleClose} />
            {loading ? (
                <SkeletonList />
            ) : (<PositionList list={list.positions}
                               pagination={list.pagination}
                               loading={loading}
                               filter={filter}
                               onFilter={handleFilter}
                               onDelete={handleDelete}
                               handleClickOpen={handleClickOpen}
            />)}
        </WrapperPage>
    );
}
export default AdminPositionListPage;
