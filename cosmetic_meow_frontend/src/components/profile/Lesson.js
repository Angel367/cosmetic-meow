import axiosService from "../../requests/axiosService";
import {Link, useParams} from "react-router-dom";
import React from "react";
import Loading from "../error/Loading";

const Lesson = () => {
    const { id_lesson } = useParams();
    const [lesson, setLesson] = React.useState(undefined);
    const [completed, setCompleted] = React.useState(false);
    const [prevLesson, setPrevLesson] = React.useState(undefined);
    const [nextLesson, setNextLesson] = React.useState(undefined);

    React.useEffect(() => {
        const fetchLesson = async () => {
            const response = await axiosService(`lessons/${id_lesson}/`);
            setLesson(response.data);
        }
        fetchLesson();
    }, [id_lesson]);
    React.useEffect(() => {
        const fetchCompleted = async () => {
            const response = await axiosService(`completed-lessons/${id_lesson}/`);
            setCompleted(response.data.completed);
        }
        fetchCompleted();
    }, [id_lesson]);
    React.useEffect(() => {
        const fetchPrevLesson = async () => {
            const response = await axiosService(`lessons/${id_lesson}/prev/`);
            setPrevLesson(response.data);
        }
        fetchPrevLesson();
    }, [id_lesson]);
    React.useEffect(() => {
        const fetchNextLesson = async () => {
            const response = await axiosService(`lessons/${id_lesson}/next/`);
            setNextLesson(response.data);
        }
        fetchNextLesson();
    }, [id_lesson]);

    if (lesson === undefined) {
        return <Loading/>;
    }
    return (
        <div className="lesson d-flex flex-column gap-3">
            <h1 className="lesson__title">{lesson.title}</h1>
            <div className="lesson__content">{lesson.content}</div>
            <div className="lesson__video">
                <video src={lesson.video_url} controls/>
            </div>
            <Link to={`${lesson.id}/test`} className="btn btn-primary">Пройти тест</Link>
            <Link to={`${prevLesson}`} className="btn btn-primary">Предыдущий урок</Link>
            <Link to={`${nextLesson}`} className="btn btn-primary">Следующий урок</Link>
        </div>
    );
}
export default Lesson;