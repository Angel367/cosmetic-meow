import React from "react";
import OrderLine from "./CourseLine";
import axiosService from "../../requests/axiosService";
import CourseLine from "./CourseLine";

const MyCourses = () => {
    const [myCourses, setMyCourses] = React.useState(undefined);
    const [courses, setCourses] = React.useState(undefined);
    React.useEffect(() => {
        const fetchMyCourses = async () => {
            const response = await axiosService('course-purchases/');
            setMyCourses(response.data?.results);
        }
        fetchMyCourses();
    }, []);
    React.useEffect(() => {
        const fetchCourses = async () => {
            const response = await axiosService('courses/');
            setCourses(response.data?.results);
        }
        fetchCourses();
    }, []);
    if (myCourses === undefined || courses === undefined) {
        return <div>Loading...</div>;
    }
    return (<div className="orders container mt-5">
        <h1 className="mb-4">My Courses</h1>
        <div className="orders__container row">
            <div className="col-md-12 mb-3">
                {/*<OrderLine order={{id: 'ID', status: 'Status', updated_at: 'Updated at'}}/>*/}
            </div>
            {myCourses.map((course) => (
                <div key={course.id} className="col-md-12 mb-3">
                    <CourseLine course={courses.find((c) => course.course === c.id)} />
                </div>
            ))}
        </div>
    </div>);

}
export default MyCourses;