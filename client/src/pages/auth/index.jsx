import React,{useState} from 'react'
import victory from "@/assets/victory.svg"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from '@/components/ui/button'

// import {background} from "../../assets/login2.png"

const Auth = () => {

const[email,setEmail]= useState("")
const[password,setPassword]= useState("")
const[confirmPassword,setConfirmPassword]= useState("")

const handleLogin = (e) => {
  e.preventDefault()
  if(!email || !password){
    alert("Please fill in all fields")
    return
  }
  // Login logic
  console.log("Login", { email, password })
}

const handleSubmit = (e) => {
  e.preventDefault()
  if(!email || !password || (confirmPassword && password !== confirmPassword)){
    alert("Please fill in all fields correctly")
    return
  }

  if(confirmPassword){
    // Sign up logic
    console.log("Sign up", { email, password })
  }
  else{
    // Login logic
    console.log("Login", { email, password })
  }

}



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
            <div className='flex items-center justify-center w-full'>
              <Tabs className="w-3/4">
                <TabsList className="bg-transparentn rounded-none w-full">
                  <TabsTrigger value="login" className="data-[state=active]:bg-transparent text-black text-capicty-90 border-b-2 rounded-none w-full data-[state=active]:text-black data-[state=active]:font-semibold data-[state=active]:border-b-purple-500 p-3 transition-all duration-300">
                  Login</TabsTrigger>
                  <TabsTrigger value="signup" className="data-[state=active]:bg-transparent text-black text-capicty-90 border-b-2 rounded-none w-full data-[state=active]:text-black data-[state=active]:font-semibold data-[state=active]:border-b-purple-500 p-3 transition-all duration-300">
                  SignUp</TabsTrigger>
                </TabsList>
                <TabsContent className="flex flex-col gap-5 "
                 value="login">
                  <input
                   type="email"
                   placeholder='Email' 
                   className='rounded-full p-6'
                    value={email}
                     onChange={(e)=>setEmail(e.target.value)} />
                  <input type="password" 
                  placeholder='Password' 
                  className='rounded-full p-6'
                  value={password} 
                  onChange={(e)=>setPassword(e.target.value)} />
                  
                 <Button className="rounded-full p-6" onClick={handleLogin}>Login</Button>
                </TabsContent>
                <TabsContent className="flex flex-col gap-5" value="signup">
                   <input
                   type="email"
                   placeholder='Email' 
                   className='rounded-full p-6'
                    value={email}
                     onChange={(e)=>setEmail(e.target.value)} />
                  <input type="password" 
                  placeholder='Password' 
                  className='rounded-full p-6'
                  value={password} 
                  onChange={(e)=>setPassword(e.target.value)} />
                  <input type="password"
                    placeholder='Confirm Password' 
                    className='rounded-full p-6'
                    value={confirmPassword} 
                    onChange={(e)=>setConfirmPassword(e.target.value)} />
                    <Button className="rounded-full p-6" onClick={handleLogin}>SignUp</Button>
                </TabsContent>
              </Tabs>
            </div>
        </div>
    </div>
   </div>
    </>
  )
}

export default Auth