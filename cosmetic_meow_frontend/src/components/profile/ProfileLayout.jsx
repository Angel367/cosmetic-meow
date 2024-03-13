import React from "react";
import ProfileNav from "./ProfileNav";


function ProfileLayout({content}) {
    return (
            <main>
            <ProfileNav/>
                {content}
            </main>
    );
}
export default ProfileLayout;