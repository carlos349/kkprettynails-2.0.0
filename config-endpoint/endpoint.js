const serverL = '192.168.1.106:4200'
const server = 'kkprettynailsback.syswa.net'
const serverQa = '18.231.122.2:3200'
const portClient = '3389'
const endpointTarget = `http://${serverL}`
const imgEndpoint = `${endpointTarget}/static/users/`

const endPoint =  { 
    imgEndpoint: imgEndpoint, 
    portClient:portClient, 
    endpointTarget:endpointTarget, 
    server:server 
}

module.exports = endPoint