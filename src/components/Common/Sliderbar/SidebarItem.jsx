import { ExpandLess, ExpandMore } from '@mui/icons-material';
import { List, ListItemText, Collapse } from '@mui/material';
import { selectRoles } from 'features/auth/authSlice';

import PropTypes from 'prop-types';
import React, { useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
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
    const permissons = useSelector(selectRoles);
    const { title, route, Icon, items, handleMenuActive, isActive } = props;
    const isCollapse = useMemo(() => items && items.length > 0, [items]);

    function handleClick() {
        handleMenuActive(title); // Toggle trạng thái menu cha
    }

    return (
        <>
            <SidebarItemComponent route={route} onHandleClick={handleClick}>
                {!!Icon && (
                    <ListItemIconStyled>
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
                {isCollapse && !isActive && <ExpandMore />}
                {isCollapse && isActive && <ExpandLess />}
            </SidebarItemComponent>

            {isCollapse && (
                <Collapse in={isActive}>
                    <List component="div" disablePadding>
                        {items.map((item, idx) => {
                            if (permissons.includes(item.permission) || item.permission === 'all') {
                                return (
                                    <SidebarItem
                                        {...item}
                                        key={idx}
                                        handleMenuActive={handleMenuActive}
                                        isActive={props.isActive} // Menu cha luôn mở khi menu con mở
                                    />
                                );
                            } else {
                                return null;
                            }
                        })}
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
