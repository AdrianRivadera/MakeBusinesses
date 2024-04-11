import React from 'react'
import logo from '../assets/logo.webp'
import bg from '../assets/bg-img2.webp'
import Chat from '../Components/Chat'

export default function Header() {
    return (
        <>
            <section
                className=' h-screen lg:w-full flex justify-center bg-no-repeat bg-center items-center'
                style={{ backgroundImage: `url(${bg})`, backgroundSize: 'cover', filter: 'brightness(100%)' }}
            >

                <div className="flex lg:w-4/5  w-11/12 m-auto justify-evenly  flex-col lg:flex-row lg:py-10  lg:backdrop-opacity-10 lg:backdrop-invert lg:bg-white/90 rounded-3xl">

                    <div className='flex flex-col items-center lg:items-start justify-center lg:justify-start w-full lg:w-1/2 h-full mb-4 lg:mb-10'>
                        <img
                            className="h-auto w-36 lg:w-42 mb-4 lg:mb-10"
                            src={logo}
                            alt="Logo"
                        />
                        <div className='bg-white lg:bg-transparent p-2 lg:p-0 rounded-2xl lg:rounded-none'>
                            <h1 className="text-2xl lg:text-3xl text-center lg:text-start font-medium text-pretty">Lorem ipsum dolor, sit amet consectetur adipisicing elit.</h1>
                            <p className="text-base lg:text-xl text-center lg:text-start mt-4 text-pretty">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Corrupti beatae neque officiis sequi incidunt animi perspiciatis quos soluta. Explicabo, expedita sunt! </p>
                        </div>

                    </div>

                    <div className='pb-10 lg:pb-0'>
                        <Chat />
                    </div>
                </div>
            </section>

        </>


    )
}
