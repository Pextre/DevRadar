import React from "react";
import { View } from  "react-native";
import { WebView } from "react-native-webview";

function Profile({navigation}){

    const github_username = navigation.getParam("github_username");
    const githubURL = `https://github.com/${github_username}`;
    return (<WebView style={{flex:1}} source={{uri:githubURL}} /> )
}


export default Profile;
