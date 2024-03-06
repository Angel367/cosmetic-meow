import '../../styles/BaseStyles/SmallProductStyles.css'
import React from "react";
import LineAssortment from "./LineAssortment";
import LineDescription from "./LineDescription";
import LineAdvantages from "./LineAdvantages";
import LineComposition from "./LineComposition";
import LineApplication from "./LineApplication";

class Line extends React.Component {
    render() {
        return (
            <main>
                <LineDescription/>
                <LineAssortment/>
                <LineAdvantages/>
                <LineComposition/>
                <LineApplication/>
            </main>
        );
    }
}
export default Line;