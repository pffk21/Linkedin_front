import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Registration.css';
import AppContext from '../AppContext';


export function Entrance({ onSuccess, onSwitchToSignUp }) {
  const navigate = useNavigate(); 
  const { backUrl, request, setToken } = useContext(AppContext);

  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);

  const validate = () => {
    const newErrors = {};

    if (!formData.email.trim()) {
      newErrors.email = 'Email or phone is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email) && !/^\+?\d{10,}$/.test(formData.email)) {
      newErrors.email = 'Enter valid email or phone number';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    if (!validate()) return;

    const userPass = `${formData.email}:${formData.password}`;
    const credentials = btoa(userPass); 

    try {
      const response = await request('/api/user/jwt', {
        method: 'GET',
        headers: {
          'Authorization': `Basic ${credentials}`
        }
      });

      setToken(response.token);
      navigate('/home');
    } catch (err) {
      console.error(err);
      alert('Login failed: ' + err.message);
    }
  };

  const handleRegistration = () => {
    navigate('/registration');
  };

  return (
    <div className="logo-container1">
      <img src="./Form_img/Logo.png" alt="Logo" className="form-logo1" />
      <div className="form-container2">
        <h2 className="welcome-text1">
          Welcome back<br />
          <span className="community-text1">Sign in to your LinkUp account</span>
        </h2>

        <form onSubmit={handleSubmit} noValidate>
          <div className="input-group1">
            <span className="icon-left1">
              <img src="./Form_img/EnvelopeSimple.png" alt="email icon" />
            </span>
            <input
              type="text"
              name="email"
              placeholder="Email or phone number"
              value={formData.email}
              onChange={handleChange}
            />
            {errors.email && <p className="error1">{errors.email}</p>}
          </div>

          <div className="input-group1">
            <span className="icon-left1">
              <img src="./Form_img/LockKey.png" alt="lock icon" />
            </span>
            <input
              type={showPassword ? 'text' : 'password'}
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
            />
            <span className="icon-right1" onClick={() => setShowPassword(!showPassword)}>
              <img
                src={showPassword ? "./Form_img/EyeSlash.png" : "./Form_img/eye.png"}
                alt="toggle visibility"
              />
            </span>
            {errors.password && <p className="error1">{errors.password}</p>}
          </div>

          <button type="submit" className="signup-btn1">Sign In</button>

          <p className="terms1">
            Forgot your password? <a href="#">Reset password</a>
          </p>

          <div className="divider1"><span>or</span></div>

          <button type="button" className="google-btn1">
            <img src="./Form_img/Google.png" alt="Google Logo" />
            Continue with Google
          </button>

          <button type="button" className="signin-btn1" onClick={handleRegistration}>
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
}

// export function Entrance({ onSuccess, onSwitchToSignUp }) {
//   const navigate = useNavigate(); 
//   const {backUrl, request, setToken, user} = useContext(AppContext);

//   const [formData, setFormData] = useState({
//     email: '',
//     password: ''
//   });

//   const [errors, setErrors] = useState({});
//   const [showPassword, setShowPassword] = useState(false);


//   const aunthenticate = (e) =>
//   {
//     e.preventDefault();
//     const formData = new FormData(e.target);
//     const login = formData.get("user-login");
//     const password = formData.get("user-password");

//     const userPass = `${login}:${password}`;
//     const credentials = Base64.encode(userPass);
//     request('/api/user/jwt', {
//         method: 'GET',
//         headers: {
//             'Authorization': `Basic ${credentials}`
//         }
//     }).then(jwt=> {
//         closeModalRef.current.click();
//         console.log(jwt);
//         setToken(jwt);}).catch(console.error);
//   };



//   const validate = () => {
//     const newErrors = {};

//     if (!formData.email.trim()) {
//       newErrors.email = 'Email or phone is required';
//     } else if (!/\S+@\S+\.\S+/.test(formData.email) && !/^\+?\d{10,}$/.test(formData.email)) {
//       newErrors.email = 'Enter valid email or phone number';
//     }

//     if (!formData.password) {
//       newErrors.password = 'Password is required';
//     }

//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const handleRegistration = () => {
//     navigate('/registration');
//   };

//   const handleChange = e => {
//     const { name, value } = e.target;
//     setFormData(prev => ({ ...prev, [name]: value }));
//   };

//   const handleSubmit = e => {
//   e.preventDefault();
//   if (!validate()) return;

//   fetch(backUrl + "/api/user/entrance", {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json"
//     },
//     body: JSON.stringify(formData)
//   })
//   .then(response => {
//     if (!response.ok) {
//       return response.text().then(text => {
//         throw new Error(text);
//       });
//     }
//     return response.json();
//   })
//   .then(data => {
//     console.log("Status:", data.Status);
//     navigate('/Home');
//   })
//   .catch(err => {
//     console.error(err);
//     alert(err.message);
//   });
// };

//   return (
//     <div className="logo-container1">
//       <img src="./Form_img/Logo.png" alt="Logo" className="form-logo1" />
//     <div className="form-container2">
//       <h2 className="welcome-text1">
//         Welcome back<br />
//         <span className="community-text1">sign in your LinkUp account</span>
//       </h2>

//       <form onSubmit={handleSubmit} noValidate>
//         <div className="input-group1">
//           <span className="icon-left1">
//             <img src="./Form_img/EnvelopeSimple.png" alt="email icon" />
//           </span>
//           <input
//             type="text"
//             name="email"
//             placeholder="Email or phone number"
//             value={formData.email}
//             onChange={handleChange}
//           />
//           {errors.email && <p className="error1">{errors.email}</p>}
//         </div>

//         <div className="input-group1">
//           <span className="icon-left1">
//             <img src="./Form_img/LockKey.png" alt="lock icon" />
//           </span>
//           <input
//             type={showPassword ? 'text' : 'password'}
//             name="password"
//             placeholder="Password"
//             value={formData.password}
//             onChange={handleChange}
//           />
//           <span className="icon-right1" onClick={() => setShowPassword(!showPassword)}>
//             <img
//               src={showPassword ? "./Form_img/EyeSlash.png" : "./Form_img/eye.png"}
//               alt="toggle visibility"
//             />
//           </span>
//           {errors.password && <p className="error1">{errors.password}</p>}
//         </div>

//         <button type="submit" className="signup-btn1">Sign In</button>

//         <p className="terms1">
//           Forgot your password? <a href="#">Reset password</a>
//         </p>

//         <div className="divider1"><span>or</span></div>

//         <button type="button" className="google-btn1">
//           <img src="./Form_img/Google.png" alt="Google Logo" />
//           Continue with Google
//         </button>

//         <button type="button" className="signin-btn1" onClick={handleRegistration}>
//             Sign Up
//         </button>


//       </form>
//     </div>
//     </div>
//   );
// }
