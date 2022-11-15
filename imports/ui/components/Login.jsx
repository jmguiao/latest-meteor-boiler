import React, { Component } from 'react'
import { Meteor } from 'meteor/meteor';
import AppW from "../../api/classes/client/App"
import { Link, Navigate } from "react-router-dom";

export default class Login extends Component {
    constructor(props) {
        super(props);
        AppW.setWatcher(this, "LOGIN");
        this.state = {
            user: null, 
            error: null
        };
        
    }

     //login with google
     handleGoogleLogin=()=> {
        Meteor.loginWithGoogle({
            requestPermissions: [
                'https://www.googleapis.com/auth/drive.appdata',
                "https://www.googleapis.com/auth/spreadsheets",
                "https://www.googleapis.com/auth/documents ",
                "https://www.googleapis.com/auth/drive ",
                "https://www.googleapis.com/auth/drive.file",
                "https://www.googleapis.com/auth/documents.readonly",
                "https://www.googleapis.com/auth/drive.readonly",
                'https://www.googleapis.com/auth/userinfo.email',
                'https://www.googleapis.com/auth/userinfo.profile'
            ],
            requestOfflineToken: true,
            forceApprovalPrompt: true
        }, (error) =>{
            if (error) {
                alert(error.reason);
               // alert({content: "Login Credentials error: Please report the following error to your system administrator",okText: "Ok"});
                //console.log(error);
                // return;
            }
            else{
              // browserHistory.push('/users');
                const token = localStorage.getItem("Meteor.loginToken");
                
                this.setState({ user: token});
                console.log("success",Meteor.userId());
                
            }
            
        });
    }
  render() {
    let { user, error } = this.state;

    return (
      <div>
        {user && (
             <Navigate to="/" replace={true} />
          )
        }
        <button style={{borderRadius:"5px"}} className="blue-btn w-button" onClick={this.handleGoogleLogin}>Sign In Google App</button>
      </div>
    )
  }
}
