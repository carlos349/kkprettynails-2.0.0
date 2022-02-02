const serverL = 'localhost:3200'
const server = '18.228.199.97:4200'
const serverQa = '18.231.122.2:3200'
const portClient = '3389'
const endpointTarget = `http://${serverL}`
const siteRedirect = 'http://kkspa.cl'
const siteRedirectHouse = ''
const url = `http://kkspa.syswa.net/#`
const urlHouse = `http://house58.syswa.net/#`
const imgEndpoint = `${endpointTarget}/static/users/`
const database = 'kkprettynails-syswa'
const database2 = 'house58-syswa'
const endPoint = { 
    imgEndpoint: imgEndpoint, 
    portClient:portClient, 
    database: database,
    siteRedirect: siteRedirect,
    endpointTarget:endpointTarget,
    url: url,
    server:server 
}

module.exports = endPoint