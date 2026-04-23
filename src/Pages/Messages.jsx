import './Messages.css'
import { useState } from "react";
import { useTranslation } from "react-i18next";

export function Messages() {
  const { t } = useTranslation();
  const [inputText, setInputText] = useState("");
  const [messages, setMessages] = useState([]);

  const handleSendMessage = () => {
    const text = inputText.trim();
    if (text === "") return;

    const newMessage = {
      text,
      sender: "sent",
      time: t("time.now"), 
    };

    setMessages([...messages, newMessage]);
    setInputText("");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSendMessage();
      e.target.value = "";
    }
  };

  return (
    <div className='chat_wrapper'>
      <div className="chat-header">
        <div className="chat-user">
          <div className="avatar-wrapper">
            <img
              src="./ChatSidebar_img/Avatar1.png"
              alt="avatar"
              className="chat-avatar"
            />
            <span className="online-dot"></span>
          </div>
          <div className="chat-user-info">
            <div className="chat-username">Marcus Dias</div>
            <div className="chat-status">{t("time.now")}</div>
          </div>
        </div>
        <div className="chat-actions">
         <img src="./Chat_img/phone.png" alt="phone" />
         <img src="./Chat_img/search.png" alt="search" />
         <img src="./Chat_img/more.png" alt="more" />
        </div>
      </div>

      <div className="chat-messages">
        <div className="message-row received">
          <img src="./ChatSidebar_img/Avatar1.png" alt="avatar" className="message-avatar" />
          <div className="message-content">
            <div className="message-text">Hello there!</div>
            <div className="message-text">I just finished a draft of the homepage. Take a look and let me know what you think about the idea of a bold headline with a textured fabric background.</div>
            <div className="message-time">{t("time.hoursAgo", { count: 2 })}</div>
          </div>
        </div>

        <div className="chat-divider">
          <hr className="line" />
          <span className="divider-text">{t("messages.newMessage")}</span>
          <hr className="line" />
        </div>

        <div className="message-row sent">
          <div className="message-content">
            <div className="message-text">Hey! It’s an interesting concept, but the background feels a bit distracting from the head line. Maybe we could tone down the texture or blur it slightly?</div>
            <div className="message-time2">{t("time.minutesAgo", { count: 15 })}</div>
          </div>
        </div>

        <div className="message-row received">
          <img src="./ChatSidebar_img/Avatar1.png" alt="avatar" className="message-avatar" />
          <div className="message-content">
            <div className="message-text">Great idea I’ll try lowering the contrast and see how it looks. I’ll also double-check how the font works with the change.</div>
            <div className="message-time">{t("time.minutesAgo", { count: 5 })}</div>
          </div>
        </div>

        <div className="message-row sent">
          <div className="message-content">
            <div className="message-text">Sounds good! Let me know if you need help with button colors they’re blending in a bit too much with the other elements right now.</div>
            <div className="message-time2">{t("time.minutesAgo", { count: 1 })}</div>
          </div>
        </div>

        {messages.map((msg, index) => (
          <div key={index} className={`message-row ${msg.sender}`}>
            <div className="message-content">
              <div className="message-text">{msg.text}</div>
              <div className="message-time2">{msg.time}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="chat-input">
        <div className="input-wrapper1">
<input 
  type="text" 
  placeholder={t("chat.writeSomething")} 
  value={inputText}
  onChange={(e) => setInputText(e.target.value)} 
  onKeyDown={handleKeyDown}
/>

          <div className="input-icons">
            <img src="./Chat_img/chat2.png" alt="attach" className="input-icon" />
            <img src="./Chat_img/chat1.png" alt="smile" className="input-icon" />
          </div>
        </div>
      </div>
    </div>
  );
}
