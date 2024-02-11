import {  useEffect, useState } from "react";
import { FaRegUserCircle } from "react-icons/fa";
import { FaGenderless } from "react-icons/fa6";
import { IoMdCall } from "react-icons/io";
import getUserInfo from "../../services/getUserInfo";
import "./userInfo.css";

const UserInfo = () => {
  const [userInfo, setUserInfo] = useState(null);
  const [error, setError] = useState(null);
  const [activeOption, setActiveOption] = useState("name");

  const fetchUserData = async () => {
    try {
      const data = await getUserInfo();
      setUserInfo(data);
    } catch (e) {
      setError(e);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  return (
    <div className="userInfo">
      {error && <div>Error: {error.message}</div>}
      {userInfo && (
        <div className="userContainer">
          {/* User-Profile-Section */}
          <div className="avatar">
            <div className="avatarContainer">
              <img src={userInfo?.picture.large} alt="user-profile" />
            </div>
          </div>
          {/* User-Detail-Section */}
          <div className="userDetail">
            <div className="detailLabel">{`My ${activeOption} is   `}</div>
            <div className="detailValue">
              {activeOption === "name" && (
                <div>
                  {userInfo.name.title} {userInfo.name.first}{" "}
                  {userInfo.name.last}
                </div>
              )}
              {activeOption === "gender" && <div>{userInfo.gender}</div>}
              {activeOption === "phone" && <div>{userInfo.phone}</div>}
            </div>
          </div>
          <div className="options">
            <FaRegUserCircle
              className="icon user"
              onMouseEnter={() => setActiveOption("name")}
            />
            <FaGenderless
              className="icon"
              onMouseEnter={() => setActiveOption("gender")}
            />
            <IoMdCall
              className="icon"
              onMouseEnter={() => setActiveOption("phone")}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default UserInfo;
