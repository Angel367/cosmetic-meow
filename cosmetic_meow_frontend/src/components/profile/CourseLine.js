import {Link} from "react-router-dom";
import React from "react";

const CourseLine = ({ course }) => {
    return (
        <div className={'d-flex justify-content-between align-items-center'}>
            <p>{course.id}</p>
            <p>{course.title}</p>
            <Link to={`${course.id}`} className="btn btn-primary">Перейти к изучению</Link>
        </div>
    );

}
export default CourseLine;