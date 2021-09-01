import { useEffect } from "react";
import { useContext } from "react";
import { MessageContext } from "../../contexts/Messages";

type ContactsPageParams = {
  goToChat: () => void;
};

export function ContactsPage({ goToChat }: ContactsPageParams) {
  const { getUsersOnline, usersOnline, changeCurrentChatUser } =
    useContext(MessageContext);

  useEffect(() => {
    getUsersOnline();
  }, []);

  return (
    <div id="scroll-zone">
      <ul id="msg-list">
        {usersOnline.length === 0 ? (
          <li>
            <div id="msg-info1">
              <h3>Nenhum usuário online no momento</h3>
            </div>
          </li>
        ) : (
          ""
        )}
        {usersOnline.map((i) => {
          return (
            <li
              onClick={() => {
                changeCurrentChatUser(i);
                goToChat();
              }}
              key={i.authId}
            >
              <img src={i.picture} alt="profile" />
              <div id="msg-info1">
                <h3>{i.name}</h3>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
