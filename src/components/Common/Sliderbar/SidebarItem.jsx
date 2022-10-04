import { ExpandLess, ExpandMore } from '@mui/icons-material';
import { List, ListItemButton, ListItemIcon, ListItemText, Collapse } from '@mui/material';

import PropTypes from 'prop-types';
import React, { useMemo, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { ListItemButtonStyled, ListItemIconStyled } from '../SlytedComponent/Nav';



const SidebarItemComponent = (props) => {

    const { onHandleClick, route, children } = props;

    if (!route || typeof route !== 'string') {
        return <ListItemButtonStyled onClick={onHandleClick}>{children}</ListItemButtonStyled>;
    }

    // Return a ListItem with a link component
    return (
        <ListItemButtonStyled component={NavLink} to={route} >
            {children}
        </ListItemButtonStyled>
    );
};

function SidebarItem(props) {

    const { title, route, Icon, items = [] } = props;
    const isCollapse = useMemo(() => items && items.length > 0, [items]);
    const [open, setOpen] = useState(false);

    function handleClick() {
        setOpen((prev) => !prev);
    }

    return (
        <>
            <SidebarItemComponent route={route} onHandleClick={handleClick}>
                {!!Icon && (
                    <ListItemIconStyled >
                        <Icon fontSize="small" />
                    </ListItemIconStyled>
                )}
                <ListItemText
                    disableTypography={true}
                    primary={title}
                    inset={!Icon}
                    sx={{
                        fontSize: '14px',
                        marginTop: '1px',
                        marginBottom: '0',
                        fontWeight: '500',
                        color: '#333',
                    }}
                />
                {isCollapse && !open && <ExpandMore />}
                {isCollapse && open && <ExpandLess />}
            </SidebarItemComponent>
            {isCollapse && (
                <Collapse in={open}>
                    <List component="div" disablePadding>
                        {items.map((item, idx) => (
                            <SidebarItem {...item} key={idx} />
                        ))}
                    </List>
                </Collapse>
            )}
        </>
    );
}

SidebarItem.propTypes = {
    list: PropTypes.array,
    onClickItem: PropTypes.func,
};

export default SidebarItem;
