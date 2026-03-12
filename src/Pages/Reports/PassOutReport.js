import React, { useContext, useEffect, useState } from 'react';
import PageTitle from '../../Components/PageTitle';
import { ConfigContext } from '../../Context/ConfigContext';
import axios from 'axios';
import { TableFooter } from '../../Components/TableFooter';
import { NoRecords, TableRows } from '../../Components/GLobal';

const PassOutReport = () => {

    const { apiURL, apiHeaderJson, student_id, primaryColor } = useContext(ConfigContext);
    const headers = apiHeaderJson;

    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    const [next, setNext] = useState(false);
    const [prev, setPrev] = useState(false);
    const [page, setPage] = useState(1)
    const [limit] = useState(10)
    const [total_pages, settotal_pages] = useState(0)
    const [totalRecords, setTotalRecords] = useState(0);

    const GetStudentsProfile = async () => {
        try {
            setLoading(true);
            const response = await axios.get(`${apiURL}Students/GetPassOutSubjects`, { params: { page: 1, limit: 10, student_id }, headers });

            if (response?.data?.success) {
                const data = response?.data;
                setData(data?.data);
                setNext(data?.next)
                setPage(data?.page)
                setPrev(data?.prev)
                setTotalRecords(data?.total_records)
                settotal_pages(data?.total_pages)
            }
        } catch (error) {
            console.log('error', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (student_id) GetStudentsProfile();
    }, [student_id]);

    return (
        <div className="main-content">
            <div className="page-content">
                <div className="container-fluid">
                    <br />
                    <PageTitle title={"Passout Report"} primary={"Dashboard"} />

                    <div className="card">
                        <div className="card-header text-center" style={{ background: primaryColor }}>
                            <h5 className='card-title mb-0 text-white'>Pass Out Subjects</h5>
                        </div>

                        <div className="card-body">
                            <div className='table-responsive table-card'>
                                <table className="table table-striped table-bordered table-nowrap m-0">
                                    <thead className='table-light'>
                                        <tr>
                                            <th>#</th>
                                            {/* <th>Enrolled Number</th> */}
                                            <th>Franchise Name</th>
                                            <th>Program Name</th>
                                            <th>Course Name</th>
                                            <th>Subject Name</th>
                                            <th>Subject Obtaining Marks</th>
                                            <th>Status</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            loading ?
                                                <TableRows rows={limit} colSpan={10} />
                                                :
                                                data?.length > 0 ?
                                                    data?.map((item, i) => {
                                                        return (
                                                            <tr>
                                                                <td className='fw-bold'>{i + 1}</td>
                                                                {/* <td className='text-success fw-bold'>{item?.student_program_id}</td> */}
                                                                <td className='fw-bold'>
                                                                    {item?.franchise_name}
                                                                </td>
                                                                <td className='fw-bold'>
                                                                    {item?.program_title}
                                                                </td>
                                                                <td className='fw-bold'>
                                                                    {item?.course_title}
                                                                </td>
                                                                <td className='fw-bold'>
                                                                    {item?.subject_title}
                                                                </td>
                                                                <td className='text-success fw-bold'>{item?.obtain_marks}</td>
                                                                <td>
                                                                    {
                                                                        item?.exam_status === 2 &&
                                                                        <span className='badge bg-success text-uppercase'>Pass</span>
                                                                    }
                                                                </td>
                                                            </tr>
                                                        )
                                                    })
                                                    :
                                                    <NoRecords />
                                        }
                                    </tbody>
                                    <TableFooter
                                        prev={prev}
                                        loading={loading}
                                        totalRecords={totalRecords}
                                        total_pages={total_pages}
                                        page={page}
                                        next={next}
                                        setPage={setPage}
                                    />
                                </table>
                            </div>
                        </div>

                    </div>

                </div>
            </div>
        </div>
    )
}

export default PassOutReport
