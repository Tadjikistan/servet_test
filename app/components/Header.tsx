"use client"
import Image from 'next/image'
import React, { FC, useEffect, useState } from 'react'
import coin from './../assets/Coin.svg'
import {connectMongoDB} from '@/lib/mongodb'
import User from "@/models/user.js"
import { useSession } from 'next-auth/react'
type head = {
  title: string
}


const Header:FC<head> = ({title}) => {
  const [balance, setBalance] = useState(null)
  const { status } = useSession()
  { status === "authenticated" ? (useEffect(() => {
    const fetchUserData = async () => {
      try {
        await connectMongoDB(); // Connect to the MongoDB database

        // Fetch the data from MongoDB using Mongoose
        const userData = await User.findOne({ name: '_xsel' }); // Replace 'John' with the user's name you want to fetch

        if (userData) {
          setBalance(userData.balance);
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, []) ): (console.log('I cant see fetched data'))}
  return (
    <>
        <header className='header bg-[#141414] px-8'>
            <div className='flex justify-between py-6 text-2xl font-semibold text-white'>
                <h2>{title}</h2>
                <div className='flex gap-2'>
                    <Image src={coin} alt={'coin-icon'} />
                    {status === "authenticated" ? (
                      <p>{balance}</p>
                    ): (<p>400</p>)}
                </div>
            </div>
        </header>
    </>
  )
}

export default Header