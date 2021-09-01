import { useContext } from "react";
import { Bell } from "react-feather";
import { AuthContext } from "../../contexts/Auth";
import "./profileBall.scss";

const profileAvatar =
  "https://t3.ftcdn.net/jpg/03/46/83/96/360_F_346839683_6nAPzbhpSkIpb8pmAwufkC7c5eD7wYws.jpg";

function profilePicture(url: string) {
  if (url) {
    return url;
  } else {
    return profileAvatar;
  }
}

export function ProfileBall() {
  var { user } = useContext(AuthContext);

  return (
    <div id="top-right-container">
      <div id="notications-icon">
        <div id="notification-number">
          <h3>12</h3>
        </div>
        <Bell size={40} color="#3F3D56" />
      </div>
      <div id="ball">
        <img src={profilePicture(user.photoURL as string)} alt="" />
      </div>
    </div>
  );
}
