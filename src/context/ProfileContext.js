import React, { createContext, useContext, useState } from "react";
import { getProfileApi } from "../api/profileApi";

const ProfileContext = createContext();

export const ProfileProvider = ({ children }) => {

  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchProfile = async () => {
    console.log("___api calld");
    
    try {

      setLoading(true);

      const res = await getProfileApi();

      console.log(res, "__)))_____________________");
      if (res?.data?.status === "success") {
        
        setProfile(res.data?.data);
      }

    } catch (error) {
      console.log("Profile Error", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ProfileContext.Provider
      value={{
        profile,
        loading,
        fetchProfile,
      }}
    >
      {children}
    </ProfileContext.Provider>
  );
};

export const useProfile = () => useContext(ProfileContext);