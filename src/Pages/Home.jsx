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
  console.log("ТЕКУЩИЙ ПОЛЬЗОВАТЕЛЬ В HOME:", user);
  const fetchPosts = async () => {
    try {
      const response = await fetch(`${backUrl}/api/post`);
      if (response.ok) {
        const result = await response.json(); 
        if (result.status && result.status.code === 200 && Array.isArray(result.data)) {
        
          setPosts(prev => {
            return [...result.data, ...prev];
          });
        } else {
          console.error('Бэкенд вернул ошибку или пустые данные:', result);
        }
      }
    } catch (error) {
      console.error('Ошибка при запросе постов:', error);
    }
  };

  if (backUrl) {
    fetchPosts();
  }
}, [backUrl]);

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
                authorName: user.name, 
                authorAvatar: user.avatarPhoto,
                authorRole: user.aboitSection 
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
  return (
    <>
      <div className='home_section'>
        <div>
          <div className='home_dispare'>
            <img src='./Header_img/Ellipse.svg' alt="avatar" />
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

      {posts.map((post, index) => (
        <div className='home_section' key={post.id || index}>
          <div className='home_content'>
            <div className='home_info'>
              <img src={post.avatar || './Header_img/Ellipse.svg'} alt="avatar" />
              <div className='home_title'>
                <div className='homesd_name'>{post.author || "User"}</div>
                <div className='homesd_prof'>{post.role || "Member"}</div>
                <div className='home_time'>
                  {post.createdAt ? new Date(post.createdAt).toLocaleDateString() : post.time}
                </div>
              </div>
            </div>
            {/* Выводим description из твоей модели */}
            <div className='home_text'>{post.description}</div>
            
            {/* Выводим imageUrl из твоей модели */}
            {(post.imageUrl || post.image) && (
              <img 
                src={post.imageUrl?.startsWith('http') ? post.imageUrl : (post.imageUrl ? `${backUrl}${post.imageUrl}` : post.image)} 
                alt="post content" 
                style={{ width: '100%', borderRadius: '8px' }}
              />
            )}
          </div>

          <ul className='home_viewers'>
            <li className='home_li' onClick={() => tagLike(index)}>
              <img
                src={post.liked ? './Pages_img/Thumb_upr.png' : './Pages_img/thumbs_up.svg'}
                alt="like"
              />
              <span style={{ fontWeight: post.liked ? 'bold' : 'normal', color: post.liked ? '#6C5CE7' : 'inherit' }}>
                {t("home.like")}
              </span>
              <span>{post.likes}</span>
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
      ))}
    </>
  );
}

// export function Home() {
//   const { t, i18n } = useTranslation();
//   const [inputText, setIText] = useState('');
//   const [posts, setPosts] = useState([]);

//   const {user, backUrl} = useContext(AppContext);

//   const fileInputRef = useRef(null);
//   const [selectedFile, setSelectedFile] = useState(null);

//   const handleFileChange = (e) => {
//     if (e.target.files && e.target.files[0]) {
//       setSelectedFile(e.target.files[0]);
//     }
//   };

//   useEffect(() => {
//     setPosts([
//       { 
//         id: 1,
//         author: t("posts.post1.author"),
//         role: t("posts.post1.role"),
//         time: t("posts.post1.time"),
//         description: t("posts.post1.text"), 
//         imageUrl: './Pages_img/image_15.png', 
//         avatar: './Pages_img/chuvak1.png',
//         likes: 46,
//         liked: false,
//       },
//       {
//         id: 2,
//         author: t("posts.post2.author"),
//         role: t("posts.post2.role"),
//         time: t("posts.post2.time"),
//         description: t("posts.post2.text"), // Под БД
//         imageUrl: './Pages_img/image_20.png', // Под БД
//         avatar: './Pages_img/mimimi.png',
//         likes: 20,
//         liked: false,
//       }
//     ]);
//   }, [i18n.language, t]); 


//   useEffect(() => {
//     const fetchPosts = async () => {
//       try {
//         const response = await fetch(`${backUrl}/api/posts`);
//         if (response.ok) {
//           const data = await response.json();
//           setPosts(prev => [...data, ...prev]);
//         }
//       } catch (error) {
//         console.error('Error fetching posts:', error);
//       }
//     };
//     fetchPosts();
//   }, [backUrl]);

//   const tagLike = (index) => {
//     setPosts((prevPosts) =>
//       prevPosts.map((post, i) =>
//         i === index
//           ? {
//               ...post,
//               liked: !post.liked,
//               likes: post.liked ? post.likes - 1 : post.likes + 1,
//             }
//           : post
//       )
//     );
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (inputText.trim() === '' && !selectedFile) return;

//     const formData = new FormData();
//     formData.append('Description', inputText); 
//     if (selectedFile) {
//       formData.append('ImageFile', selectedFile); 
//     }
//     if (user && user.id) {
//       formData.append('UserId', user.id); 
//     }

//     try {
//       const response = await fetch(`/api/post`, {
//         method: 'POST',
//         body: formData,
//       });

//       if (response.ok) {
//         const createdPost = await response.json();
//         setPosts([createdPost, ...posts]);
//         setIText('');
//         setSelectedFile(null);
//       }
//     } catch (error) {
//       console.error("Ошибка при сохранении:", error);
//     }
//   };

//   return (
//     <>
//       <div className='home_section'>
//         <div>
//           <div className='home_dispare'>
//             <img src='./Header_img/Ellipse.svg' alt="avatar" />
//             <form onSubmit={handleSubmit} role="search" className='sidebar_search'>
//               <img src='./Pages_img/edit_square.svg' alt="edit" />
//               <input
//                 type="text"
//                 placeholder={t("home.startPost")}
//                 value={inputText}
//                 onChange={(e) => setIText(e.target.value)}
//               />
//             </form>
//           </div>

//           <input 
//             type="file" 
//             ref={fileInputRef} 
//             style={{ display: 'none' }} 
//             accept="image/*,video/*" 
//             onChange={handleFileChange}
//           />

//           <ul className='home_viewers'>
//             <li className='home_li' onClick={() => fileInputRef.current.click()}>
//               <img src='./Pages_img/camera.svg' alt="camera" />
//               <span style={{ color: selectedFile ? '#0a66c2' : 'inherit' }}>
//                 {selectedFile ? "File selected" : t("home.photo")}
//               </span>
//             </li>
            
//             <li className='home_li' onClick={() => fileInputRef.current.click()}>
//               <img src='./Pages_img/video.svg' alt="video" />
//               <span>{t("home.video")}</span>
//             </li>

//             <li className='home_li'>
//               <img src='./Pages_img/CalendarCheck.svg' alt="event" />
//               <span>{t("home.event")}</span>
//             </li>
//           </ul>
//         </div>
//       </div>

//       {posts.map((post, index) => (
//         <div className='home_section' key={post.id || index}>
//           <div className='home_content'>
//             <div className='home_info'>
//               <img src={post.avatar || './Header_img/Ellipse.svg'} alt="avatar" />
//               <div className='home_title'>
//                 <div className='homesd_name'>{post.author || "User"}</div>
//                 <div className='homesd_prof'>{post.role || "Member"}</div>
//                 <div className='home_time'>
//                   {post.createdAt ? new Date(post.createdAt).toLocaleDateString() : post.time}
//                 </div>
//               </div>
//             </div>
//             {/* Выводим description из твоей модели */}
//             <div className='home_text'>{post.description}</div>
            
//             {/* Выводим imageUrl из твоей модели */}
//             {(post.imageUrl || post.image) && (
//               <img 
//                 src={post.imageUrl?.startsWith('http') ? post.imageUrl : (post.imageUrl ? `${backUrl}${post.imageUrl}` : post.image)} 
//                 alt="post content" 
//                 style={{ width: '100%', borderRadius: '8px' }}
//               />
//             )}
//           </div>

//           <ul className='home_viewers'>
//             <li className='home_li' onClick={() => tagLike(index)}>
//               <img
//                 src={post.liked ? './Pages_img/Thumb_upr.png' : './Pages_img/thumbs_up.svg'}
//                 alt="like"
//               />
//               <span style={{ fontWeight: post.liked ? 'bold' : 'normal', color: post.liked ? '#6C5CE7' : 'inherit' }}>
//                 {t("home.like")}
//               </span>
//               <span>{post.likes}</span>
//             </li>
//             <li className='home_li'>
//               <img src='./Pages_img/message_circle.svg' alt="comment" />
//               <span>{t("home.comment")}</span>
//             </li>
//             <li className='home_li'>
//               <img src='./Pages_img/share_2.svg' alt="share" />
//               <span>{t("home.share")}</span>
//             </li>
//             <li className='home_li'>
//               <img src='./Pages_img/send.svg' alt="send" />
//               <span>{t("home.send")}</span>
//             </li>
//           </ul>
//         </div>
//       ))}
//     </>
//   );
// }

// import './Home.css'
// import { useState, useEffect, useContext, use } from 'react';
// import { useTranslation } from 'react-i18next';

// export function Home() {
//   const { t, i18n } = useTranslation();
//   const [inputText, setIText] = useState('');
//   const [posts, setPosts] = useState([]);

//   const [user, backUrl] = useContext(AppContext);

//   const fileInputRef = useRef(null);
//   const [selectedFile, setSelectedFile] = useState(null);

//   const handleFileChange = (e) => {
//     if (e.target.files && e.target.files[0]) {
//       setSelectedFile(e.target.files[0]);
//     }
//   }



//   // Ініціалізація постів з перекладів
//   useEffect(() => {
//     setPosts([
//       { 
//         id: 1,
//         author: t("posts.post1.author"),
//         role: t("posts.post1.role"),
//         time: t("posts.post1.time"),
//         text: t("posts.post1.text"),
//         image: './Pages_img/image_15.png',
//         avatar: './Pages_img/chuvak1.png',
//         likes: 46,
//         liked: false,
//       },
//       {
//         id: 2,
//         author: t("posts.post2.author"),
//         role: t("posts.post2.role"),
//         time: t("posts.post2.time"),
//         text: t("posts.post2.text"),
//         image: './Pages_img/image_20.png',
//         avatar: './Pages_img/mimimi.png',
//         likes: 20,
//         liked: false,
//       }
//     ]);
//   }, [i18n.language, t]); 

//   useEffect(() => {
//     const fetchPosts = async () => {
//       try {
//         const response = await fetch('/api/posts');
//         setPosts(response.data);
//       } catch (error) {
//         console.error('Error fetching posts:', error);
//       }
//     }
//     fetchPosts();
//   }, [user]);

//   const tagLike = (index) => {
//     setPosts((prevPosts) =>
//       prevPosts.map((post, i) =>
//         i === index
//           ? {
//               ...post,
//               liked: !post.liked,
//               likes: post.liked ? post.likes - 1 : post.likes + 1,
//             }
//           : post
//       )
//     );
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (inputText.trim() === '' && !selectedFile) return;

//     const id = Date.now();

//     const newPost = {
//       id: Date.now(),
//       author: user?.name || "You",
//       role: user?.role || "Developer",
//       time: t("home.justNow"),
//       text: inputText,
      
//       image: selectedFile ? URL.createObjectURL(selectedFile) : null,
//       avatar: './Header_img/Ellipse.svg',
//       likes: 0,
//       liked: false,
      
//       fileData: selectedFile 
//     };
//     setPosts([newPost, ...posts]);
//     setIText('');
//   };

//   return (
//     <>
//       {/* <div className='home_section'>
//         <div>
//           <div className='home_dispare'>
//             <img src='./Header_img/Ellipse.svg' />
//             <form onSubmit={handleSubmit} role="search" className='sidebar_search'>
//               <img src='./Pages_img/edit_square.svg' />
//               <input
//                 type="text"
//                 placeholder={t("home.startPost")}
//                 value={inputText}
//                 onChange={(e) => setIText(e.target.value)}
//               />
//             </form>
//           </div>
//           <ul className='home_viewers'>
//             <form onSubmit={} role='img'>
//               <li className='home_li'>
//                 <img src='./Pages_img/camera.svg' />
//                 <span>{t("home.photo")}</span>
//               </li>
//             </form>
            
//             <li className='home_li'>
//               <img src='./Pages_img/video.svg' />
//               <span>{t("home.video")}</span>
//             </li>
//             <li className='home_li'>
//               <img src='./Pages_img/CalendarCheck.svg' />
//               <span>{t("home.event")}</span>
//             </li>
//           </ul>
//         </div>
//       </div>

//       {posts.map((post, index) => (
//         <div className='home_section' key={post.id}>
//           <div className='home_content'>
//             <div className='home_info'>
//               <img src={post.avatar} />
//               <div className='home_title'>
//                 <div className='homesd_name'>{post.author}</div>
//                 <div className='homesd_prof'>{post.role}</div>
//                 <div className='home_time'>{post.time}</div>
//               </div>
//             </div>
//             <div className='home_text'>{post.text}</div>
//             <img src={post.image} />
//           </div>

//           <ul className='home_viewers'>
//             <li className='home_li' onClick={() => tagLike(index)}>
//               <img
//                 src={
//                   post.liked
//                     ? './Pages_img/Thumb_upr.png'
//                     : './Pages_img/thumbs_up.svg'
//                 }
//               />
//               <span
//                 style={{
//                   fontWeight: post.liked ? 'bold' : 'normal',
//                   color: post.liked ? '#6C5CE7' : 'inherit',
//                 }}
//               >
//                 {t("home.like")}
//               </span>
//               <span>{post.likes}</span>
//             </li>
//             <li className='home_li'>
//               <img src='./Pages_img/message_circle.svg' />
//               <span>{t("home.comment")}</span>
//             </li>
//             <li className='home_li'>
//               <img src='./Pages_img/share_2.svg' />
//               <span>{t("home.share")}</span>
//             </li>
//             <li className='home_li'>
//               <img src='./Pages_img/send.svg' />
//               <span>{t("home.send")}</span>
//             </li>
//           </ul>
//         </div>
//       ))} */}
//     </>
//   );
// }
