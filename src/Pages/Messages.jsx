import './Messages.css'
import { useState, useRef, useEffect, useContext } from "react";
import { useTranslation } from "react-i18next";
import AppContext from '../AppContext'; 

export function Messages() {
  const { t } = useTranslation();
  const { request, user } = useContext(AppContext); 

  const [inputText, setInputText] = useState("");
  const [messages, setMessages] = useState([]);
  const chatContainerRef = useRef(null);

  useEffect(() => {
    if (user && user.sub) {
      request(`/api/messages/history?user1=${user.sub}&user2=${user.sub}`)
        .then(res => {
          const loadedMessages = res.data.map(m => ({
            text: m.text,
            sender: "sent", 
            time: new Date(m.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
          }));
          setMessages(loadedMessages);
        })
        .catch(err => console.error(err));
    }
  }, [user, request]);

  const scrollToBottom = () => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTo({
        top: chatContainerRef.current.scrollHeight,
        behavior: "smooth"
      });
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    const text = inputText.trim();
    if (text === "" || !user) return;

    setInputText("");

    const messagePayload = {
      senderId: user.sub,
      receiverId: user.sub,
      text: text
    };

    try {
      await request('/api/messages', {
        method: 'POST',
        body: JSON.stringify(messagePayload)
      });

      setMessages(prev => [...prev, {
        text,
        sender: "sent",
        time: t("time.now")
      }]);

    } catch (error) {
      console.error(error);
      setInputText(text); 
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className='chat_wrapper'>
      <div className="chat-header">
        <div className="chat-user">
          <div className="avatar-wrapper">
            <img src="./ChatSidebar_img/Avatar1.png" alt="avatar" className="chat-avatar" />
            <span className="online-dot"></span>
          </div>
          <div className="chat-user-info">
            <div className="chat-username">Marcus Dias (Test)</div>
            <div className="chat-status">{t("time.now")}</div>
          </div>
        </div>
        <div className="chat-actions">
         <img src="./Chat_img/phone.png" alt="phone" />
         <img src="./Chat_img/search.png" alt="search" />
         <img src="./Chat_img/more.png" alt="more" />
        </div>
      </div>

      <div className="chat-messages" ref={chatContainerRef}>
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

        {messages.map((msg, index) => (
          <div key={index} className={`message-row ${msg.sender}`}>
             {msg.sender === "received" && (
                <img src="./ChatSidebar_img/Avatar1.png" alt="avatar" className="message-avatar" />
             )}
            <div className="message-content">
              <div className="message-text">{msg.text}</div>
              <div className={msg.sender === "sent" ? "message-time2" : "message-time"}>
                {msg.time}
              </div>
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