export function GetImage(
    name,
    extension = "png")
{
    return require(`../asset/riot-asset/${name}.${extension}`);
}
