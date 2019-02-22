const GetPlayerRequest = require("../request/GetPlayerRequest");
const GetMatchListRequest = require("../request/GetMatchListRequest");
const GetMatchRequest = require("../request/GetMatchRequest");

module.exports = (app) =>
{
    app
        .get("/api/match_records",
            async (req, res) =>
            {
                let summonerName = req.query.summonerName;

                if (!summonerName)
                {
                    res.status(400);
                    res.json({
                        result: "Failure",
                        reason: "Invalid Summoner Name"
                    });
                    res.send();

                    return;
                }

                try
                {
                    const summonerDto = await GetPlayerRequest(summonerName);
                    console.log(summonerDto);
                    const matchlistDto = await GetMatchListRequest(summonerDto.accountId);
                    console.log(matchlistDto);

                    let matches = {};

                    if (matchlistDto.matches)
                    {
                        const getMatchesRequest = matchlistDto.matches.map((nth) => GetMatchRequest(nth.gameId));
                        matches = await ResolveSequential(getMatchesRequest);
                    }

                    res.status(200);
                    res.json({
                        result: "Success",
                        summonerDto,
                        matchlistDto,
                        matches
                    });

                    res.end();
                }
                catch (err)
                {
                    console.log(err);
                    res.status(200);
                    res.json({
                        result: "Failure",
                        reason: "Cannot find player"
                    });
                    res.end();
                }
            })
}

const ResolveSequential = async (promises) =>
{
    const matches = [];
    try
    {
        for (const nth of promises)
        {
            const match = await nth;
            matches.push(match);
        }
    }
    catch
    {
        return Promise.reject();
    }

    return Promise.resolve(matches);
};
