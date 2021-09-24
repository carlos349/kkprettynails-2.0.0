const serverL = 'localhost:3200'
const server = 'kkprettynailsback.syswa.net'
const serverQa = '18.231.122.2:3200'
const portClient = '3389'
const endpointTarget = `http://${serverL}`
const url = `http://localhost:8080/#`
const imgEndpoint = `${endpointTarget}/static/users/`
const database = 'kkprettynails-syswa'
const endPoint = { 
    imgEndpoint: imgEndpoint, 
    portClient:portClient, 
    database: database,
    endpointTarget:endpointTarget,
    url: url,
    server:server 
}

module.exports = endPoint