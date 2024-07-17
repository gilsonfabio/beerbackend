const { Console } = require('console');
const connection = require('../database/connection');

module.exports = {   
    async index (request, response) {
        let status = 'A';
        const promocoes = await connection('prmItens')
        .join('promocoes', 'prmId', 'prmItens.prmId')
        .join('produtos', 'prdId', 'prmItens.prmProId')
        .where('prmInicio', inicio)
        .where('prmFinal', final)
        .where('prmStatus', status)
        .orderBy('produtos.proDescricao')
        .select(['prmItens.*', 'promocoes.prmInicio', 'promocoes.prmFinal', 'produtos.proDescricao', 'produtos.proReferencia', 'produtos.proGrupo', 'produtos.proLinha']);
    
        return response.json(promocoes);
    },      
};

// promocoes`(`prmId`, `prmDescricao`, `prmData`, `prmInicio`, `prmFinal`, `prmUrlPhoto`, `prmStatus`)
// prmItens`(`prmId`, `prmSeq`, `prmProId`, `prmPreVenda`, `prmPrePromocao`)