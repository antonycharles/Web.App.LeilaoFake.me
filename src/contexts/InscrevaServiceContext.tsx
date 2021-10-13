import React from "react";

const InscrevaServiceContext = React.createContext({
    inscrevase(nome: string, email :string) : Promise<boolean> { return Promise.reject(false); }
});

export default InscrevaServiceContext;