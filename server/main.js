import { Meteor } from "meteor/meteor"
import Server from "../imports/api/classes/server/Server"
import { Accounts } from "meteor/accounts-base"

import "../imports/api/server/api"
import "../imports/startup/server"

Meteor.startup(() => {
	Server.registerFunctions()
	Server.initServer()

	// if (!Meteor.users.findOne()) {
	// 	Accounts.createUser({
	// 		username: Meteor.settings.user.username,
	// 		email: Meteor.settings.user.email,
	// 		password: Meteor.settings.user.password,
	// 		profile: Meteor.settings.user.profile,
	// 	})
	// }
})
