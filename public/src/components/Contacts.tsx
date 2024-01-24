import { useState } from "react";
import { useEffect } from "react";
const Contacts = ({
  testcontacts,
  currentUser,
  changeChat
}: {
    testcontacts: any;
  currentUser: any;
  changeChat: (chat:any) => void;
}) => {
  const [currentUserName, setCurrentUserName] = useState<any>(undefined);
  const [currentUserImage, setCurrentUserImage] = useState<any>(undefined);
  const [currentSelected, setCurrentSelected] = useState<any>(undefined);

  useEffect(() => {
    if (currentUser) {
      setCurrentUserName(currentUser.username);
      setCurrentUserImage(currentUser.avatarImage);
    }
  }, [currentUser]);
  const changeCurrentChat = (index:any, contact:any) => {
    setCurrentSelected(index)
    changeChat(contact)
  
  };
  return (
    <>
        {currentUserImage && currentUserImage && (
        <div className="wapped-brand">
          <div className="brand">
            <img src="./logo.jpg" alt="logo" />
            <h3>Hello G-ray</h3>
          </div>
          <div className="contacts">
            {testcontacts.map((contact:any, index:any) => {
              return (
                <div
                  key={contact._id}
                  className={`contact ${
                    index === currentSelected ? "selected" : ""
                  }`}
                  onClick={() => changeCurrentChat(index, contact)}
                >
                  <div className="avatar">
                    <img
                      src={`data:image/svg+xml;base64,${contact.avatarImage}`}
                      alt="avatar"
                    />
                  </div>
                  <div className="username">
                    <h3>{contact.username}</h3>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="current-user">
            <div className="avatar">
              <img
                src={`data:image/svg+xml;base64,${currentUserImage}`}
                alt="avatar"
              />
            </div>
            <div className="username">
              <h2>{currentUserName}</h2>
            </div>
          </div>
        </div>
      )}
    </>
  );
};


export default Contacts;
