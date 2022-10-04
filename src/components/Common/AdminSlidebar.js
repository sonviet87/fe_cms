import React from 'react';
import { MenuCMS } from './Sliderbar/SidebarDataMenu';
import SidebarListItem from './Sliderbar/SidebarListItem';
import { DrawerStyled } from './SlytedComponent/Drawer';


function AdminSlidebar(props) {

    return (
        <DrawerStyled variant="permanent" open={props.open}  >
            <SidebarListItem list={MenuCMS} />
        </DrawerStyled >
    );
}

export default AdminSlidebar;