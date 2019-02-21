const Config = require("../data");
require("isomorphic-fetch");

const GetMatchListRequest = async (encryptedAccountId) => new Promise(
    (resolve, reject) =>
    {
        const url = `https://na1.api.riotgames.com/lol/match/v4/matchlists/by-account/${encryptedAccountId}?beginIndex=0&endIndex=10&api_key=${Config["riot.apiKey"]}`;

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

module.exports = GetMatchListRequest;
