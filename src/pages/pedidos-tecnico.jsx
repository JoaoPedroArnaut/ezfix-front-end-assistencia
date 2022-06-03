/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/rules-of-hooks */
import React, { useContext, useEffect, useState } from "react";

import SidebarTecnico from "../components/SidebarTecnico";
import TablePedidos from "../components/TablePedidos";
import SectionStatusOrders from "../components/SectionStatusOrders";
import BarQtdOrders from "../components/BarQtdOrders";
import { SessaoContext } from '../contexts/Sessao';
import Carregamento from '../components/Carregamento';
import { api } from '../api/api';
import { parseCookies } from "nookies";
import RenderIf from "../components/RenderIf";
import { isError, useQuery } from 'react-query'
import { getTodosOrcamentos } from "../api/orcamento";


function pedidosTecnico() {

  const { user } = useContext(SessaoContext)
  const [carregado, setCarregado] = useState(false)
  const [vazio, setVazio] = useState(true)
  const [orcamentos, setOrcamentos] = useState([])
  const cookies = parseCookies()
  const [menu, setMenu] = useState(1);
  const [lista, setLista] = useState([]);
  const [novos, setNovos] = useState(0)
  const [andamento, setAndamento] = useState(0)
  const [finalizado, setFinalizado] = useState(0)

  const { data, isLoading, isError } = useQuery('meusPedidos', () => getTodosOrcamentos())

  useEffect(() => {
    if (!!data) {
      console.log(data);
      setLista(data)
      data.length > 0 ? setVazio(false) : setVazio(true)
    }
  }, [data])

  useEffect(() => {
    filtraLista(menu, lista)
  }, [menu])

  function filtraLista(m, l) {
    if (m == 1) {
      setLista(l.filter(o => o.statusGeral == "aguardando resposta tecnico"))
    } else if (m == 3) {
      setLista(l.filter(o => o.statusGeral == "concluido"))
    } else {
      setLista(l.filter(o => o.statusGeral != "aguardando resposta tecnico" && o.statusGeral != "concluido"))
    }
  }

  return (
    <>
      <section className="flex">
        <SidebarTecnico />
        <div className="w-11/12 flex flex-col ml-10 mt-10">
          <h1 className="text-blue-dark_light text-4xl font-bold mb-5">Pedidos:</h1>
          <BarQtdOrders novo={novos} andamento={andamento} finalizado={finalizado} />

          <SectionStatusOrders setMenu={setMenu} />
          <RenderIf condition={vazio}>
            <div className="w-full mt-4 text-center" >Nenhum Pedido</div>
          </RenderIf>
          <RenderIf condition={!vazio}>
            {lista.map((item, i) => <TablePedidos key={i} itens={item.itemOrcamentoList} nome={item.nomeSolicitante} data={item.dataSolicitacao} status={item.status} id={item.idOrcamento} />)}
          </RenderIf>
        </div>
      </section>
    </>
  )
}

export default pedidosTecnico;
