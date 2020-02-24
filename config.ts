export default {
    port : 8000,
    host : "0.0.0.0",

    db_port : 27018,
    db_host: `mongodb://mongo`,
    db_name: "node_api_docker",

    salt_bcrypt: 10,

    jwt_access_expire: 12*60*60, ///seconds
    jwt_refresh_expire: 24*60*60, /// seconds 
    jwt_access_secret: "access_secret",
    jwt_refresh_secret: "refresh_secret",

    redis_host: "redis",
    redis_port: 6379
}
