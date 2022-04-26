import { async } from "@firebase/util";
import axios from "axios";
import { useEffect } from "react";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  sendEmailVerification,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../Firebase";
import { createContext, useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Fetching = createContext();
const addtoCart = JSON.parse(localStorage.getItem("adding") || "0");
const itemsInCart = JSON.parse(localStorage.getItem("items") || "[]");
function Productfetching({ children }) {
  const history = useHistory();
  const [productslist, setProductslist] = useState(null);
  const [verify, setVerify] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [adding, setadding] = useState(0);
  const [items, setitems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);

  const [user, setUser] = useState(null);
  // useEffect(() => {
  //   localStorage.setItem("adding", JSON.stringify(adding));
  // }, [adding]);
  // useEffect(() => {
  //   localStorage.setItem("items", JSON.stringify(items));
  // }, [items]);

  useEffect(() => {
    const fetchData = async () => {
      await axios.get("https://fakestoreapi.com/products").then((res) => {
        const { data } = res;
        setProductslist(data);
      });
    };
    fetchData().catch((err) => {
      console.log(err);
    });
  }, []);

  const handelRequest = () => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((res) => {
        toast.success("Logged in successfully", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });

        sendEmailVerification(auth.currentUser)
          .then(() => {
            setVerify(true);
          })
          .catch((err) => {
            toast.error("something went wrong with email verfication", {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
          });
        history.push("/");
      })
      .catch((err) => {
        toast.error("something went wrong", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      });
    // if (email === "" || password === "") {
    //   setError(true);
    // } else {
    //   setError(false);
    //   setEmail("");
    //   setPassword("");
    //   history.push("/");
    // }
  };
  function logIn(email, password) {
    return signInWithEmailAndPassword(auth, email, password);
  }

  async function logOut() {
    try {
      await auth.signOut();
      toast.success("Successfully sign out", {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } catch (err) {
      console.log(err);
    }
  }
  const total = () => {
    return items.reduce((acc, item) => acc + item.price, 0);
  };
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => {
      unsubscribe();
    };
  }, []);
  return (
    <>
      <Fetching.Provider
        value={{
          productslist,
          loading,
          adding,
          setadding,
          setitems,
          items,
          email,
          password,
          setEmail,
          setPassword,
          handelRequest,
          logIn,
          logOut,
          setError,
          error,
          user,
          searchTerm,
          setSearchTerm,
          total,
          setVerify,
          verify,
        }}
      >
        {children}
      </Fetching.Provider>
    </>
  );
}
export function UseFetching() {
  return useContext(Fetching);
}
export default Productfetching;
