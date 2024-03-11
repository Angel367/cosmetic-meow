import React from "react";
import Header from "../components/baseComponents/Header";
import Footer from "../components/baseComponents/Footer";
import ProfileNav from "../components/baseComponents/ProfileNav";
import PersonalEdit from "../components/profile/PersonalEdit";

function ProfilePersonalEdit() {
    return (
        <div>
            <Header />
            <main>
            <ProfileNav/>
            <PersonalEdit />
            </main>
            <Footer />
        </div>
    );
}
export default ProfilePersonalEdit;