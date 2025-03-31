"use client";
import { useAuth, useUser } from "@clerk/nextjs";
import axios from "axios";
import { createContext, useContext, useState } from "react";
import toast, { Toaster } from "react-hot-toast";

export const AppContext = createContext();

export const useAppContext = () => {
  return useContext(AppContext);
};

export const AppContextProvider = ({ children }) => {
  const { user } = useUser();
  const { getToken } = useAuth();

  const [chats, setChats] = useState([]);
  const [selectedChat, setSelectedChat] = useState(null);

  const createNewChat = async () => {
    try {
      if (!user) return null;

      const token = await getToken();
      await axios.post(
        "/api/chat/create",
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    } catch (error) {
      toast.error(error.message);
    }
  };

  const fetchUsersChats = async () => {
    try {
      const token = await getToken();
      const { data } = await axios.get("/api/chat/get", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if(data.success){
        console.log(data.data);
        setChats(data.data);

        // if the user has no chats, create one
        if(data.data.length == 0){
            await createNewChat();
            return fetchUsersChats();
        }else{
            // sort the chats by updated data
            data.data.sort((a,b)=>new Date(b.updatedAt) - new Date(a.updatedAt))
        }
      }else{
        toast.error(data.message)
      }
    } catch (error) {
        toast.error(error.message)
    }
  };

  const value = {
    user,
  };
  return (
    <AppContext.Provider value={value}>
      <Toaster
        toastOptions={{
          success: { style: { background: "black", color: "white" } },
          error: { style: { background: "black", color: "white" } },
        }}
      />
      {children}
    </AppContext.Provider>
  );
};
