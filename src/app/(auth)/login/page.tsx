
import { redirect } from 'next/navigation'
import React from 'react'
import { getServerAuthSession } from '~/server/auth'


const signIn = async() => {
   const session = await getServerAuthSession()
   if(!session){
    {redirect('/api/auth/signin')}
   }
   return (
    <>
        <h1>Session</h1>
        <p>{session.user?.name}</p>
    
    </>
   )
 
}

export default signIn