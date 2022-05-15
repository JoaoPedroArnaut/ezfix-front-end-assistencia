import React from 'react'
import BodyCadastro from '../components/BodyCadastro'
import Footer from '../components/Footer'
import Navbar from  "../components/Navbar"
import { CadastroProvider } from '../contexts/Cadastro'

const Cadastro = () => {
    return (
        <>
            <Navbar />
            <CadastroProvider>
                <BodyCadastro />
            </CadastroProvider>
            <Footer />
        </>
    )
}

export default Cadastro
