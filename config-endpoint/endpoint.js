const serverL = 'localhost:3200'
const server = '18.228.199.97:4200'
const portClient = '3389'
const endpointTarget = `http://${server}`
const imgEndpoint = `${endpointTarget}/static/users/`

const dataHouse = {
    imgEndpoint: imgEndpoint, 
    portClient:portClient, 
    database: 'house58-syswa',
    siteRedirect: "",
    endpointTarget:endpointTarget,
    url: `http://house58.syswa.net/#`,
    server:server 
}

const dataKK = {
    imgEndpoint: imgEndpoint, 
    portClient:portClient, 
    database: 'kkprettynails-syswa',
    siteRedirect: 'http://kkspa.cl',
    endpointTarget:endpointTarget,
    url: `http://kkspa.syswa.net/#`,
    server:server 
}

const dataQa = {
    imgEndpoint: imgEndpoint, 
    portClient:portClient, 
    database: "syswa-gestion-qa",
    siteRedirect: "",
    endpointTarget:endpointTarget,
    url: `http://syswagestionqa.syswa.net/#`,
    server:server 
}

const endPoint = dataQa

module.exports = endPoint