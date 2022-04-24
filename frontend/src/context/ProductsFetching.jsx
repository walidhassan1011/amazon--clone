import { async } from "@firebase/util";
import axios from "axios";
import { useEffect } from "react";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../Firebase";
import { createContext, useContext, useState } from "react";
import { useHistory } from "react-router-dom";

const Fetching = createContext();
const addtoCart = JSON.parse(localStorage.getItem("adding") || "0");
const itemsInCart = JSON.parse(localStorage.getItem("items") || "[]");
function Productfetching({ children }) {
  const history = useHistory();
  const [productslist, setProductslist] = useState(null);
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
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
        setError(true);
      });
    if (email === "" || password === "") {
      setError(true);
      console.log(error);
    } else {
      setError(false);
      setEmail("");
      setPassword("");
      history.push("/");
    }
  };
  function logIn(email, password) {
    return signInWithEmailAndPassword(auth, email, password);
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
          setError,
          error,
          user,

          total,
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
