import ILanceIncluir from "../interfaces/lance.incluir";
import ILance from "../interfaces/lance";

export default interface ILeilaoLanceService {
    incluir(url:string, lance:ILanceIncluir) : Promise<ILance>
}