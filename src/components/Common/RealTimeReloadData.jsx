

import Echo from "laravel-echo";
import {getLSItem} from "../../utils";
import {useEffect} from "react";

import {useDispatch} from "react-redux";
import {accountActions} from "../../features/admin/account/accountSlice";

export default function RealTimeReloadData(props) {
    const dispatch = useDispatch();
    // useEffect(()=>{
    //     console.log('realtime connect')
    //     const echo = new Echo({
    //         broadcaster: "socket.io",
    //         host: 'http://redisfe.sonnguyen.top:6001',
    //         auth: { headers: { 'Authorization': 'Bearer ' + getLSItem('access_token') } },
    //
    //     })
    //
    //     echo.join('chat')
    //         .here((data) => {
    //             console.log('jkj',data)
    //             //setUsers(...users,data)
    //         })
    //         .listen('MessageSent', (event) => {
    //             console.log('event',event)
    //             //setMessages([...messages, event]);
    //         })
    //         .listen('AccountSent', (data) => {
    //         console.log('event',data)
    //             dispatch(accountActions.addAccount(data.account));
    //         //setMessages([...messages, event]);
    //         });
    // },[])
    return (
        <div></div>
    );
}

