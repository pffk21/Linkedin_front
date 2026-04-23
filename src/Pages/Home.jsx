import './Home.css'
import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

export function Home() {
  const { t, i18n } = useTranslation();
  const [inputText, setIText] = useState('');
  const [posts, setPosts] = useState([]);

  // Ініціалізація постів з перекладів
  useEffect(() => {
    setPosts([
      { 
        id: 1,
        author: t("posts.post1.author"),
        role: t("posts.post1.role"),
        time: t("posts.post1.time"),
        text: t("posts.post1.text"),
        image: './Pages_img/image_15.png',
        avatar: './Pages_img/chuvak1.png',
        likes: 46,
        liked: false,
      },
      {
        id: 2,
        author: t("posts.post2.author"),
        role: t("posts.post2.role"),
        time: t("posts.post2.time"),
        text: t("posts.post2.text"),
        image: './Pages_img/image_20.png',
        avatar: './Pages_img/mimimi.png',
        likes: 20,
        liked: false,
      }
    ]);
  }, [i18n.language, t]); // 👈 оновлює пости при зміні мови

  const tagLike = (index) => {
    setPosts((prevPosts) =>
      prevPosts.map((post, i) =>
        i === index
          ? {
              ...post,
              liked: !post.liked,
              likes: post.liked ? post.likes - 1 : post.likes + 1,
            }
          : post
      )
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputText.trim() === '') return;

    const id = Date.now();

    const newPost = {
      id,
      author: t("posts.you.author"),
      role: t("posts.you.role"),
      time: t("home.justNow"),
      text: inputText,
      image: './Pages_img/Webinar.jpg',
      avatar: './Header_img/Ellipse.svg',
      likes: 0,
      liked: false,
    };

    setPosts([newPost, ...posts]);
    setIText('');
  };

  return (
    <>
      <div className='home_section'>
        <div>
          <div className='home_dispare'>
            <img src='./Header_img/Ellipse.svg' />
            <form onSubmit={handleSubmit} role="search" className='sidebar_search'>
              <img src='./Pages_img/edit_square.svg' />
              <input
                type="text"
                placeholder={t("home.startPost")}
                value={inputText}
                onChange={(e) => setIText(e.target.value)}
              />
            </form>
          </div>
          <ul className='home_viewers'>
            <li className='home_li'>
              <img src='./Pages_img/camera.svg' />
              <span>{t("home.photo")}</span>
            </li>
            <li className='home_li'>
              <img src='./Pages_img/video.svg' />
              <span>{t("home.video")}</span>
            </li>
            <li className='home_li'>
              <img src='./Pages_img/CalendarCheck.svg' />
              <span>{t("home.event")}</span>
            </li>
          </ul>
        </div>
      </div>

      {posts.map((post, index) => (
        <div className='home_section' key={post.id}>
          <div className='home_content'>
            <div className='home_info'>
              <img src={post.avatar} />
              <div className='home_title'>
                <div className='homesd_name'>{post.author}</div>
                <div className='homesd_prof'>{post.role}</div>
                <div className='home_time'>{post.time}</div>
              </div>
            </div>
            <div className='home_text'>{post.text}</div>
            <img src={post.image} />
          </div>

          <ul className='home_viewers'>
            <li className='home_li' onClick={() => tagLike(index)}>
              <img
                src={
                  post.liked
                    ? './Pages_img/Thumb_upr.png'
                    : './Pages_img/thumbs_up.svg'
                }
              />
              <span
                style={{
                  fontWeight: post.liked ? 'bold' : 'normal',
                  color: post.liked ? '#6C5CE7' : 'inherit',
                }}
              >
                {t("home.like")}
              </span>
              <span>{post.likes}</span>
            </li>
            <li className='home_li'>
              <img src='./Pages_img/message_circle.svg' />
              <span>{t("home.comment")}</span>
            </li>
            <li className='home_li'>
              <img src='./Pages_img/share_2.svg' />
              <span>{t("home.share")}</span>
            </li>
            <li className='home_li'>
              <img src='./Pages_img/send.svg' />
              <span>{t("home.send")}</span>
            </li>
          </ul>
        </div>
      ))}
    </>
  );
}
