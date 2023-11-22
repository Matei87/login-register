import { createContext, useState, useEffect } from 'react';

export const UserContext = createContext({});

export const UserContextProvider = (props) => {
  const [user, setUser] = useState(null);

  const fetchUser = async () => {
    try {
      const req = await fetch('/api/profile');
      const res = await req.json();
      setUser(res);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    //fetchUser();
    setUser();
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {props.children}
    </UserContext.Provider>
  );
};
