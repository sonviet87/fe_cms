import { List, ListSubheader, Box } from '@mui/material';
import { selectRoles } from 'features/auth/authSlice';
import PropTypes from 'prop-types';
import React from 'react';
import { useSelector } from 'react-redux';
import SidebarItem from './SidebarItem';



function SidebarListItem({ list }) {
    const permissons = useSelector(selectRoles);
    return (
        <>
            {list.map((dt, key) => (
                <List
                    key={key}
                    component="nav"
                    subheader={
                        <ListSubheader component="div">
                            <Box >{dt.title}</Box>
                        </ListSubheader>
                    }
                >
                    {dt.items.map((item, idx) => {
                        if (permissons.includes(item.permission) || item.permission === 'all') {
                            return <SidebarItem {...item} key={idx} />
                        } else {
                            return ''
                        }
                    }

                    )}
                </List>
            ))}
        </>
    );
}

SidebarListItem.propTypes = {
    list: PropTypes.array,
};

export default SidebarListItem;
