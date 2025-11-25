"use client";
import { signIn } from 'next-auth/react'
import React from 'react'

const App = () => {
    return (
        <div>
            <div>
                spotify
            </div>
            <div>
                <button onClick={() => { signIn() }}>Sign in</button>
            </div>
        </div>
    )
}

export default App