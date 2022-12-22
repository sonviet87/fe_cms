import React from 'react';

function useCollapsible(props) {
    const [open, setOPen] = React.useState(false);
    const toggle = () => {
        setOPen(!open);
    };
    return { toggle, open };
}

export default useCollapsible;