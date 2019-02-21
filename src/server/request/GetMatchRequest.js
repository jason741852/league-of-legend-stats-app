const Config = require("../data");
require("isomorphic-fetch");

const GetMatchRequest = async (matchId) => new Promise(
    (resolve, reject) =>
    {
        const url = `https://na1.api.riotgames.com/lol/match/v4/matches/${matchId}?api_key=${Config["riot.apiKey"]}`;

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

module.exports = GetMatchRequest;
