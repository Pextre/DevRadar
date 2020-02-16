const enviroment = {
    server:{port: process.env.SERVER_PORT || 3333},
    db:{url: process.env.DB_URL || "mongodb+srv://oministack:oministack@oministack-7rhd9.mongodb.net/oministack?retryWrites=true&w=majority"},
};

module.exports  = enviroment;
