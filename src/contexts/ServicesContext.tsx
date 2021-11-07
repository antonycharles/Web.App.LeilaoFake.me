import { createContext } from "react";
import ICadastroService from "../services/cadastro.service.interface";
import ILeilaoImagemService from "../services/leilao.imagem.service.interface";
import ILeilaoLanceService from "../services/leilao.lance.service.interface";
import ILeilaoService from "../services/leilao.service.interface";
import ILogarService from "../services/logar.service.interface";

const ServicesContext = createContext({
    cadastroService : {} as ICadastroService,
    leilaoImagemService : {} as ILeilaoImagemService,
    leilaoLanceService: {} as ILeilaoLanceService,
    leilaoService: {} as ILeilaoService,
    logarService: {} as ILogarService
});

export default ServicesContext;