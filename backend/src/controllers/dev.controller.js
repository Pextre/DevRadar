const axios = require("axios");
const Dev = require("../models/Dev");
const parseStringAsArray = require("../common/parseStringAsArray");
const {findConnections,sendMessage } = require("../websocket");
module.exports = {


    async findAll(req, res, next){
        const devs = await Dev.find();
        res.json(devs);
        return next();
    },


    async store (req, res, next){
        const {
            github_username,
            techs,
            latitude,
            longitude,
        } = req.body;
        const apiResponse = await axios.get(`https://api.github.com/users/${github_username}`);

        let dev = await Dev.findOne({github_username});

        if(!dev){
            const {
                name = login, avatar_url, bio
            } = apiResponse.data;
    
            const techArray = parseStringAsArray(techs);

            const location = {
                type: "Point",
                coordinates: [longitude, latitude]
            };
    
            dev = await Dev.create({
                name,
                github_username,
                avatar_url,
                bio,
                techs: techArray,
                location
            });

            const sendSocketMessageTo = findConnections(
                {latitude,longitude},techArray
            );
            
            sendMessage(sendSocketMessageTo,"newDev",dev);
        }

        

        res.json(dev)
        return next();
    }
}
