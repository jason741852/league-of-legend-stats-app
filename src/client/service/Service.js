import Request from "./request/Request";

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
}
