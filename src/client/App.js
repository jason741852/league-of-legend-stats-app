import { Typography, AppBar, TextField, Grid, Button } from "@material-ui/core";
import React from "react";
import "./style/style.css";

export default class App extends React.PureComponent
{
	constructor(props)
	{
		super(props);

		this.state =
			{
				summerName: ""
			}
	}

	render() {
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
					value={this.state.summerName}
					onChange={(evt) => this.setState({ summerName: evt.target.value })}
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

	HandleOnSearchClicked()
	{
		// todo
	}
}
