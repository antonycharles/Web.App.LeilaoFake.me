import IUsuario from "./usuario";

export default interface ILance {
    id: string,
    criadoEm: Date,
    valor: number,
    interessadoId: string,
    interessado: IUsuario,
    leilaoId: string
}