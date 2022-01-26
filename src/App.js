import { collection, onSnapshot } from "firebase/firestore";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import Auth from "./Auth";
import Body from "./Body";
import { db } from "./firebase-confige";
import { actions } from "./redux/user-slice";
import "./styles/app.css";
function App() {
  const isLogin = useSelector((state) => state.userSlice.isLogin);
  const token = !!localStorage.getItem("whatsapp-clone");
  const dispatch = useDispatch();
  if (token) {
    dispatch(
      actions.setMyUser({
        uid: localStorage.getItem("whatsapp-clon-info-uid"),
        email: localStorage.getItem("whatsapp-clon-info-email"),
        user_name: localStorage.getItem("whatsapp-clon-info-user_name"),
        bio: localStorage.getItem("whatsapp-clon-info-bio"),
        profile_url: localStorage.getItem("whatsapp-clon-info-profile_url"),
      })
    );
    dispatch(actions.setIsLogin(true));
  }
  useEffect(() => {
    onSnapshot(collection(db, "users"), (snap) => {
      const users = snap.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
      dispatch(actions.setUsers(users));
    });
  }, []);
  return (
    <div className="app">
      <div className={`app__body ${!isLogin && "notlogin"}`}>
        {isLogin ? <Body /> : <Auth />}
      </div>
    </div>
  );
}

export default App;