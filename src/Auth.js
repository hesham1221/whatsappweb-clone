import { IconButton } from "@material-ui/core";
import { FcGoogle } from "react-icons/fc";
import React, { useState } from "react";
import { auth, db, gProvider, storage } from "./firebase-confige";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import Logo from "./assest/whatsapp.svg";
import "./styles/auth.css";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { ArrowForward } from "@material-ui/icons";
import { addDoc, collection, getDocs } from "firebase/firestore";
import { useDispatch } from "react-redux";
import { actions } from "./redux/user-slice";
import { useSelector } from "react-redux";
const Auth = () => {
  const [emailErr, setEmailErr] = useState(false);
  const [passwordErr, setPasswordErr] = useState(false);
  const [userExists, setExists] = useState(false);
  const [login, setLogin] = useState(true);
  const usernames = useSelector((state) => state.userSlice.users);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const [continueR, setContinueR] = useState(false);
  const [pic, setpic] = useState(
    "https://i.pinimg.com/550x/35/69/63/35696358f6e7dbe311d005d2f773d707.jpg"
  );
  const [userName, setUserName] = useState("");
  const [myUser, setMyUser] = useState({
    email: "",
    user_name: "",
    bio: "Hey From Whats app Clone",
    profile_url:
      "https://i.pinimg.com/550x/35/69/63/35696358f6e7dbe311d005d2f773d707.jpg",
    uid: "",
  });
  const googleSign = async () => {
    const collRef = collection(db, "users");
    const usersdocs = await getDocs(collRef);
    const usersInfo = usersdocs.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));
    try {
      const userdocs = await signInWithPopup(auth, gProvider);
      const userInfo = userdocs.user;
      const ifExist = usersInfo.filter((user) => user.email === userInfo.email);
      if (ifExist.length === 0) {
        const myus = {
          ...myUser,
          uid: userInfo.uid,
          email: userInfo.email,
          user_name: userInfo.displayName,
          profile_url: userInfo.photoURL,
        };
        dispatch(actions.setMyUser(myus));
        const collec = collection(db, "users");
        addDoc(collec, myus);
        localStorage.setItem("whatsapp-clone", userInfo.accessToken);
        localStorage.setItem("whatsapp-clon-info-uid", myus.uid);
        localStorage.setItem("whatsapp-clon-info-email", myus.email);
        localStorage.setItem("whatsapp-clon-info-user_name", myus.user_name);
        localStorage.setItem("whatsapp-clon-info-bio", myus.bio);
        localStorage.setItem(
          "whatsapp-clon-info-profile_url",
          myus.profile_url
        );
      } else {
        const user =
          usersInfo[
            usersInfo.findIndex((user) => user.email === ifExist[0].email)
          ];
        dispatch(actions.setMyUser(user));
        localStorage.setItem("whatsapp-clone", userInfo.accessToken);
        localStorage.setItem("whatsapp-clon-info-uid", user.uid);
        localStorage.setItem("whatsapp-clon-info-email", user.email);
        localStorage.setItem("whatsapp-clon-info-user_name", user.user_name);
        localStorage.setItem("whatsapp-clon-info-bio", user.bio);
        localStorage.setItem(
          "whatsapp-clon-info-profile_url",
          user.profile_url
        );
      }
      dispatch(actions.setIsLogin(true));
    } catch (err) {
      return;
    }
  };

  const finishHandler = async () => {
    const collec = collection(db, "users");
    addDoc(collec, myUser);
    dispatch(actions.setMyUser(myUser));
    localStorage.setItem("whatsapp-clon-info-uid", myUser.uid);
    localStorage.setItem("whatsapp-clon-info-email", myUser.email);
    localStorage.setItem("whatsapp-clon-info-user_name", myUser.user_name);
    localStorage.setItem("whatsapp-clon-info-bio", myUser.bio);
    localStorage.setItem("whatsapp-clon-info-profile_url", myUser.profile_url);
    dispatch(actions.setIsLogin(true));
  };
  const submitHandler = async (e) => {
    e.preventDefault();
    setEmailErr(false);
    setPasswordErr(false);
    setExists(false);
    if (login) {
      try {
        const user = await signInWithEmailAndPassword(
          auth,
          loginData.email,
          loginData.password
        );
        localStorage.setItem("whatsapp-clone", user.user.accessToken);
        const collRef = collection(db, "users");
        const usersdocs = await getDocs(collRef);
        const usersInfo = usersdocs.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        const userInfo = usersInfo.filter((use) => use.uid === user.user.uid);
        dispatch(
          actions.setMyUser({
            uid: userInfo[0].uid,
            email: userInfo[0].email,
            user_name: userInfo[0].user_name,
            bio: userInfo[0].bio,
            profile_url: userInfo[0].profile_url,
          })
        );
        localStorage.setItem("whatsapp-clon-info-uid", userInfo[0].uid);
        localStorage.setItem("whatsapp-clon-info-email", userInfo[0].email);
        localStorage.setItem(
          "whatsapp-clon-info-user_name",
          userInfo[0].user_name
        );
        localStorage.setItem("whatsapp-clon-info-bio", userInfo[0].bio);
        localStorage.setItem(
          "whatsapp-clon-info-profile_url",
          userInfo[0].profile_url
        );
        dispatch(actions.setIsLogin(true));
      } catch (err) {
        if (err.message === "Firebase: Error (auth/user-not-found).") {
          setEmailErr(true);
        } else if (err.message === "Firebase: Error (auth/wrong-password).") {
          setPasswordErr(true);
        } else {
          return;
        }
      }
    } else {
      const exists = usernames.filter((user) => user.user_name === userName);
      if (exists.lenght === 0) {
        setExists(true);
        return;
      }
      try {
        const user = await createUserWithEmailAndPassword(
          auth,
          loginData.email,
          loginData.password
        );
        localStorage.setItem("whatsapp-clone", user.user.accessToken);
        setMyUser((prev) => ({
          ...prev,
          user_name: userName,
          uid: user.user.uid,
          email: user.user.email,
        }));
        setContinueR(true);
      } catch (err) {
        if (err.message === "Firebase: Error (auth/email-already-in-use).") {
          setEmailErr(true);
        } else {
          return;
        }
      }
    }
  };
  const uploadHandler = async (e) => {
    if (!!e.target.files[0]) {
      const file = e.target.files[0];
      const fileRef = ref(storage, `/profile_pics/${myUser.uid}/${file.name}`);
      setLoading(true);
      const up = await uploadBytes(fileRef, file);
      const url = await getDownloadURL(fileRef);
      setLoading(false);
      setpic(url);
      setMyUser((prev) => ({ ...prev, profile_url: url }));
    }
  };
  return (
    <div className="auth">
      <div className="auth__body">
        <img src={Logo} alt="whatsapp" className="auth__logo" />
        {!continueR ? (
          <form onSubmit={submitHandler} className="auth__form">
            {!login && (
              <>
                <h3 className="auth_text">User Name :</h3>
                <input
                  type="text"
                  onChange={(e) => setUserName(e.target.value)}
                  className={`auth__input ${userExists && "exists"}`}
                  required
                />
                {userExists && (
                  <h4 className="existsh4">enter another user name</h4>
                )}
              </>
            )}
            <h3 className="auth__text">Email :</h3>
            <input
              required
              type="email"
              onChange={(e) =>
                setLoginData((prev) => ({ ...prev, email: e.target.value }))
              }
              className={`auth__input ${emailErr && "exists"}`}
            />
            {emailErr && <h4 className="existsh4">Email error</h4>}
            <h3 className="auth__text">Password :</h3>
            <input
              required
              type="password"
              onChange={(e) =>
                setLoginData((prev) => ({ ...prev, password: e.target.value }))
              }
              className={`auth__input ${passwordErr && "exists"}`}
            />
            {passwordErr && <h4 className="existsh4">Password error</h4>}
            <button className="auth__submit" type="submit">
              {login ? "Login" : "Sign up"}
            </button>
            <div className="controls">
              <input
                required
                type="button"
                onClick={() => setLogin((prev) => !prev)}
                className="create"
                value={login ? "Create Account" : "login"}
              />
              <IconButton onClick={googleSign}>
                <FcGoogle />
              </IconButton>
            </div>
          </form>
        ) : (
          <form onSubmit={(e) => e.preventDefault()} className="auth__form">
            <input
              required
              disabled={loading}
              id="file"
              type="file"
              onChange={uploadHandler}
              style={{ display: "none" }}
            />
            <label
              className={`image__label ${loading && "loading"}`}
              htmlFor="file"
            >
              <img className="userImage" src={pic} alt="user" />
              {loading && "Loading....."}
            </label>
            <h3 className="auth__text">bio :</h3>
            <div className="next-section">
              <input
                type="text"
                className="auth__input"
                placeholder="deafult : Hey From Whats app Clone"
                onChange={(e) =>
                  setMyUser((prev) => ({ ...prev, bio: e.target.value }))
                }
              />
              <IconButton
                onClick={finishHandler}
                className="gobtn"
                style={{
                  backgroundColor: "#6EBF63",
                  borderRadius: "0",
                  width: "2rem",
                  height: "2rem",
                  marginLeft: "1.5rem",
                }}
              >
                <ArrowForward />
              </IconButton>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default Auth;
