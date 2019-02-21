import { Typography, AppBar, TextField, Grid, Button } from "@material-ui/core";
import React from "react";
import Service from "./service/Service";
import "./style/style.css";

export default class App extends React.PureComponent
{

	constructor(props)
	{
		super(props);

		this.state =
			{
				summonerName: "",
				summoner: {},
				matchList: {},
				matches: {}
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
		return (null)
	}

	async HandleOnSearchClicked()
	{
		const summonerName = this.state.summonerName;

		try
		{
			const response = await Service.GetPlayerInfo(summonerName);

			this.setState({
				summoner: response.summonerDto,
				matchlist: response.matchlistDto,
				matches: response.matches
			})
		}
		catch (err)
		{
			console.log(err);
		}
	}
}
