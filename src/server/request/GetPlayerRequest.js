const Config = require("../data");
require("isomorphic-fetch");

const GetPlayerRequest = async (summonerName) => new Promise(
    (resolve, reject) =>
    {
        const url = `https://na1.api.riotgames.com/lol/summoner/v4/summoners/by-name/${summonerName}?api_key=${Config["riot.apiKey"]}`;

        fetch(
            url,
            {
                method: "GET",
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then((response) => response.json())
            .then((response) =>
            {
                resolve(response);
            })
            .catch((err) =>
            {
                reject(err);
            })
    }
)

module.exports = GetPlayerRequest;
