import { Typography, AppBar, TextField, Grid, Button, Card, CardContent, CardMedia } from "@material-ui/core";
import React from "react";
import Service from "./service/Service";
import "./style/style.css";
import { GetImage } from "./util/ImageUtil";

export default class App extends React.PureComponent
{
	constructor(props)
	{
		super(props);

		this.state =
			{
				summonerName: "",
				summoner: undefined,
				matchlist: undefined,
				matches: undefined
			}
	}

	render()
	{
		return (
			<>
				{this.RenderHeader()}
				<Grid
					container
					direction="column"
					alignItems="center" >
					{this.RenderInputField()}
					{this.RenderMatchData()}
				</Grid>
			</>
		);
	}

	RenderHeader()
	{
		return (
			<AppBar
				elevation={0}
				position="static">
				<Typography
					variant={"h1"}>
					{"League of Lengend Stats App"}
				</Typography>
			</AppBar>
		);
	}

	RenderInputField()
	{
		return (
			<>
				<TextField
					label={"Enter a Summoner's name"}
					value={this.state.summonerName}
					onChange={(evt) => this.setState({ summonerName: evt.target.value })}
					autoFocus />
				<Button
					variant="contained"
					color="primary"
					onClick={() => this.HandleOnSearchClicked()}>
					{"Search"}
				</Button>
			</>
		)
	}

	RenderMatchData()
	{
		console.log(this.state.summoner);

		if (!this.state.summoner)
		{
			return null;
		}

		console.log("RenderSummoner");

		console.log(this.state.matches);

		return (
			<>
				{this.RenderSummoner()}
				{this.state.matches.map((nth, index) =>
				{
					const participantIdentity = nth.participantIdentities.find((nth) => nth.player.accountId === this.state.summoner.accountId);
					const participant = nth.participants.find((nth) => nth.participantId === participantIdentity.participantId);

					const stats = participant.stats;
					const isWinner = stats.win;
					const killAssistDeathRatio = `${stats.kills} / ${stats.assists} \ ${stats.deaths}`;

					return (
						<Grid
							container
							direction="column"
							alignItems="center" >
							{`${`Result: ${isWinner ? "Victory" : "Defeat"} `}`}
							{`Game Duration: ${nth.gameDuration} `}
							{`K/A/D: ${killAssistDeathRatio}`}
						</Grid>
					);
				})}
			</>
		)
	}

	RenderSummoner()
	{
		const summoner = this.state.summoner;

		return (
			<Card>
				<CardMedia
					style={{
						height: "100px"
					}}
					image={GetImage(`profileicon/${summoner.profileIconId}`, "png")} />
				<CardContent>
					<Typography gutterBottom variant="h5" component="h2">
						{summoner.name}
					</Typography>
				</CardContent>
			</Card>
		)
	}

	async HandleOnSearchClicked()
	{
		const summonerName = this.state.summonerName.replace(/ /g, '+');

		try
		{
			const response = await Service.GetPlayerInfo(summonerName);

			console.log(response);

			this.setState({
				summoner: response.summonerDto,
				matchlist: response.matchlistDto,
				matches: response.matches
			}, () => console.log(this.state))

		}
		catch (err)
		{
			console.log(err);
		}
	}
}
