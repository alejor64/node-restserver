/*
    PUERTO
*/
process.env.PORT = process.env.PORT || 3000

/*
    Entorno
*/
process.env.NODE_ENV = process.env.NODE_ENV || 'dev'

/*
    Vencimiento de Token
    60 segundos
    60 minutos
    24 horas
    30 días
*/
process.env.CADUCIDAD_TOKEN = '48h'

/*
    Seed de la autenticación
*/
process.env.SEED = process.env.SEED || 'este-es-el-seed-de-desarrollo'


/*
    BASE DE DATOS
*/
let urlDB

if(process.env.NODE_ENV === 'dev'){
    urlDB = 'mongodb://localhost:27017/cafe-Udemy-FH'
} else {
    urlDB = process.env.MONGO_URI
}
process.env.URLDB = urlDB

/*
    Google Client ID
*/

process.env.CLIENT_ID = process.env.CLIENT_ID || '35155592369-dd30k8s5vfdftpn3us1f8prgt0aq9bt1.apps.googleusercontent.com'