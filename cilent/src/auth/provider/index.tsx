import axios from 'axios';
import { createContext, useEffect, useRef, useState } from 'react';

interface CountContextProps {
  user: boolean;
  setUser: (user: boolean) => void;
  username: string;
  id:number|undefined;
}

type PropType = {
  children: JSX.Element;
};

export const CountContext = createContext({} as CountContextProps);
const UserProvider = ({ children }: PropType) => {
  const [user, setUser] = useState<boolean>(false);
  const [username, setUsername] = useState<string>("");
  const [id, setId] = useState<number>();
  const value = { user, setUser,id ,username};
  const { current: myArray } = useRef(["one", "two", "three"]);
  
  useEffect(() => {
    const token = localStorage.getItem('Token');
    if (token) {
       axios.get(`http://localhost:4000/auth/user`,{
        headers: {
          Authorization: `Bearer ${JSON.parse(token)}`,
        }})
        .then((res) => {
          setId(res.data.sub.id)
          setUsername(res.data.sub.user)
          
      })
    } else {
      setUser(false);
    
    }
  }, [user, myArray]);

  return (
   
    <CountContext.Provider value={value}>{children}</CountContext.Provider>
  );
};

export default UserProvider;
