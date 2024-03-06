import Header from "./components/baseComponents/Header";
import Footer from "./components/baseComponents/Footer";
import Dev from "./components/developmentPage/Dev";

function DevelopmentPage() {
    return (
        <div className="App">
            <Header/>
            <Dev/>
            <Footer/>
        </div>
    );
}

export default DevelopmentPage;
