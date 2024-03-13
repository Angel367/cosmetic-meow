import React, {useEffect} from "react";
import Header from "../components/baseComponents/Header";
import Footer from "../components/baseComponents/Footer";
import ProfileNav from "../components/baseComponents/ProfileNav";
import ProfileContent from "../components/profile/ProfileContent";

function Profile() {
    useEffect(() => {
        document.title = "Профиль";
        window.scrollTo(0, 0);
    });
    return (
        <div>
            <Header />
            <main>
            <ProfileNav/>
            <ProfileContent />
            </main>
            <Footer />
        </div>
    );
}
export default Profile;