import React, { useContext, useEffect, useState } from 'react'
import { ConfigContext } from '../../../../Context/ConfigContext';
import axios from 'axios';
import { DateFormater, NoRecords, TableRows } from '../../../../Components/GLobal';
import { Link } from 'react-router-dom';

const StudentUpcomingExam = () => {

    const { apiURL, apiHeaderJson, student_id } = useContext(ConfigContext);
    const headers = apiHeaderJson;
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState([]);



    const GetExamDetails = async () => {
        try {
            const response = await axios.get(`${apiURL}Students/GetUpcomingExam`, { headers })

            if (response?.data?.success) {
                const data = response?.data?.data;
                setData(data)
            }
        } catch (error) {
            console.log("error", error);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        GetExamDetails()
    }, [student_id])

    return (
        <div className='card'>
            <div className="card-header">
                <h5 className='card-title mb-0'>Exam</h5>
            </div>
            <div className="card-body">

                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>Exam Date</th>
                            <th>Program Name</th>
                            <th>Subjects Title</th>
                            <th>Program Duration</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    {
                        <tbody>
                            {
                                loading ?
                                    <TableRows colSpan={10} rows={10} />
                                    : data?.length > 0 ?
                                        data?.map((item) => {
                                            return (
                                                <tr key={item?.student_id}>
                                                    <td className='text-dark fw-bold'>{DateFormater(item?.exam_date)}</td>
                                                    <td className='text-success fw-bold'>{item?.program_title}</td>
                                                    <td className='text-primary fw-bold'>{item?.subject_title}</td>
                                                    <td>{item?.program_duration} Days</td>
                                                    <td>
                                                        <Link to={`/Student/StartExam/${item?.master_subject_id}`}>
                                                            <button className='btn btn-primary btn-sm'>
                                                                Start
                                                            </button>
                                                        </Link>
                                                    </td>
                                                </tr>
                                            )
                                        })
                                        :
                                        <NoRecords />
                            }
                        </tbody>
                    }
                </table>

            </div>
        </div>
    )
}

export default StudentUpcomingExam