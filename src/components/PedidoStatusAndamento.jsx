/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useState } from 'react'
// import BarInformacaoCliente from "./BarInformacaoCliente";
import { useRouter } from "next/router";
import Carregamento from './Carregamento';
import { api } from '../api/api';
import EtapaStatus from './EtapaStatus';
import EtapaLinhaStatus from './EtapaLinhaStatus';
import Botao from './Botao';


function PedidoStatusAndamento() {

    const router = useRouter();
    const [pedido, setPedido] = useState()
    const [carregado, setCarregado] = useState(false)
    const [botao, setBotao] = useState(false)
    const [tBotao,setTBotao] = useState("")
    const [etapas,setEtapas] = useState([])
    const [dataStatus, setDataStatus] = useState();
    const [horaStatus, setHoraStatus] = useState();

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

    useEffect(() => {
        if(pedido != undefined){
            if(pedido.status == "aguardando envio" || pedido.status == "reparo em andamento"){
                setBotao(true)
            }

            if(pedido.status == "aguardando envio"){
                setTBotao("confirmar recebimento")
                setEtapas([true])
            }else if (pedido.status == "reparo em andamento"){
                setTBotao("Concluir Reparo")
                setEtapas([true,true])
            }else if (pedido.status == "reparo conluido"){
                setEtapas([true,true,true])
            }else if (pedido.status == "aguardando avalicao"){
                setEtapas([true,true,true,true])
            }else if (pedido.status == "concluido") {
                setEtapas([true,true,true,true,true])
            }
        }
    }, [pedido])

    function atualizaStatus(){
        if(pedido.status == "aguardando envio"){
            api.put(`/orcamentos/atualizar-status/${pedido.idOrcamento}`,{
                "status":"reparo em andamento"
            }).then(res => {
                router.reload()
            },err => {
    
            })
        } else if(pedido.status == "reparo em andamento"){
            api.put(`/orcamentos/atualizar-status/${pedido.idOrcamento}`,{
                "status":"reparo conluido"
            }).then(res => {
                router.reload()
            },err => {
    
            })
        }
    }


    if (carregado) {
        return (
            <>
                {/* <BarInformacaoCliente id={pedido.id} status={pedido.status} nome={pedido.solicitante.nome} data={pedido.dataSolicitacao} /> */}
                <div className="p-10 h-96 flex items-center justify-center border-2 border-gray-dark border-solid rounded-xl rounded-t-none shadow-lg">
                    
                    <div className="w-6/12 flex mb-24 mr-20">
                    <EtapaStatus checked={etapas[0]} etapa={0}/>
                    <EtapaLinhaStatus checked={etapas[0]} />
                    <EtapaStatus checked={etapas[1]} etapa={1}/>
                    <EtapaLinhaStatus checked={etapas[1]} />
                    <EtapaStatus checked={etapas[2]} etapa={2}/>
                    <EtapaLinhaStatus checked={etapas[2]} />
                    <EtapaStatus checked={etapas[3]} etapa={3}/>
                    <EtapaLinhaStatus checked={etapas[3]} />
                    <EtapaStatus checked={etapas[4]} etapa={4}/>
                    </div>
                    {botao && <Botao text={tBotao} onClick={atualizaStatus} estilo={9}/>}

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

export default PedidoStatusAndamento
