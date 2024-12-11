// lib/firebase.js
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyCaJXwzCGoqpJKgSv4TDxh0-CauoWj13Yc",
  authDomain: "weatherstation-474f2.firebaseapp.com",
  databaseURL: "https://weatherstation-474f2-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "weatherstation-474f2",
  storageBucket: "weatherstation-474f2.firebasestorage.app",
  messagingSenderId: "315579475162",
  appId: "1:315579475162:web:73d7181416428c9c96f1e3",
  measurementId: "G-SQ61MJC5PG"
};

// Initialize Firebase app
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and export it
const auth = getAuth(app);

export { app, auth };


// React component that will handle the logic
export default function SignUp() {
  useEffect(() => {
    // Client-side DOM manipulation should go here, inside the `useEffect`.
    const submitButton = document.getElementById("submit");
    const signupButton = document.getElementById("sign-up");
    const createacctbtn = document.getElementById("create-acct-btn");

    // Event listener for form submission (client-side)
    submitButton?.addEventListener("click", (e) => {
      e.preventDefault();
      const email = document.getElementById("email").value;
      const password = document.getElementById("password").value;

      // Handle the login functionality
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // User has been created, now you can perform any post-signup action
          const user = userCredential.user;
          console.log("User created: ", user);
          // Optionally, navigate to another page or show a success message
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.error(errorCode, errorMessage);
        });
    });

    // Handle "Create Account" navigation
    signupButton?.addEventListener("click", () => {
      // Show "Create Account" form
      document.getElementById("main")?.classList.add("hidden");
      document.getElementById("create-acct")?.classList.remove("hidden");
    });

    // Cleanup when the component unmounts
    return () => {
      submitButton?.removeEventListener("click", () => {});
      signupButton?.removeEventListener("click", () => {});
    };
  }, []); // Empty dependency array means this effect runs once when the component mounts

  return (
    <div>
      {/* Your component JSX here */}
      <div id="main">
        <h1>Sign In</h1>
        <input id="email" type="email" placeholder="Email" />
        <input id="password" type="password" placeholder="Password" />
        <button id="submit">Submit</button>
        <p>or</p>
        <button id="sign-up">Sign Up</button>
      </div>
      
      <div id="create-acct" className="hidden">
        <h1>Create an Account</h1>
        <input id="email-signup" type="email" placeholder="Email" />
        <input id="confirm-email-signup" type="email" placeholder="Confirm Email" />
        <input id="password-signup" type="password" placeholder="Password" />
        <input id="confirm-password-signup" type="password" placeholder="Confirm Password" />
        <button id="create-acct-btn">Create Account</button>
      </div>
    </div>
  );
}
