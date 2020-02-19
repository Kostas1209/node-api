export default {
    port : 3000,
    host : "http://localhost",

    db_port : 27017,
    db_host: `mongodb://localhost`,
    db_name: "node_api",

    salt_bcrypt: 10,

    jwt_access_expire: 20*60, ///seconds
    jwt_refresh_expire: 24*60*60, /// seconds 
    jwt_access_secret: "access_secret",
    jwt_refresh_secret: "refresh_secret"
}
