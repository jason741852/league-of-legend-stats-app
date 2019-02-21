export default class Request
{
    async GetPlayerInfo(summonerName)
    {
        const response = await fetch(`/api/match_records?summonerName=${summonerName}`);

        return await response.json();
    }
}
