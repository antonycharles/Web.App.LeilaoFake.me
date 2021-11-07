import axios, { AxiosInstance } from "axios";
import IErroDefault from "../interfaces/erro.default";

export default interface IApiService {
    getApi() : AxiosInstance,
    defaultErro(error: any): IErroDefault
}