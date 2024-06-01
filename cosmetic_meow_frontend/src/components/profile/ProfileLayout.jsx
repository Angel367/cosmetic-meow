import React from "react";
import ProfileNav from "./ProfileNav";
import Layout from "../base/Layout";
import {logout} from "../../hooks/user.actions";


function ProfileLayout({content, title}) {
    document.title = title;

    return (
        <Layout title={title}>
            <main className="container-fluid d-flex justify-content-center mt-5 mb-5 aling-items-center
            position-relative">

            <ProfileNav/>
                {content}
            </main>
        </Layout>
    );
}
export default ProfileLayout;