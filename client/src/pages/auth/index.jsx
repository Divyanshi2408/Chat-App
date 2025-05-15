import React, { useState } from 'react';
import victory from "@/assets/victory.svg";
import c3 from "@/assets/c3.png";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from '@/components/ui/button';

const Auth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    if (!email || !password) {
      alert("Please fill in all fields");
      return;
    }
    console.log("Login", { email, password });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password || !confirmPassword) {
      alert("Please fill in all fields");
      return;
    }
    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    console.log("Sign up", { email, password });
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
              <Button className="rounded-full p-4" onClick={handleSubmit}>SignUp</Button>
            </TabsContent>
          </Tabs>
        </div>

        {/* Right Panel (Optional: illustration, branding, etc.) */}
        <div className="hidden xl:flex bg-purple-300 items-center justify-center p-10">
          <img src={c3} alt="victory-illustration" className="h-100 rounded-2xl" />
        </div>
      </div>
    </div>
  );
};

export default Auth;
