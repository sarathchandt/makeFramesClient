import React, { useEffect, useState, useRef } from 'react'
import axios from 'axios'
import { useSearchParams } from 'react-router-dom'
import { UURL } from '../../../API/apiCall'
import { io } from "socket.io-client";



import './chatBox.css'

function chatUser() {

  const [people, setPeople] = useState([])
  const [socketMessages, setSocketMessages] = useState(null)
  const [chatNow, setChatNow] = useState([])
  const [self, setSelf] = useState({})
  const [person, setPerson] = useState(null)
  const [unique, setUnique] = useState(true)
  const [searchParams] = useSearchParams()
  const [inputMessage, setInputMessage] = useState('')
  const [uniq, setuniq] = useState(true)
  // ......................................

  // ......................................






  const messageRef = useRef();
  let socket = io.connect("https://makeframes.herewego.shop")
  // let socket = io.connect("http://localhost:3033")
  
  useEffect(() => {
   
    let token  = localStorage.getItem('usertoken');
    const headers = { Authorization: `Bearer ${token}` };
    axios.post(`${UURL}tekeMessagePeople`, { toId: searchParams.get('userId') },{ headers} ).then(res => {
     
      axios.post(`${UURL}takeUsersForChat`, { people: res?.data?.MessagedPeople }, { headers } ).then(res => {
        setPeople(res?.data)
      })
      setSelf(res?.data);
      socket.emit("addUser", self?._id);

    })


}, [])
  // useEffect(() => {
    
  //   if (self?._id) {
      
     
  //   }
  // }, [self._id])


  useEffect(() => {
    messageRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [inputMessage])


  function setupPerson(obj) {
    let token  = localStorage.getItem('usertoken');
    const headers = { Authorization: `Bearer ${token}` };
    axios.post(`${UURL}getChat`, { userid2: obj._id, userid1: self._id }, { headers }).then(res => {
      setChatNow(res?.data)
    })
    setPerson(obj)
    axios.post(`${UURL}bringDp`, { token:token }).then(res=>{
      setSelf(res?.data)
    })

  }

  function sendMsg() {
    const messages = {
      myself: true,
      message: inputMessage,
      hr: new Date().getHours(),
      min: new Date().getMinutes()
    }

    socket.emit("send-msg", {
      to: person._id,
      messages: inputMessage,
      from: self._id
    });
    let token  = localStorage.getItem('usertoken');
    const headers = { Authorization: `Bearer ${token}` };
    
    axios.post(`${UURL}message`, { from: self._id, to: person._id, message: inputMessage }, { headers });

    setChatNow(chatNow.concat(messages))
    setInputMessage('')

  }
 
 
  useEffect(() => {

    if (socket) {
      let token  = localStorage.getItem('usertoken');
      const headers = { Authorization: `Bearer ${token}` };
      socket.on("receive", (data) => {
       axios.post(`${UURL}bringDp`, { token:token }).then(res=>{
        console.log(self);
        
            if (res.data._id != data.from &&  data?.to == res.data._id) {
              setSocketMessages({ myself: false, message: data.messages });
            }
          })
      })
    }
  }, [socketMessages])

  useEffect(() => {
    socketMessages && setChatNow((pre) => [...pre, socketMessages]);
  }, [socketMessages]);


  return (
    <div>
      <main class="content bg-darkGreen">
        <div class="container p-2">


          <div class="card bg-green mt-5">
            <div class="row g-0">
              <div class="col-12 col-lg-5 col-xl-3 border-right">

                <div class="px-4 d-none d-md-block">
                  <div class="d-flex align-items-center">
                    <div class="flex-grow-1">
                      <input type="text" class="form-control my-3" placeholder="Search..." />
                    </div>
                  </div>
                </div>
                <div className='scroll-object'>
                  {
                    people.map(obj => {
                      return <>
                        <a href="#" class="list-group-item list-group-item-action border-0 mt-2" onClick={() => { setupPerson(obj) }}>
                          <div class="d-flex align-items-start">
                            <img src={obj?.dpimage ? obj?.dpimage : "/images/146-1468295_business-man-profile-icon-business-profile-icon-png.png"} class="rounded-circle mr-1" alt="Vanessa Tucker" width="40" height="40" />
                            <div class="flex-grow-1 ml-3">
                              {obj?.firstName}
                              <div class="small"><span class=" chat-online"></span> </div>
                            </div>
                          </div>
                        </a>
                      </>
                    })
                  }
                </div>







                <hr class="d-block d-lg-none mt-1 mb-0" />
              </div>


              <div class="col-12 col-lg-7 col-xl-9">
                {person ? <>
                  <div class="py-2 px-4 border-bottom d-none d-lg-block">
                    <div class="d-flex align-items-center py-1">
                      <div class="position-relative">
                        <img src={person?.dpimage ? person?.dpimage : "/images/146-1468295_business-man-profile-icon-business-profile-icon-png.png"} class="rounded-circle mr-1" alt="Sharon Lessman" width="40" height="40" />
                      </div>
                      <div class="flex-grow-1 pl-3">
                        <strong>{person?.firstName}</strong>
                        <div class="text-muted small"><em></em></div>
                      </div>
                      <div>
                        <button class="btn btn-primary btn-lg mr-1 px-3"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-phone feather-lg"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg></button>
                        <button class="btn btn-info btn-lg mr-1 px-3 d-none d-md-inline-block"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-video feather-lg"><polygon points="23 7 16 12 23 17 23 7"></polygon><rect x="1" y="5" width="15" height="14" rx="2" ry="2"></rect></svg></button>
                        <button class="btn btn-light border btn-lg px-3"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-more-horizontal feather-lg"><circle cx="12" cy="12" r="1"></circle><circle cx="19" cy="12" r="1"></circle><circle cx="5" cy="12" r="1"></circle></svg></button>
                      </div>
                    </div>
                  </div>

                  <div class="position-relative scroll-object ">
                    {chatNow.length > 0 ?
                      chatNow.map(obj => {
                        return <>

                          <div class="chat-messages p-4" >
                            {obj.myself ? <></> :
                              <div class="chat-message-left pb-4 text-dark " >
                                <div>
                                  <img src={person?.dpimage ? person?.dpimage : "/images/146-1468295_business-man-profile-icon-business-profile-icon-png.png"} class="rounded-circle mr-1" alt="Sharon Lessman" width="40" height="40" />
                                  <div class="text-muted small text-nowrap mt-2">{obj?.hr}:{obj?.min}</div>
                                </div>
                                <div class="flex-shrink-1 bg-light rounded py-2 px-3 ml-3" ref={messageRef}>
                                  {obj?.message}
                                </div>

                              </div>}

                            {obj.myself ?
                              <div class="chat-message-right mb-4 text-darkGreen" >
                                <div>
                                  <img src="/images/146-1468295_business-man-profile-icon-business-profile-icon-png.png" class="rounded-circle mr-1" alt="Chris Wood" width="40" height="40" />
                                  <div class="text-muted small text-nowrap mt-2">{obj?.hr}:{obj?.min}</div>
                                </div>
                                <div class="flex-shrink-1 bg-light rounded py-2 px-3 mr-3" ref={messageRef}>
                                  <div class="font-weight-bold mb-1">You</div>
                                  {obj?.message}
                                </div>
                              </div> : <></>}
                          </div>
                        </>
                      }) : <>


                      </>
                    }
                  </div>

                  <div class="flex-grow-0 py-3 px-4 border-top">
                    <div class="input-group">
                      <input type="text" class="form-control" placeholder="Type your message" value={inputMessage} onChange={(e) => { setInputMessage(e.target.value) }} />
                      <button class="btn btn-primary" onClick={() => {
                        sendMsg()
                      }}>Send</button>
                    </div>
                  </div>
                </> : <>
                  <div className="container">
                    <div className="row">
                      <div className="col-12 d-flex justify-content-center mt-5">
                        <div className='w-11/12 rounded bg-dark text-green text-center p-3'>
                          ! Just start chat
                        </div>
                      </div>
                    </div>
                  </div>

                </>}

              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default chatUser