import Request from "./request/Request";
import { champion } from "./champion";

export default class Service
{
    static Request = new Request();

    static async GetPlayerInfo(summonerName)
    {
        try
        {
            const response = await Service.Request.GetPlayerInfo(summonerName);

            console.log(response);

            if (response.result === "Success")
            {
                return response;
            }
            else
            {
                console.log(response.reason);
                throw (response.reason);
            }
        }
        catch (err)
        {
            return err;
        }
    }

    static getChampionInfo(championId)
    {
        const key = Object.keys(champion.data).find((nth) => champion.data[nth].key == championId);

        return champion.data[key];
    }
}
