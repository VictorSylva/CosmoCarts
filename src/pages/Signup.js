import React, { useState } from "react";
import { auth } from "../firebase/firebaseConfig";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { logEvent } from "firebase/analytics";
import { analytics } from "../firebase/firebaseConfig";

const Signup = () => {
  const [formData, setFormData] = useState({
    email: "",
    phone: "",
    password: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, formData.email, formData.password);
      const user = userCredential.user;

      // Log signup event in Firebase Analytics
      if (analytics) {
        logEvent(analytics, "sign_up", {
          user_id: user.uid,
          email: user.email,
        });
      }

      toast.success("Signup successful! Redirecting to login...", { autoClose: 3000 });
      setTimeout(() => navigate("/login"), 3000);
    } catch (err) {
      setError(err.message);
      toast.error(err.message);
    }
  };

  return (
    <div style={{ maxWidth: "400px", margin: "50px auto", textAlign: "center" }}>
      <h2>Signup</h2>
      <ToastContainer />
      <form onSubmit={handleSignup}>
        <div>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
            style={{ padding: "10px", margin: "10px", width: "90%" }}
          />
        </div>
        <div>
          <input
            type="tel"
            name="phone"
            placeholder="Phone Number"
            value={formData.phone}
            onChange={handleChange}
            required
            style={{ padding: "10px", margin: "10px", width: "90%" }}
          />
        </div>
        <div>
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
            style={{ padding: "10px", margin: "10px", width: "90%" }}
          />
        </div>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <button
          type="submit"
          style={{
            padding: "10px 20px",
            backgroundColor: "#28a745",
            color: "white",
            border: "none",
            cursor: "pointer",
          }}
        >
          Signup
        </button>
      </form>
      <p>Already have an account? <a href="/login">Login</a></p>
    </div>
  );
};

export default Signup;



// import React, { useState } from "react";
// import { auth } from "../firebase/firebaseConfig";
// import { createUserWithEmailAndPassword } from "firebase/auth";
// import { useNavigate } from "react-router-dom";
// import { toast, ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// const Signup = () => {
//   const [formData, setFormData] = useState({
//     email: "",
//     phone: "",
//     password: "",
//   });
//   const [error, setError] = useState("");
//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSignup = async (e) => {
//     e.preventDefault();
//     setError("");
//     try {
//       await createUserWithEmailAndPassword(auth, formData.email, formData.password);
//       toast.success("Signup successful! Redirecting to login...", { autoClose: 3000 });
//       setTimeout(() => navigate("/login"), 3000);
//     } catch (err) {
//       setError(err.message);
//       toast.error(err.message);
//     }
//   };

//   return (
//     <div style={{ maxWidth: "400px", margin: "50px auto", textAlign: "center" }}>
//       <h2>Signup</h2>
//       <ToastContainer />
//       <form onSubmit={handleSignup}>
//         <div>
//           <input
//             type="email"
//             name="email"
//             placeholder="Email"
//             value={formData.email}
//             onChange={handleChange}
//             required
//             style={{ padding: "10px", margin: "10px", width: "90%" }}
//           />
//         </div>
//         <div>
//           <input
//             type="tel"
//             name="phone"
//             placeholder="Phone Number"
//             value={formData.phone}
//             onChange={handleChange}
//             required
//             style={{ padding: "10px", margin: "10px", width: "90%" }}
//           />
//         </div>
//         <div>
//           <input
//             type="password"
//             name="password"
//             placeholder="Password"
//             value={formData.password}
//             onChange={handleChange}
//             required
//             style={{ padding: "10px", margin: "10px", width: "90%" }}
//           />
//         </div>
//         {error && <p style={{ color: "red" }}>{error}</p>}
//         <button
//           type="submit"
//           style={{
//             padding: "10px 20px",
//             backgroundColor: "#28a745",
//             color: "white",
//             border: "none",
//             cursor: "pointer",
//           }}
//         >
//           Signup
//         </button>
//       </form>
//       <p>Already have an account? <a href="/login">Login</a></p>
//     </div>
//   );
// };

// export default Signup;
