import { Meteor } from "meteor/meteor"
import Server from "../imports/api/classes/server/Server"
import { Accounts } from "meteor/accounts-base"

import "../imports/api/server/api"
import "../imports/startup/server"
import { ServiceConfiguration } from 'meteor/service-configuration';

Meteor.startup(() => {
	Server.registerFunctions()
	Server.initServer()

	ServiceConfiguration.configurations.remove({
        service: "google"
    });
    ServiceConfiguration.configurations.upsert(
        { service: 'google' },
        {
            $set: {
                service: "google",
                clientId: "974409507102-fkvfn2ssa3e2kte2meeh2sn62b3cul0k.apps.googleusercontent.com",
                loginStyle: "popup",
                secret: "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",
                rawScopes: 'true',
            },
        }
    );
	Accounts.onCreateUser(function(option,user){
        if (typeof(user.services.google) != "undefined") {
            const profile = [{name: user.services.google.name,
                profilePicture: user.services.google.picture,
                given_name: user.services.google.given_name,
                family_name: user.services.google.family_name,
                isActive: true}]

            const data = [{address: user.services.google.email}]
            user.emails = data;
            user.profile = profile;
            // if (Meteor.users.find().count() === 0) {
            //     user.roles = ["super-user"];
            // }else{
            //     user.roles = ["default-hr"];
            // }
        }
        
        return user;
    });
})
