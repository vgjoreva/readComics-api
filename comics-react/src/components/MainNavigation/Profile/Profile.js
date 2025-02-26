/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from 'react';
import './Profile.scss';
import UserInfo from "./UserInfo/UserInfo";
import UserComics from "./UserComics/UserComics";
import {ACCESS_TOKEN} from "../../../repository/readComicsApi";
import {Icon, Button} from "semantic-ui-react";

class Profile extends Component {

    constructor(props){
        super(props);
        this.state = {
            component: "Dashboard",
            showPersonalInfoFlag: true,
            showComicsFlag: false,
        }
        sessionStorage.setItem("active", "Profile")
    }

    componentWillMount(){
        sessionStorage.setItem("successMsg", "false");
        sessionStorage.setItem("errorMsg", "false");

        if(sessionStorage.getItem("cat") !== null)
            sessionStorage.removeItem("cat");

        if(sessionStorage.getItem("profile_tabs") !== null){
            if(sessionStorage.getItem("profile_tabs") === "info"){
                this.setState({
                    showPersonalInfoFlag: true,
                    showComicsFlag: false
                })
            }
            else{
                this.setState({
                    showPersonalInfoFlag: false,
                    showComicsFlag: true
                })
            }
        }
    }

    showPersonalInfo = () =>{
        this.setState({
            showPersonalInfoFlag: true,
            showComicsFlag: false
        })
        sessionStorage.setItem("profile_tabs", "info")
    }

    showComics = () =>{
        this.setState({
            showPersonalInfoFlag: false,
            showComicsFlag: true
        })
        sessionStorage.setItem("profile_tabs", "comics")
    }

    signOut = () =>{
        localStorage.removeItem(ACCESS_TOKEN)
        sessionStorage.removeItem("currentUser_id");
        sessionStorage.removeItem("active");
        sessionStorage.removeItem("profile_tabs");
        window.location.reload()
    }

    render() {
        return (
            <div className="col-lg-9 p-2 vh-100">
                <div className="row">
                    <div className="col-lg-12">
                        <em className="h4 m-4 float-left">Profile</em>
                        <Button
                            onClick={this.signOut.bind(this)}
                            className="h4 m-4 float-right bg-light"
                            icon>
                            <Icon
                                link
                                color="teal"
                                size="large"
                                name="power off"/>
                        </Button>
                    </div>
                </div>
                <hr className="bg-light"/>


                {
                    this.state.showPersonalInfoFlag &&

                    <div>
                        <nav className="navbar navbar-expand-sm bg-light justify-content-center">
                            <ul className="navbar-nav profile-ul">
                                <li className="nav-item mr-5 profile-li">
                                    <a className="nav-link profile-a active-profile-item" onClick={this.showPersonalInfo} href="#">Personal
                                        information</a>
                                </li>
                                <li className="nav-item ml-5 profile-li">
                                    <a className="nav-link profile-a" onClick={this.showComics} href="#">Comics</a>
                                </li>
                            </ul>
                        </nav>

                        <UserInfo
                            userInfo="info"
                            signOut={this.signOut.bind(this)}/>
                    </div>

                }

                {
                    this.state.showComicsFlag &&

                    <div>
                        <nav className="navbar navbar-expand-sm bg-light justify-content-center">
                            <ul className="navbar-nav profile-ul">
                                <li className="nav-item mr-5 profile-li">
                                    <a className="nav-link profile-a" onClick={this.showPersonalInfo}  href="#">
                                        Personal information
                                    </a>
                                </li>
                                <li className="nav-item ml-5 profile-li">
                                    <a className="nav-link profile-a active-profile-item" onClick={this.showComics} href="#">
                                        Comics
                                    </a>
                                </li>
                            </ul>
                        </nav>

                        <UserComics userComics={"comics"} />

                    </div>
                }

            </div>
        )
    }

}

export default Profile;