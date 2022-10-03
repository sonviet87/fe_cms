import { Divider, Drawer, List } from '@mui/material';
import { mainListItems } from 'features/listItems';
import React from 'react';
import { DrawerStyled } from './SlytedComponent/Drawer';


function AdminSlidebar(props) {
    const [open, setOpen] = React.useState(true);
    const toggleDrawer = () => {
        setOpen(!open);
    };
    return (
        <DrawerStyled variant="permanent" open={open}  >
            <List component="nav">
                {mainListItems}

            </List>
        </DrawerStyled >
    );
}

export default AdminSlidebar;