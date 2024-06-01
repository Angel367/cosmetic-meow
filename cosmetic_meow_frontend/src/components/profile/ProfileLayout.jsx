import React from "react";
import ProfileNav from "./ProfileNav";
import Layout from "../base/Layout";
import {logout} from "../../hooks/user.actions";


function ProfileLayout({content}) {
    return (
        <Layout>
            <main className="container-fluid d-flex justify-content-center mt-5 mb-5 aling-items-center
            position-relative">
                <button onClick={() => logout()} className={"btn btn-primary"}
                        style={{position: "absolute", right: "10px", top: "10px"}}
                >Logout</button>
            <ProfileNav/>
                {content}
            </main>
        </Layout>
    );
}
export default ProfileLayout;