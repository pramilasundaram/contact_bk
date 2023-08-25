import React,{createContext,useState} from 'react'

export const  addData =createContext();
export const  updateData =createContext();

export default function ContextProvider({children}) {
    const [useradd,setUseradd]=useState("");
    const [updateadd,setUpdateadd]=useState("");
  return (
    <addData.Provider value={{useradd,setUseradd}}>
    <updateData.Provider value={{updateadd,setUpdateadd}}>
      {children}
    </updateData.Provider>
    </addData.Provider>
  )
}

