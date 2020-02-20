export default {
    port : 3000,
    host : "0.0.0.0",

    db_port : 27017,
    db_host: `mongodb://localhost`,
    db_name: "node_api",

    salt_bcrypt: 10,

    jwt_access_expire: 12*60*60, ///seconds
    jwt_refresh_expire: 24*60*60, /// seconds 
    jwt_access_secret: "access_secret",
    jwt_refresh_secret: "refresh_secret",

    facebook_id : "647388346008167",
    facebook_secret: "7454c9a5dda245c2e77e51d15af7202b",
    callback_url: "http://localhost:3000/api/auth/facebook/callback",

    redis_host: "localhost",
    redis_port: 6379
}
