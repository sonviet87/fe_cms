import { List, ListSubheader, Box } from '@mui/material';
import { selectRoles } from 'features/auth/authSlice';
import PropTypes from 'prop-types';
import React,{useState} from 'react';
import { useSelector } from 'react-redux';
import SidebarItem from './SidebarItem';



function SidebarListItem({ list }) {
    const permissons = useSelector(selectRoles);
    const [activeMenus, setActiveMenus] = useState({}); // Lưu trạng thái mở cho từng menu

    const handleMenuActive = (menuTitle) => {
        setActiveMenus((prevActiveMenus) => {
            const newState = { ...prevActiveMenus };

            // Đóng tất cả menu khác
            for (let key in newState) {
                newState[key] = false;
            }

            // Toggle menu hiện tại
            newState[menuTitle] = !prevActiveMenus[menuTitle];

            return newState;
        });
    };

    return (
        <>
            {list.map((dt, key) => (
                <List
                    key={key}
                    component="nav"
                    subheader={<ListSubheader component="div"></ListSubheader>}
                >
                    {dt.items.map((item, idx) => {
                        if (permissons.includes(item.permission) || item.permission === 'all') {
                            return (
                                <SidebarItem
                                    {...item}
                                    key={idx}
                                    handleMenuActive={handleMenuActive}
                                    isActive={!!activeMenus[item.title]} // Trạng thái menu
                                />
                            );
                        } else {
                            return null;
                        }
                    })}
                </List>
            ))}
        </>
    );
}



SidebarListItem.propTypes = {
    list: PropTypes.array,
};

export default SidebarListItem;
