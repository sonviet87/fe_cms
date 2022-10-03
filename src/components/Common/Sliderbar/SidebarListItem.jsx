import { List, ListSubheader, Box } from '@mui/material';
import { makeStyles } from '@mui/styles';
import PropTypes from 'prop-types';
import React from 'react';
import SidebarItem from './SidebarItem';

const useStyles = makeStyles(() => ({
    root: {},
    head: {
        textTransform: 'uppercase',
        fontWeight: '700',
        color: '#172b4d',
        fontSize: '12px',
    },
}));

function SidebarListItem({ list }) {
    const classes = useStyles();

    return (
        <>
            {list.map((dt, key) => (
                <List
                    key={key}
                    component="nav"
                    subheader={
                        <ListSubheader component="div">
                            <Box className={classes.head}>{dt.title}</Box>
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
