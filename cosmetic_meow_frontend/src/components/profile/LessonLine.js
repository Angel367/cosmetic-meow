import {Link} from "react-router-dom";

const LessonLine = ({ lesson, completed }) => {
    return (
        <div className="lesson-line d-flex flex-row gap-3">
            <div className="lesson-line__title">{lesson.title}</div>
            <div className="lesson-line__description">{lesson.description}</div>
            {completed ?
                <Link to={`lesson/${lesson.id}`} className="btn btn-success">Повторить</Link> :
                <Link to={`lesson/${lesson.id}`} className="btn btn-light">Пройти</Link>
            }
        </div>
    );
}
export default LessonLine;