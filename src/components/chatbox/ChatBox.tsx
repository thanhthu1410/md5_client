
import React, { useEffect, useState } from "react";
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardHeader,
  MDBCardBody,
  MDBCardFooter,
  MDBIcon,
  MDBBtn
} from "mdb-react-ui-kit";
import './chatBox.scss'
import { Socket, io } from "socket.io-client";
import moment from 'moment';
import { useSelector } from "react-redux";
import { StoreType } from "../../stores/index";
interface Data {
  open: boolean,
  setOpenChat: Function
}
export default function App(data: Data) {
  const userStore = useSelector((store: StoreType) => {
    return store.userStore
  })
  console.log("userStore", userStore)
  const [socketClient, setSocketClient] = useState<null | Socket>(null)
  const [messageData, setMessageData] = useState<any[]>([])
  const [inputContent, setInputContent] = useState("");
  useEffect(() => {
    if (data.open) {
      /* Connect */
      setSocketClient(io(`http://127.0.0.1:3000`, {
        query: {
          "token": localStorage.getItem("token")
        }
      }))
    } else {
      /* Disconnect */
      socketClient?.disconnect();
      setSocketClient(null)
    }
  }, [data.open])

  useEffect(() => {
    if (socketClient) {
      console.log("vào client")
      socketClient.on('connectStatus', (data: any) => {
        //alert(data)
      })

      socketClient.on('historyMessage', (data: any) => {
        console.log("vào")
        setMessageData(data)
      })
    }
  }, [socketClient])

  const sendMessage = () => {
    if (inputContent.trim() !== '') {
      socketClient?.emit('createMessage', {
        socketId: socketClient?.id,
        userId: (userStore! as any).id,
        content: inputContent,
      });
      setInputContent('');
    }
  };

  const handleKeyPress = (e: any) => {
    if (e.key === 'Enter') {
      e.preventDefault(); // Ngăn chặn hành vi mặc định của phím "Enter" (nếu có) - chẳng hạn như gửi biểu mẫu.
      sendMessage(); // Gọi hàm sendMessage khi "Enter" được nhấn.
    }
  };

  // function formatData(data: any) {
  //   let result = []
  //   for (let i in data) {
  //     if (result.length == 0) {
  //       result.push({
  //         ...data[i],
  //         contents: [{
  //           content: data[i].content,
  //           time: data[i].time
  //         }]
  //       })
  //     } else {
  //       if (data[i].type == result[result.length - 1].type) {
  //         result[result.length - 1].contents.push({
  //           content: data[i].content,
  //           time: data[i].time
  //         })
  //       } else {
  //         result.push({
  //           ...data[i],
  //           contents: [{
  //             content: data[i].content,
  //             time: data[i].time
  //           }]
  //         })
  //       }
  //     }
  //   }
  //   return result
  // }
  return (
    <MDBContainer fluid className="py-5" style={{ backgroundColor: "transparent" }}>
      <MDBRow className="d-flex justify-content-center">
        <MDBCol>
          <MDBCard id="chat2" style={{ borderRadius: "15px", border: "1px solid grey" }}>
            <MDBCardHeader className="d-flex justify-content-between align-items-center p-3">
              <h5 className="mb-0">Furniture Store</h5>
              <button className="close__chat__button" onClick={() => data.setOpenChat(false)}>
                <span className="material-symbols-outlined">
                  close
                </span>
              </button>
            </MDBCardHeader>
            {/* Nơi Render Các Đoạn Chat */}
            <div
              style={{ position: "relative", height: "400px", overflowY: "auto" }}
            >
              <MDBCardBody>
                {/* {
                  formatData(messageData).map(message => {
                    if (message.type == "ADMIN") {


                      return (
                        <div key={Math.random() * Date.now()} className="d-flex flex-row justify-content-start">
                          <img
                            src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3-bg.webp"
                            alt="avatar 1"
                            style={{ width: "45px", height: "100%" }}
                          />
                          <div className="content">
                            {
                              message.contents.map((item: any) => (
                                <p
                                key={Math.random() * Date.now()}
                                  className="small p-2 ms-3 mb-1 rounded-3"
                                  style={{ backgroundColor: "#f5f6f7" }}
                                >
                                  {item.content}
                                </p>
                              ))
                            }
                            <p className="small ms-3 mb-3 rounded-3 text-muted">
                              {moment(new Date(Number(message.time))).format('LT')}
                            </p>
                          </div>
                        </div>
                      )
                    } else {
                      return (
                        <div key={Math.random() * Date.now()} className="d-flex flex-row justify-content-end">
                          <div className="content">
                            {
                              message.contents.map((item: any) => (
                                <p
                                key={Math.random() * Date.now()}
                                  className="small p-2 me-3 mb-1 text-white rounded-3 bg-primary"
                                  style={{ backgroundColor: "#f5f6f7" }}
                                >
                                  {item.content}
                                </p>
                              ))
                            }
                            <p className="small ms-3 mb-3 rounded-3 text-muted">
                              {moment(new Date(Number(message.time))).format('LT')}
                            </p>
                          </div>
                          <img
                            src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3-bg.webp"
                            alt="avatar 1"
                            style={{ width: "45px", height: "100%" }}
                          />
                        </div>
                      )
                    }
                  })
                } */}
                 {
                  messageData.map(message => {
                    if (message.adminId != null) {
                      return (
                        <div key={Math.random() * Date.now()} className="d-flex flex-row justify-content-start">
                          <img
                            src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3-bg.webp"
                            alt="avatar 1"
                            style={{ width: "45px", height: "45px", borderRadius: "50%" }}
                          />
                          <div className="content">
                          <p
                                key={Math.random() * Date.now()}
                                  className="small p-2 ms-3 mb-1 rounded-3"
                                  style={{ backgroundColor: "#f5f6f7" }}
                                >
                                  {message.content}
                                </p>
                            <p className="small ms-3 mb-3 rounded-3 text-muted">
                              {moment(new Date(Number(message.time))).format('LT')}
                            </p>
                          </div>
                        </div>
                      )
                    } else {
                      return (
                        <div key={Math.random() * Date.now()} className="d-flex flex-row justify-content-end">
                          <div className="content">
                          <p
                                key={Math.random() * Date.now()}
                                  className="small p-2 me-3 mb-1 text-white rounded-3 bg-primary"
                                  style={{ backgroundColor: "#f5f6f7" }}
                                >
                                  {message.content}
                                </p>
                            <p className="small ms-3 mb-3 rounded-3 text-muted">
                              {moment(new Date(Number(message.time))).format('LT')}
                            </p>
                          </div>
                          <img
                            src={message?.user.avatar}
                            alt="avatar 1"
                            style={{ width: "45px", height: "45px", borderRadius: "50%" }}
                          />
                        </div>
                      )
                    }
                  })
                }
              </MDBCardBody>
            </div>
            <MDBCardFooter className="text-muted d-flex justify-content-start align-items-center p-3">
              <img
                src={`${userStore && (userStore! as any).data?.avatar}`}
                alt="avatar 3"
                style={{ width: "40px", height: "40px", borderRadius: "50%" }}
              />
              <input
                type="text"
                className="form-control form-control-lg"
                id="exampleFormControlInput1"
                placeholder="Type message"
                value={inputContent}
                onChange={(e) => {
                  setInputContent(e.target.value)
                }}
                onKeyPress={handleKeyPress}
              ></input>
              <a className="ms-1 text-muted" href="#!">
                <MDBIcon fas icon="paperclip" />
              </a>
              <a className="ms-3 text-muted" href="#!">
                <MDBIcon fas icon="smile" />
              </a>
              {inputContent != "" ? <span onClick={() => {
                sendMessage()
                setInputContent("")
              }} className="ms-3">
                <MDBIcon fas icon="paper-plane active" />
              </span> : <span onClick={() => {
                sendMessage()
                setInputContent("")
              }} className="ms-3">
                <MDBIcon fas icon="paper-plane" />
              </span>}
            </MDBCardFooter>
          </MDBCard>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
}