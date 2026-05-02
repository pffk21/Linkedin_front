import './Home.css';
import { useState, useEffect, useContext, useRef } from 'react'; 
import { useTranslation } from 'react-i18next';
import AppContext from '../AppContext';


export function Home() {
  const { t, i18n } = useTranslation();
  const [inputText, setIText] = useState('');
  const [posts, setPosts] = useState([]);

  const {user, backUrl} = useContext(AppContext);

  const fileInputRef = useRef(null);
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  useEffect(() => {
    setPosts([
      { 
        id: 1,
        author: t("posts.post1.author"),
        role: t("posts.post1.role"),
        time: t("posts.post1.time"),
        description: t("posts.post1.text"), 
        imageUrl: './Pages_img/image_15.png', 
        avatar: './Pages_img/chuvak1.png',
        likes: 46,
        liked: false,
      },
      {
        id: 2,
        author: t("posts.post2.author"),
        role: t("posts.post2.role"),
        time: t("posts.post2.time"),
        description: t("posts.post2.text"), // Под БД
        imageUrl: './Pages_img/image_20.png', // Под БД
        avatar: './Pages_img/mimimi.png',
        likes: 20,
        liked: false,
      }
    ]);
  }, [i18n.language, t]); 


  useEffect(() => {
  const fetchPosts = async () => {
    try {
      const response = await fetch(`${backUrl}/api/post`);
      if (response.ok) {
        const result = await response.json(); 
        if (result.status && result.status.code === 200 && Array.isArray(result.data)) {
          
          const normalizedPosts = result.data.map(post => ({
            ...post,
            description: post.description || post.Description,
            imageUrl: post.imageUrl || post.ImageUrl || post.image,
            author: post.authorName || post.author || "User",
            avatar: post.authorAvatar || post.avatar || './Header_img/Ellipse.svg',
            role: post.authorRole || post.role || "Member",
            likes: post.likesCount !== undefined ? post.likesCount : (post.likes || 0),
            liked: post.isLikedByMe || post.liked || false
          }));

          setPosts(prev => {
            const combined = [...normalizedPosts, ...prev];
            const uniquePosts = Array.from(new Map(combined.map(item => [item.id, item])).values());
            return uniquePosts;
          });
        }
      }
      console.log("Полный объект user из AppContext:", user);
      console.log("Что идет в getPhotoSrc:", user?.avatarPhoto || user?.AvatarPhoto);
    } catch (error) {
      console.error('Ошибка при запросе постов:', error);
    }
  };

  if (backUrl) {
    fetchPosts();
  }
}, [backUrl]);

  const tagLike = async (index) => {
    if (!user || !user.sub) {
      alert("Please log in to like posts");
      return;
    }

    const post = posts[index];
    const originalPosts = [...posts];

    setPosts((prevPosts) =>
      prevPosts.map((p, i) =>
        i === index
          ? {
              ...p,
              liked: !p.liked,
              likes: p.liked ? (p.likes || 1) - 1 : (p.likes || 0) + 1,
            }
          : p
      )
    );

    try {
      const response = await fetch(`${backUrl}/api/post/like`, { 
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          postId: post.id,
          userId: user.sub, 
          reactionType: true 
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to update like on server");
      }
      
      const result = await response.json();
      console.log("Server synced:", result.data);

    } catch (error) {
      console.error("Like error:", error);
      setPosts(originalPosts);
      alert("Could not save your like. Check connection.");
    }
  };

  const handleSubmit = async (e) => {
    
    e.preventDefault();
    if (inputText.trim() === '' && !selectedFile) return;

    const formData = new FormData();
    formData.append('Description', inputText);
    
    if (selectedFile) {
        formData.append('ImageFile', selectedFile);
    }
    if (user && user.sub) {
        formData.append('UserId', user.sub);
    } else {
        alert("Please log in again. Your session might be invalid.");
        return;
    }

    try {
        const response = await fetch(`${backUrl}/api/post`, {
            method: 'POST',
            body: formData,
        });

        const result = await response.json();

        if (response.ok && result.status?.code === 200) {
            const newPostFromDb = result.data;
            
            const displayPost = {
                ...newPostFromDb,
                description: newPostFromDb.description || newPostFromDb.Description,
                imageUrl: newPostFromDb.imageUrl || newPostFromDb.ImageUrl,
                avatar: user.avatarPhoto || './Header_img/Ellipse.svg',
                author: user.name || "You", 
                role: user.aboitSection || "Member",
                likes: 0,
                liked: false
            };

            setPosts(prev => [displayPost, ...prev]);
            setIText('');
            setSelectedFile(null);
        } else {
            console.error("Server error message:", result.data);
            alert("Error: " + result.data);
        }
    } catch (error) {
        console.error("Network error:", error);
    }
};
const FALLBACK_PHOTO_URL = './Header_img/Ellipse.svg';
const baseUrl = backUrl ? backUrl.replace(/\/$/, '') : '';

const getPhotoSrc = (path) => {
    if (!path) return FALLBACK_PHOTO_URL;
    if (path.startsWith('http') || path.startsWith('./')) return path;
    
    let cleanPath = path;
    
    if (cleanPath.startsWith('/api/storage/')) {
        cleanPath = cleanPath.replace('/api/storage/', '/Storage/Item/');
    } 
    else if (!cleanPath.includes('/')) {
        cleanPath = `/Storage/Item/${cleanPath}`; 
    } 
    else if (!cleanPath.startsWith('/')) {
        cleanPath = `/${cleanPath}`;
    }
    
    return `${baseUrl}${cleanPath}`;
};
const handleImageError = (e) => {
    if (!e.target.src.includes('Ellipse.svg')) {
        e.target.src = FALLBACK_PHOTO_URL;
    }
};
  return (
    <>
      <div className='home_section'>
        <div>
          <div className='home_dispare'>
            <img 
              src={getPhotoSrc(user?.avatarPhoto || user?.AvatarPhoto)} 
              alt="my avatar" 
              onError={handleImageError}
            />
            <form onSubmit={handleSubmit} role="search" className='sidebar_search'>
              <img src='./Pages_img/edit_square.svg' alt="edit" />
              <input
                type="text"
                placeholder={t("home.startPost")}
                value={inputText}
                onChange={(e) => setIText(e.target.value)}
              />
            </form>
          </div>

          <input 
            type="file" 
            ref={fileInputRef} 
            style={{ display: 'none' }} 
            accept="image/*,video/*" 
            onChange={handleFileChange}
          />

          <ul className='home_viewers'>
            <li className='home_li' onClick={() => fileInputRef.current.click()}>
              <img src='./Pages_img/camera.svg' alt="camera" />
              <span style={{ color: selectedFile ? '#0a66c2' : 'inherit' }}>
                {selectedFile ? "File selected" : t("home.photo")}
              </span>
            </li>
            
            <li className='home_li' onClick={() => fileInputRef.current.click()}>
              <img src='./Pages_img/video.svg' alt="video" />
              <span>{t("home.video")}</span>
            </li>

            <li className='home_li'>
              <img src='./Pages_img/CalendarCheck.svg' alt="event" />
              <span>{t("home.event")}</span>
            </li>
          </ul>
        </div>
      </div>

      {posts.map((post, index) => {
        const authorAvatarSrc = getPhotoSrc(post.avatar || post.authorAvatar);
        const postImageSrc = (post.imageUrl || post.image) ? getPhotoSrc(post.imageUrl || post.image) : null;

        return (
          <div className='home_section' key={post.id || index}>
            <div className='home_content'>
              <div className='home_info'>
                <img 
                  src={authorAvatarSrc} 
                  alt="avatar" 
                  onError={handleImageError}
                />
                <div className='home_title'>
                  <div className='homesd_name'>{post.author || "User"}</div>
                  <div className='homesd_prof'>{post.role || "Member"}</div>
                  <div className='home_time'>
                    {post.createdAt ? new Date(post.createdAt).toLocaleDateString() : post.time}
                  </div>
                </div>
              </div>
              
              <div className='home_text'>{post.description}</div>
              
              {postImageSrc && (
                <img 
                  src={postImageSrc} 
                  alt="post content" 
                  style={{ width: '100%', borderRadius: '8px', marginTop: '10px' }}
                  onError={(e) => { e.target.style.display = 'none'; }}
                />
              )}
            </div>

            <ul className='home_viewers'>
              <li className='home_li' onClick={() => tagLike(index)}>
                <img
                  src={post.liked ? './Pages_img/Thumb_upr.png' : './Pages_img/thumbs_up.svg'}
                  alt="like"
                />
                <span style={{ 
                  fontWeight: post.liked ? 'bold' : 'normal', 
                  color: post.liked ? '#6C5CE7' : 'inherit' 
                }}>
                  {t("home.like")}
                </span>
                <span>{post.likes || 0}</span>
              </li>
              <li className='home_li'>
                <img src='./Pages_img/message_circle.svg' alt="comment" />
                <span>{t("home.comment")}</span>
              </li>
              <li className='home_li'>
                <img src='./Pages_img/share_2.svg' alt="share" />
                <span>{t("home.share")}</span>
              </li>
              <li className='home_li'>
                <img src='./Pages_img/send.svg' alt="send" />
                <span>{t("home.send")}</span>
              </li>
            </ul>
          </div>
        );
      })}
    </>
  );
}
