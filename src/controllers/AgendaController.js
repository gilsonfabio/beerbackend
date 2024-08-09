const { Console } = require('console');
const connection = require('../database/connection');

module.exports = {   
    async index (request, response) {

        console.log('dados do body:',request.body);

        let datSelecionada = request.body.datAgenda;

        const agenda = await connection('agenda')
        .where('ageData', datSelecionada)
        .select("*");
    
        console.log(agenda)

        return response.json(agenda);
    }, 
    
    async detalhes (request, response) {
        let id = request.params.idAge;
        const agenda = await connection('agenda')
        .where('ageId', id)
        .select("*");
    
        return response.json(agenda);
    }, 

    async notification (request, response) {
        
    },

    async create(request, response) {
        const {
            ageIdUsr,
            ageData,
            ageHora, 
            ageTitulo, 
            ageDescricao, 
            ageContato, 
            ageCelular, 
            ageLogradouro, 
            ageComplemento, 
            ageBairro, 
            ageCidade, 
            ageUf, 
            ageCep } = request.body;

        const [ageId] = await connection('agenda').insert({
            ageIdUsr,
            ageData,
            ageHora, 
            ageTitulo, 
            ageDescricao, 
            ageContato, 
            ageCelular, 
            ageLogradouro, 
            ageComplemento, 
            ageBairro, 
            ageCidade, 
            ageUf, 
            ageCep  
        });
           
        return response.json({ageId});
    },
};
