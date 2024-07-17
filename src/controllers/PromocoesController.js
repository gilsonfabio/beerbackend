const { Console } = require('console');
const connection = require('../database/connection');

module.exports = {   
    async index (request, response) {
        let status = 'A';
        let datProcess = new Date();
        let year = datProcess.getFullYear();
        let month = datProcess.getMonth();
        let day = datProcess.getDate();

        let datPromo = year + '-' + month + '-' + day

        const promocoes = await connection('prmItens')
        .join('promocoes', 'prmId', 'prmItens.itePrmId')
        .join('produtos', 'prdId', 'prmItens.itePrmProId')
        .where('promocoes.prmInicio','<=', datPromo)
        .where('promocoes.prmFinal', '>=', datPromo)
        .where('promocoes.prmStatus', status)
        .select(['prmItens.*', 'promocoes.prmDescricao', 'promocoes.prmInicio', 'promocoes.prmFinal', 'promocoes.prmStatus', 'produtos.prdDescricao', 'produtos.prdReferencia']);

        return response.json(promocoes);
    },      
};

// promocoes`(`prmId`, `prmDescricao`, `prmData`, `prmInicio`, `prmFinal`, `prmUrlPhoto`, `prmStatus`)
// prmItens`(`prmId`, `prmSeq`, `prmProId`, `prmPreVenda`, `prmPrePromocao`)
//
//.where('promocoes.prmInicio','<=', datPromo)
//.where('promocoes.prmFinal', '>=', datPromo)
//.where('promocoes.prmStatus', status)
