import moment from "moment";

export const datasService = {
    apresentacaoData,
    convertDataLocalToDataUtcString,
    formataToInput
}

function apresentacaoData(data: Date | undefined) : string {
    return moment.utc(data).local().format('DD/MM/YYYY HH:mm:ss');
}

function formataToInput(data: Date | undefined) : string {
    return moment.utc(data).local().format('YYYY-MM-DDTHH:mm');
}

function convertDataLocalToDataUtcString (data: string) : string {
    return moment.utc(moment(data).utc()).format()
}