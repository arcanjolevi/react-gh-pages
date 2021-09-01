import "./msg-page.scss";
import { Play, ArrowLeft } from "react-feather";
import { useContext } from "react";
import { MessageContext } from "../../contexts/Messages";
import { AuthContext } from "../../contexts/Auth";
import { useRef } from "react";
import { getElapsedTime } from "../../utils/time";
import { useState } from "react";
import { useEffect } from "react";

type MsgPageParams = {
  goBack: () => void;
};

export function MsgPage({ goBack }: MsgPageParams) {
  const { user } = useContext(AuthContext);
  const { currentChatUser, messages, sendMsg } = useContext(MessageContext);

  const [text, setText] = useState("");
  return (
    <div className="msg-page">
      <div className="msg-header">
        <ArrowLeft
          onClick={goBack}
          className="back-btn"
          color="#505050"
          size={20}
        />
        <div className="contact">
          <p>{currentChatUser?.name}</p>
          <img src={currentChatUser?.picture} alt="img" />
        </div>
      </div>

      <div className="msg-scroll-zone">
        );
        {messages.map((i) =>
          i.senderId === user.uid ? (
            <div key={i.message} className="msg-body-sent">
              <div className="msg-data">
                <div className="msg-text">{i.message}</div>
                <div className="msg-time">
                  {i.timestamp
                    ? new Date(i.timestamp).toLocaleTimeString()
                    : ""}
                </div>
              </div>
              <img src={user.photoURL || ""} alt="img" />
            </div>
          ) : (
            <div className="msg-body-received">
              <img src={currentChatUser?.picture} alt="img" />
              <div className="msg-data">
                <div className="msg-text">{i.message}</div>
                <div className="msg-time">
                  {i.timestamp
                    ? new Date(i.timestamp).toLocaleTimeString()
                    : ""}
                </div>
              </div>
            </div>
          )
        )}
      </div>
      <div className="msg-edit-zone">
        <textarea
          onChange={(e) => {
            setText(e.target.value);
          }}
          value={text}
          name="msg"
          id="chat-msg-input"
        ></textarea>
        <div
          onClick={() => {
            sendMsg(text);
            setText("");
            let obj = document.getElementById("msg-scroll-zone");
          }}
          className="send-btn"
        >
          <Play />
        </div>
      </div>
    </div>
  );
}
