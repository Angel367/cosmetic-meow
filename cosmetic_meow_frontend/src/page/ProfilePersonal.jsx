import React, {useEffect} from "react";
import Header from "../components/baseComponents/Header";
import Footer from "../components/baseComponents/Footer";
import ProfileNav from "../components/baseComponents/ProfileNav";
import Personal from "../components/profile/Personal";


function ProfilePersonal() {
    useEffect(() => {
        document.title = "Основное информация профиля";
        window.scrollTo(0, 0);
    });
    return (
        <div>
            <Header />
            <main>
            <ProfileNav/>
            <Personal/>
            </main>
            <Footer />
        </div>
    );
}
export default ProfilePersonal;