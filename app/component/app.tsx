"use client";
import { signIn, signOut, useSession } from 'next-auth/react'
import React from 'react'

const App = () => {
    const session = useSession()
    return (
        <div>
            <div>
                spotify
            </div>
            <div>
                {session.data?.user ? (
                    <button className='bg-black text-blue-500 p-5' onClick={() => { signOut() }}>Logout</button>
                ) : (
                    <button className='bg-black text-blue-500 p-5' onClick={() => { signIn() }}>Sign in</button>
                )}
            </div>
        </div>
    )
}

export default App