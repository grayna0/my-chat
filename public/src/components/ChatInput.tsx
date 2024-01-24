import { useState } from "react";
import { BsEmojiSmileFill } from "react-icons/bs";
import { IoMdSend } from "react-icons/io";
import Picker from "emoji-picker-react";

const ChatInput = ({handleSendMsg}:{handleSendMsg:(msg:string) => void}) => {
  const [showEmoji, setShowemoji] = useState(false);
  const [msg, setMsg] = useState("");
  const handleEmojiHideShow = () => {
    setShowemoji(!showEmoji);
  };
  const handleEmojiClick = (emojiData:any) => {
    const emojiResult = emojiData.isCustom
      ? emojiData.unified
      : emojiData.emoji;
    let message = msg;
    message += emojiResult;
    setMsg(message);
  };
  const senChat = (event:any ) => {
event.preventDefault();
if(msg.length >0) {
  handleSendMsg(msg)
  setMsg("")
}

  }
  return (
    <div className="chat-input">
      <div className="button-container">
        <div className="emoji">
          <BsEmojiSmileFill onClick={handleEmojiHideShow} />
          {showEmoji && <Picker onEmojiClick={handleEmojiClick} />}
        </div>
      </div>
      <form className="input-container" onSubmit={e => senChat(e)}>
        <input
          type="text"
          placeholder="type your messages here"
          value={msg}
          onChange={(e) => setMsg(e.target.value)}
        />
        <button className="submit">
          <IoMdSend />
        </button>
      </form>
    </div>
  );
};


export default ChatInput;
