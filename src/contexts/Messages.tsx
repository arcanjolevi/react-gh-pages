import { ReactNode } from "react";
import { useEffect } from "react";
import { useContext } from "react";
import { useState } from "react";
import { createContext } from "react";
import { io } from "socket.io-client";
import { baseUrlServer } from "../services/api";
import { AuthContext } from "./Auth";

type ComponentProps = {
  children: ReactNode;
};

export type ChatUserProps = {
  authId: string;
  name: string;
  picture: string;
  type: string;
};

export type MessageProps = {
  supervisorId: string;
  driverId: string;
  message: string;
  senderId: string;
  timestamp?: number;
};

export type MessageObject = {
  getUsersOnline: () => void;
  usersOnline: ChatUserProps[];
  currentChatUser?: ChatUserProps;
  changeCurrentChatUser: (value: ChatUserProps) => void;
  messages: MessageProps[];
  sendMsg: (value: string) => void;
};

export const MessageContext = createContext({} as MessageObject);

export function MessageContextProvider(props: ComponentProps) {
  const { user } = useContext(AuthContext);

  const [messages, setMessages] = useState<MessageProps[]>([]);
  const [buffer, setBuffer] = useState<MessageProps>();

  const [usersOnline, setUsersOnline] = useState<ChatUserProps[]>([]);
  const [currentChatUser, setCurrentChatUser] = useState<ChatUserProps>();

  const [socket, setSocket] = useState(io());

  useEffect(() => {
    console.log(messages);
  }, [messages]);

  useEffect(() => {
    if (typeof buffer !== "undefined") {
      setMessages([...messages, buffer]);
    }
  }, [buffer]);

  useEffect(() => {
    const newSocket = io(baseUrlServer, {
      query: {
        id: user.uid,
        type: "supervisor",
      },
    });

    newSocket.on("disconnect", () => {
      console.log("client desconectado");
    });

    newSocket.on("message", (data) => {
      console.log(data);
      receiveMsg(data.message, data.driverId, data.supervisorId, data.senderId);
    });

    setSocket(newSocket);

    return () => {
      newSocket.close();
    };
  }, []);

  function getUsersOnline() {
    socket.emit("online", {}, (data: any) => {
      console.log(data);

      setUsersOnline(data);
    });
  }

  function changeCurrentChatUser(chatUser: ChatUserProps) {
    setMessages([]);
    setCurrentChatUser(chatUser);

    socket.emit("chat", {
      id1: user.uid,
      id2: chatUser.authId,
    });
  }

  function receiveMsg(
    message: string,
    driverId: string,
    supervisorId: string,
    senderId: string
  ) {
    console.log(message);
    const newMsg: MessageProps = {
      driverId: driverId,
      message: message,
      senderId: senderId,
      supervisorId: supervisorId,
      timestamp: new Date().getTime(),
    };

    setBuffer(newMsg);
  }

  function sendMsg(msg: string) {
    socket.emit("message", {
      driverId: currentChatUser?.authId || "",
      message: msg,
      senderId: user.uid,
      supervisorId: user.uid,
    });

    const newMsg: MessageProps = {
      driverId: currentChatUser?.authId || "",
      message: msg,
      senderId: user.uid,
      supervisorId: user.uid,
      timestamp: new Date().getTime(),
    };
    setBuffer(newMsg);
  }

  return (
    <MessageContext.Provider
      value={{
        currentChatUser,
        usersOnline,
        getUsersOnline,
        changeCurrentChatUser,
        messages,
        sendMsg,
      }}
    >
      {props.children}
    </MessageContext.Provider>
  );
}
