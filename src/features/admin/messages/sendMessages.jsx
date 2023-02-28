import '../../../App.css';
import {useEffect, useState} from "react";
import Echo from "laravel-echo";
import axios from "axios";
import axiosClient from "../../../api/axiosClient";
import {getLSItem} from "../../../utils";

export default function SendMessages() {
    const [user,setUser] = useState({id:'',name:''});
    const [users,setUsers] = useState([]);
    const [messages,setMessages] = useState([]);
    const [message,setMessage] = useState('');



    useEffect(()=>{
        const echo = new Echo({
            broadcaster: "socket.io",
            host: 'http://redisfe.sonnguyen.top:6001',
            auth: { headers: { 'Authorization': 'Bearer ' + getLSItem('access_token') } },

        })

        echo.join('chat')
            .here((data) => {
                console.log('jkj',data)
                //setUsers(...users,data)
            }).joining((user) => {
            console.log(user);
        })
            .leaving((user) => {
                console.log(user);
            })
            .listen('MessageSent', (event) => {
                console.log('event',event)
                //setMessages([...messages, event]);
            });
    },[])

    const  handleChange =(event) => {
        setMessage (event.target.value);
    }
    const handleSendMess = () =>{

        axiosClient.post('http://redisfe.sonnguyen.top/api/message', { message: message })

    }
    return (

        <div id="app" className="container">

            <h3 className=" text-center">Messaging | User: </h3>
            <div className="messaging">
                <div className="inbox_msg">
                    <div className="inbox_people">
                        <div className="inbox_chat">
                            <div v-for="user in users" className="chat_list">
                                <div className="chat_people">
                                    <div className="chat_img"><img src="https://ptetutorials.com/images/user-profile.png" alt="sunil"/>
                                    </div>
                                    <div className="chat_ib">
                                        <h5><span className="chat_date">Dec 25</span></h5>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="mesgs">
                        <div className="msg_history">
                            <div >
                                <div className="incoming_msg">
                                    <div className="incoming_msg_img"><img src="https://ptetutorials.com/images/user-profile.png"
                                                                           alt="sunil"/>
                                    </div>
                                    <div className="received_msg">
                                        <div className="received_withd_msg">
                                            <p/>
                                            <span className="time_date"> 11:01 AM | June 9</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="outgoing_msg">
                                    <div className="sent_msg">
                                        <p/>
                                        <span className="time_date"> 11:01 AM | June 9</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="type_msg">
                            <form onSubmit={handleSendMess}>
                                <div className="input_msg_write">
                                    <input type="text"  onChange={handleChange} />
                                    <button type="submit" onClick={handleSendMess} className="msg_send_btn" type="button"><i className="fa fa-paper-plane-o" aria-hidden="true"/>
                                    </button>
                                    <input type="submit" value="Submit" />
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    );
}


