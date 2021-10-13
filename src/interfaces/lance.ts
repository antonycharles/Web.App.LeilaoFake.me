import { IUsuario } from "./usuario.js";

export interface ILance {
    id: string,
    criadoEm: Date,
    valor: number,
    interessadoId: string,
    interessado: IUsuario,
    leilaoId: string
}