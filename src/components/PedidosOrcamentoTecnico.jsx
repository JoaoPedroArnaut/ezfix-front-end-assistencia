/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/rules-of-hooks */
import React, { useContext, useEffect, useState } from 'react'
import BarInformacaoCliente from "./BarInformacaoCliente";
import BoxProdOrcamento from "./BoxProdOrcamento";
import { useRouter } from "next/router";
import Carregamento from './Carregamento';
import Erros from './Erros';
import { api } from '../api/api';


function pedidosOrcamentosTecnico() {

    const router = useRouter();
    const [pedido, setPedido] = useState()
    const [carregado, setCarregado] = useState(false)
    const [valor, setValor] = useState('')
    const [itemEditado, setItemEditado] = useState([])
    const [erros, setErros] = useState([])

    useEffect(() => {

        let idOrcamento = router.query.id
        if (idOrcamento != undefined) {
            api.get(`/orcamentos/${idOrcamento}`).then(res => {
                console.log(res.data);
                setPedido(res.data)
                setCarregado(true)
            }, err => {

            })
        }

    }, [router.query.id]);

    function somaTotal(i, v) {

        let oldValue
        let tmpList = itemEditado
        console.log(tmpList);
        if (tmpList.length === 0) {
            tmpList.push({ i, v })
        } else {
            let tem = tmpList.find(item => item.i === i)
            console.log(tem);
            if (!!tem) {
                oldValue = tem.v
                tem.v = v
            } else {
                tmpList.push({ i, v })
            }
        }

        console.log(tmpList);

        setItemEditado(tmpList)
        setValorTotal(Number(valorTotal - oldValue))
        setValorTotal(Number(valorTotal + v))
    }

    function validEnvia() {
        let idOrcamento = router.query.id
        let tudocerto
        console.log(valor);
        if (valor == '') {
            setErros(["Valor do orçamento não pode estar em branco"])
        } else if(valor <= 0) {
            setErros(["Valor do orçamento não pode zerado"])
        }else {
            setErros([])
            api.put(`/orcamentos/atualizar-valor-orcamento/${idOrcamento}`, {
                "valor": valor
            }).then(res => {
                router.push("/pedidos-tecnico")
            }, err => {
                setErros(["Ocorreu um erro tente novamente mais tarde"])
                console.log(err.response);
            })
        }
    }

    if (carregado) {
        return (
            <>
                <BarInformacaoCliente id={pedido.idOrcamento} status={pedido.status} nome={pedido.nomeSolicitante} data={pedido.dataSolicitacao} />
                <div className="p-8 flex flex-col items-center justify-evenly border-2 border-gray-dark border-solid rounded-xl rounded-t-none shadow-lg">
                    <Erros erros={erros} />
                    {pedido.itemOrcamentoList.map((item, i) => <BoxProdOrcamento key={i} somaTotal={somaTotal} tipo={item.tipo} marca={item.marca} modelo={item.modelo} descricao={item.descricao} />)}

                    <div className="flex flex-col w-full bg-blue-light_dark rounded-2xl p-4 items-start">
                        <div className='font-bold'>Defina uma cotação estimada para esse orçamento:</div>
                        <div className='flex w-full mt-2'>
                            <input value={valor} onChange={e => setValor(e.target.value)} placeholder="Ex: 750,54" type="number" className="p-3 rounded-xl mr-1" />
                            <button onClick={() => { validEnvia() }} className="text-white p-3 rounded-xl bg-blue-dark w-15 hover:bg-gray-dark hover:text-blue-dark_light transition-all shadow-lg">Confirmar Orçamento</button>
                        </div>

                    </div>

                </div>

            </>
        )
    } else {

        return (
            <>
                <Carregamento />
            </>
        )
    }
}

export default pedidosOrcamentosTecnico;
