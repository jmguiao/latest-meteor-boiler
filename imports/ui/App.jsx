import React from "react"
import { withTracker } from "meteor/react-meteor-data";
import AppW from '../api/classes/client/App';
import Util from "../api/classes/Utilities"
class App extends React.Component {
	constructor(props) {
		super(props)
		AppW.setWatcher(this, "UNIQUEID")
	}



	render() {

		AppW.initiateWatch("UNIQUEID")
	
		return (
			<div>
				<input onChange={(e) => AppW.setWord(e.target.value)} />
			
				<button onClick={() => AppW.save("123", "ONE")}>Refresh</button>
			</div>
		)
	}

}

export default withTracker(() => {
})(App)


