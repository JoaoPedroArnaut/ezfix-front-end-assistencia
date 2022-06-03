/* eslint-disable react-hooks/exhaustive-deps */
import { parseCookies, setCookie } from "nookies";
import { createContext, useEffect, useState } from "react";
import { api, setToken } from "../api/api";

export const SessaoContext = createContext({});

export const SessaoProvider = ({ children }) => {

    const [email, setEmailSessao] = useState("");
    const [user, setUser] = useState(null)
    const [isTecnico, setTecnico] = useState(false)
    const [primeiraVez, setPrimeiraVez] = useState(false)

    let init = true

    const cookies = parseCookies()

    useEffect(() => {
        api.get(`/assistencia/${cookies.id}`).then(response => {
            if (response.data != null) {
                if (user == null) {
                    setUser(response.data)
                    setEmailSessao(response.data.representante.usuario.email)
                }
            }
        }, err => {

        })
    }, [user])

    useEffect(() => {
        if (email != "") {
            api.get(`/assistencia/email/${email}`, { headers: { Authorization: `Bearer ${cookies.token}` } })
                .then(response => {
                    setUser(response.data);
                    setCookie(null, 'id', response.data.id, {
                        maxAge: 3600,
                        path: '/',
                    });
                }, err => {

                })
        }

    }, [email])

    return <SessaoContext.Provider value={{ email, setEmailSessao, user, setTecnico }}>{children}</SessaoContext.Provider>
}