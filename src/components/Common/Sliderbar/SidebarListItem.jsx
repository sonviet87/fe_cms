import { List, ListSubheader, Box } from '@mui/material';
import PropTypes from 'prop-types';
import React from 'react';
import SidebarItem from './SidebarItem';



function SidebarListItem({ list }) {


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
                    {dt.items.map((item, idx) => (
                        <SidebarItem {...item} key={idx} />
                    ))}
                </List>
            ))}
        </>
    );
}

SidebarListItem.propTypes = {
    list: PropTypes.array,
};

export default SidebarListItem;
