import React, { useState } from 'react';
import victory from "@/assets/victory.svg";
import c3 from "@/assets/c3.png";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { apiClient } from '@/lib/api-client';
import { SIGNUP_ROUTE,LOGIN_ROUTE } from '@/utils/constants';
import { useNavigate } from 'react-router-dom';
import { useAppStore } from '@/store';

const Auth = () => {
  const navigate = useNavigate();
  const {setUserInfo} = useAppStore();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

    const validateLogin = () => {
    if(!email.length){
      toast.error("Email is required");
      return false;
    }
    if(!password.length){
      toast.error("Password is required");
      return false;
    }
    return true;
  };

  const validateSignup = () => {
    if(!email.length){
      toast.error("Email is required");
      return false;
    }
    if(!password.length){
      toast.error("Password is required");
      return false;
    }
    if(!confirmPassword.length){
      toast.error("Confirm Password is required");
      return false;
    } 
    return true;
  };

 const handleLogin = async (e) => {
  e.preventDefault();

  if (validateLogin()) {
    try {
      const response = await apiClient.post(LOGIN_ROUTE, { email, password }, { withCredentials: true });

      console.log(response);

      if (response.data.user.id) {
        setUserInfo(response.data.user);
        if (response.data.user.profileSetup) {
          navigate("/chats");
        } else {
          navigate("/profile");
        }
      }
    } catch (error) {
      console.error(error);
      toast.error("Login failed");
    }
  }
};

const handleSignup = async () => {
  if (validateSignup()) {
    try {
      const response = await apiClient.post(SIGNUP_ROUTE, { email, password }, { withCredentials: true });
      console.log(response);

      if (response.status === 201) {
        toast.success("User created successfully");
        setUserInfo(response.data.user);
        navigate("/profile");
      }
    } catch (error) {
      console.error(error);
      toast.error("Signup failed");
    }
  }
};


  return (
    <div className='min-h-screen w-full flex items-center justify-center bg-gray-100 p-4'>
      <div className='w-full max-w-6xl bg-white shadow-2xl rounded-3xl grid grid-cols-1 xl:grid-cols-2 overflow-hidden'>
        {/* Left Panel */}
        <div className='flex flex-col gap-8 items-center justify-center p-10'>
          <div className='text-center'>
            <div className='flex items-center justify-center gap-2'>
              <h1 className='text-4xl md:text-5xl font-bold'>Welcome</h1>
              <img src={victory} alt="victory" className='h-[80px] md:h-[100px]' />
            </div>
            <p className='mt-4 font-medium'>
              Fill in the details to get started with the best chat app
            </p>
          </div>

          <Tabs defaultValue="login" className="w-full max-w-md">
            <TabsList className="bg-transparent flex w-full border-b">
              <TabsTrigger
                value="login"
                className="flex-1 p-3 border-b-2 data-[state=active]:border-purple-500 data-[state=active]:font-semibold transition-all"
              >
                Login
              </TabsTrigger>
              <TabsTrigger
                value="signup"
                className="flex-1 p-3 border-b-2 data-[state=active]:border-purple-500 data-[state=active]:font-semibold transition-all"
              >
                SignUp
              </TabsTrigger>
            </TabsList>

            <TabsContent value="login" className="flex flex-col gap-4 mt-6">
              <input
                type="email"
                placeholder='Email'
                className='rounded-full p-4 border'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                type="password"
                placeholder='Password'
                className='rounded-full p-4 border'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <Button className="rounded-full p-4" onClick={handleLogin}>Login</Button>
            </TabsContent>

            <TabsContent value="signup" className="flex flex-col gap-4 mt-6">
              <input
                type="email"
                placeholder='Email'
                className='rounded-full p-4 border'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                type="password"
                placeholder='Password'
                className='rounded-full p-4 border'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <input
                type="password"
                placeholder='Confirm Password'
                className='rounded-full p-4 border'
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              <Button className="rounded-full p-4" onClick={handleSignup}>SignUp</Button>
            </TabsContent>
          </Tabs>
        </div>

        <div className="hidden xl:flex bg-purple-300 items-center justify-center p-10">
          <img src={c3} alt="victory-illustration" className="h-100 rounded-2xl" />
        </div>
      </div>
    </div>
  );
};

export default Auth;
