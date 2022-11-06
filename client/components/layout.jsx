import Head from 'next/head'
import React from 'react'

export default function (props) {
  return (
    <div>
        <Head>
            <title>{props.title}</title>
            <link rel="icon" href="https://res.cloudinary.com/fnxr/image/upload/v1665402930/messenger_1_i7knp6.png" />
        </Head>
        {props.children}
    </div>
  )
}
