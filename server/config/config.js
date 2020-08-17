/*
    PUERTO
*/
process.env.PORT = process.env.PORT || 3000

/*
    Entorno
*/
process.env.NODE_ENV = process.env.NODE_ENV || 'dev'


/*
    BASE DE DATOS
*/
let urlDB

if(process.env.NODE_ENV === 'dev'){
    urlDB = 'mongodb://localhost:27017/cafe-Udemy-FH'
} else {
    urlDB = 'mongodb+srv://alejor64:HRktWT4aJLNaMRCz@cluster0-f4kf4.azure.mongodb.net/cafe-Udemy-FH'
}
process.env.URLDB = urlDB