import React from 'react'
import Head from 'next/head'

import Header_guest from '../components/headers/Header_guest'
import G_header from '../components/headers/G_header'

import Footer from '../components/Footer'




export default function Main({ children  , headerguest_stat=0}) {
  return (
    <div >
      <Head>
        <title>Website</title>
        <meta name="description" content="Intership test" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css" integrity="sha512-Fo3rlrZj/k7ujTnHg4CGR2D7kSs0v4LLanw2qksYuRlEzO+tcaEPQogQ0KaoGN26/zrn20ImR1DfuLWnOo7aBA==" crossOrigin="anonymous" referrerPolicy="no-referrer" />	

      </Head>



            
      <Header_guest headerguest_stat={headerguest_stat}/>


      <G_header/>




    <div className="main " >
        <div className="ls" >    
          {children}

        </div>

    </div>
      <Footer/>

      
    </div>
  )
}
