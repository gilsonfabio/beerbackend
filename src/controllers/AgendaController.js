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
        
    }
};
