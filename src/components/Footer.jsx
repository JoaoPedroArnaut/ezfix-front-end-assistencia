/* eslint-disable react-hooks/exhaustive-deps */
import { faFacebookF, faInstagram, faTwitter } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Link from 'next/link'
import Image from 'next/image'
import React, { useState, useEffect } from 'react'

const Footer = () => {

    const [maquina, setMaquina] = useState(1)

    useEffect(() => {

        Math.floor(Math.random() * 10) % 2 == 0 ? setMaquina(1) : setMaquina(2)
    }, [])

    return (
        <div className="bg-blue-dark flex items-center flex-col text-white text-center">
            <Image src='/ezfix_logo.png' alt="logo ezfix" height="150" width="150" />
            <p className="sm:w-6/12">Maquina: {maquina}</p>
            <Link href="/tecnico/home" passHref>
                <a className="mt-4 cursor-pointer" >seja uma assistência parceira</a>
            </Link>
            <div className="w-full sm:w-6/12 lg:w-3/12 flex justify-evenly mt-8">
                <p>Lalamove</p>
                <Link href="/faq" passHref>
                    <a>FAQs</a>
                </Link>
                <p>Suporte</p>
            </div>
            <div className="w-6/12 sm:w-3/12 lg:w-2/12 flex justify-around mt-8">
                <FontAwesomeIcon icon={faFacebookF} />
                <FontAwesomeIcon icon={faTwitter} />
                <FontAwesomeIcon icon={faInstagram} />
            </div>
            <p className="my-8">Copyright © 2021. Ezfix. All rights reserved.</p>
        </div>
    )
}

export default Footer
