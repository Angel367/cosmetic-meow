import { useParams} from "react-router-dom";
import LessonLine from "./LessonLine";
import axiosService from "../../requests/axiosService";
import React from "react";
import Loading from "../error/Loading";

const Course = () => {
    const {id_course} = useParams();
    const [course, setCourse] = React.useState(undefined);
    const [lessons, setLessons] = React.useState(undefined);
    const [lessonCompleteds, setLessonCompleteds] = React.useState(false);
    React.useEffect(() => {
        const fetchCourse = async () => {
            const response = await axiosService(`courses/${id_course}/`);
            setCourse(response.data);
        }
        fetchCourse();
    }, [id_course]);
    React.useEffect(() => {
        const fetchLessons = async () => {
            const response = await axiosService(`lessons/`,
                {
                    params: {
                        course: id_course,
                    }
                });
            setLessons(response.data?.results);
        }
        fetchLessons();
    }, [id_course]);
    React.useEffect(() => {
        const fetchLessonCompleteds = async () => {
            const response = await axiosService(`user-lesson-progress/`,
                {
                    params: {
                        course: id_course,
                    }
                });
            setLessonCompleteds(response.data?.results);
        }
        fetchLessonCompleteds();
    }, [id_course]);
    if (course === undefined || lessons === undefined || lessonCompleteds === false) {
        return <Loading/>
    }
    return (
        <div className={"course d-flex flex-column gap-3"}>
            <h1 className={"course__title"}>{course.title}</h1>
            <div className={"course__description"}>{course.description}</div>
            <div className={"course__lessons"}>
                {lessons.map((lesson) => (
                    <LessonLine lesson={lesson} completed={lessonCompleteds.find((l) => l.lesson === lesson.id)}/>
                ))}
            </div>
        </div>


    )
}
export default Course;