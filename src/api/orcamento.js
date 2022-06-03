import { api } from "./api"

export async function getTodosOrcamentos() {
    return await api.get(`/orcamentos/assistencia`).then(res => { return res.data }, err => { return err })
}