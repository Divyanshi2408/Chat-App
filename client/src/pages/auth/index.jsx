import React,{useState} from 'react'
import victory from "@/assets/victory.svg"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// import {background} from "../../assets/login2.png"

const Auth = () => {

const[email,setEmail]= useState("")
const[password,setPassword]= useState("")
const[confirmPassword,setConfirmPassword]= useState("")

  return (
    <>
    <div className='h-[100vh] w-[100vw] flex items-center justify-center'>
    <div className='h-[80vh] bg-white border-2 border-white text-opacity-90 shadow-2xl w-[88vw] md:w-[90vw] lg:w-[70vw] xl:w-[60w] rounded-3xl grid xl:grid-cols-2'>
        <div className='flex flex-col gap-18 items-center justify-center'>
            <div className='flex items-center justify-center flex-col'>
              <div className='flex items-center justify-center'>
                <h1 className='text-5xl font-bold md:text-6xl'>Welocome</h1>
                <img src={victory} alt="victory" className='h-[100px]' />
            </div>
            <p className='font-medium text-center'>
                Fill in the details to get started with the best chat app
            </p>
            </div>
            <div className='flex items-center justify-centerw-full'>
              <Tabs className="w-3/4">
                <TabsList className="bg-transparentn rounded-none w-full">
                  <TabsTrigger value="login" className="data-[state=active]:bg-transparent text-black text-capicty-90 border-b-2 rounded-none w-full data-[state=active]:text-black data-[state=active]:font-semibold data-[state=active]:border-b-purple-500 p-3 transition-all duration-300">
                  Login</TabsTrigger>
                  <TabsTrigger value="signUp" className="data-[state=active]:bg-transparent text-black text-capicty-90 border-b-2 rounded-none w-full data-[state=active]:text-black data-[state=active]:font-semibold data-[state=active]:border-b-purple-500 p-3 transition-all duration-300">
                  SignUp</TabsTrigger>
                </TabsList>
                <TabsContent className="" value="login"></TabsContent>
                <TabsContent className="" value="signup"></TabsContent>
              </Tabs>
            </div>
        </div>
    </div>
   </div>
    </>
  )
}

export default Auth