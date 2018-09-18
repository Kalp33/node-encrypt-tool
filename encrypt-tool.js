const { prompt } = require('inquirer'); 
const cryptoConfigService = require('./server/service/cryptoConfigService');
const fs = require('fs');

var config = fs.readFileSync('./configuration/config.json');
var configJson = JSON.parse(config);


const questions = [
  {
    type : 'input',
    name : 'mongoDBUri',
    message : 'Enter MongoDB URI ...'
  },
  {
    type : 'input',
    name : 'databaseName',
    message : 'Enter Database Name ...'
  },
  {
    type : 'input',
    name : 'databaseUser',
    message : 'Enter Database User ...'
  },
  {
    type : 'input',
    name : 'dbPassword',
    message : 'Enter Database Password ...'
  },
  {
    type : 'input',
    name : 'adminUsername',
    silent: 'true',
    message : 'Enter Admin Username ...'
  },
  {
    type : 'input',
    name : 'adminPassword',
    silent: 'true',
    message : 'Enter Admin Password ...'
  },
  {
    type : 'input',
    name : 'jwtDialogFlowUser',
    silent: 'true',
    message : 'Enter DialogFlow Username ...'
  },
  {
    type : 'input',
    name : 'dialogFlowPassword',
    message : 'Enter DialogFlow Password ...'
  },
  {
    type : 'input',
    name : 'certPhrase',
    message : 'Enter Certificate Phrase ...'
  }
];

prompt(questions).then(answers => {
    if(answers.mongoDBUri != ''){
        configJson.mongoDBUri = answers.mongoDBUri;
    }
    if(answers.databaseName != ''){
        configJson.databaseName = answers.databaseName;
    }
    if(answers.databaseUser != ''){
        configJson.databaseUser = answers.databaseUser;
    }
    if(answers.dbPassword != ''){
        configJson.databasePassword = cryptoConfigService.encryptConfig(answers.dbPassword);
    }
    if(answers.adminUsername != ''){
        configJson.adminUsername = answers.adminUsername;
    }
    if(answers.adminPassword != ''){
        configJson.adminPassword = cryptoConfigService.encryptConfig(answers.adminPassword);
    }
    if(answers.jwtDialogFlowUser != ''){
        configJson.jwtDialogFlowUser = answers.jwtDialogFlowUser;
    }
    if(answers.dialogFlowPassword != ''){
        configJson.jwtDialogFlowPassword = cryptoConfigService.encryptConfig(answers.dialogFlowPassword);    
    }
    if(answers.certPhrase != ''){
        configJson.certPhrase = cryptoConfigService.encryptConfig(answers.certPhrase);    
    }
    fs.writeFileSync('./configuration/config.json', JSON.stringify(configJson));
});
