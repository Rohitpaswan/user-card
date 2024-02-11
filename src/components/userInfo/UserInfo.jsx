import { useEffect, useState } from "react";
import { FaRegUserCircle } from "react-icons/fa";
import { FaGenderless } from "react-icons/fa6";
import { IoMdCall } from "react-icons/io";
import getUserInfo from "../../services/getUserInfo";
import "./userInfo.css";

const UserInfo = () => {
  const [userInfo, setUserInfo] = useState([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true); 
  const [activeOption, setActiveOption] = useState("name");

  const fetchUserData = async () => {
    try {
      const data = await getUserInfo();
      setUserInfo(data.results);
    } catch (e) {
      setError(e);
    } finally {
      setLoading(false); 
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  console.log(userInfo);

  return (
    <div className="userInfo">
      {loading
        ? "Loading data" 
        : userInfo.map((user, index) => {
            const name = `${user.name.title} ${user.name.first} ${user.name.last}`;
            return (
              <div key={index} className="userContainer">
                {/* User-Profile-Section */}
                <div className="avatar">
                  <div className="avatarContainer">
                    <img src={user?.picture.large} alt="user-profile" />
                  </div>
                </div>
                {/* User-Detail-Section */}
                <div className="userDetail">
                  <div className="detailLabel">{`My ${activeOption} is   `}</div>
                  <div className="detailValue">
                    {activeOption === "name" && <div> {name}</div>}
                    {activeOption === "gender" && <div>{user.gender}</div>}
                    {activeOption === "phone" && <div> {user.phone}</div>}
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
            );
          })}
    </div>
  );
};

export default UserInfo;
