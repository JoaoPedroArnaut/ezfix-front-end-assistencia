import React, { useState } from 'react'

const BoxProdOrcamento = ({ tipo, marca, modelo, descricao }) => {

    const [valor,setValor] = useState(0);

    return (
        <div className="bg-blue-light_dark rounded-2xl p-4 flex w-full justify-between my-3 shadow-lg">
            <div className="w-45">
                <div className="flex mb-1">
                    <b>{tipo}</b>
                    <span className="ml-2">{marca} {modelo}</span>
                </div>
                <p className="mb-1 text-gray-dark">{descricao}</p>
            </div>
        </div>
    )
}

export default BoxProdOrcamento