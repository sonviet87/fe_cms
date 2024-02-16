import { List, ListSubheader, Box } from '@mui/material';
import { selectRoles } from 'features/auth/authSlice';
import PropTypes from 'prop-types';
import React,{useState} from 'react';
import { useSelector } from 'react-redux';
import SidebarItem from './SidebarItem';



function SidebarListItem({ list }) {
    const initialState = {
        active : "",
        activeSubmenu : "",
    }
    const permissons = useSelector(selectRoles);
    const [state, setState] = useState(initialState);
    const handleMenuActive = status => {
        setState({active : status});
        if(state.active === status){
            setState({active : ""});
        }

    }
    const handleSubmenuActive = (status) => {
        setState({activeSubmenu : status})
        if(state.activeSubmenu === status){
            setState({activeSubmenu : ""})

        }

    }
    return (
        <>
            {list.map((dt, key) => (
                <List
                    key={key}
                    component="nav"
                    subheader={
                        <ListSubheader component="div">

                        </ListSubheader>
                    }
                >
                    {dt.items.map((item, idx) => {
                        if (permissons.includes(item.permission) || item.permission === 'all') {
                            return <SidebarItem {...item} key={idx} handleMenuActive={handleMenuActive} state={state} />
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
