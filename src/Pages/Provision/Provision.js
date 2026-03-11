import React, { useContext, useEffect, useState } from 'react'
import PageTitle from '../../Components/PageTitle'
import { ConfigContext } from '../../Context/ConfigContext';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const Provision = () => {


  const [data, setData] = useState([]);

  const { apiURL, apiHeaderJson, primaryColor } = useContext(ConfigContext);
  const headers = apiHeaderJson;

  const GetProvision = async () => {
    try {
      const response = await axios.get(`${apiURL}Students/GetProvisionExams`, { params: { page: 1, limit: 10 }, headers })
      setData(response.data.data)
    } catch (error) {
      console.log('error', error);
    }
  }

  useEffect(() => {
    GetProvision();
  }, [])

  return (
    <div className="main-content">
      <div className="page-content">
        <div className="container-fluid">
          <div className='row'>
            <div className='col-md-12'>
              <br />
              <PageTitle title={"Provision Report"} primary={"Dashboard"} />

              <div className="card">
                <div className="card-header text-center" style={{ background: primaryColor }}>
                  <h5 className='card-title mb-0 text-white'>Provision</h5>
                </div>
                <div className="card-body">
                  <div className='table-responsive table-card'>
                    <table className="table table-striped table-bordered table-nowrap m-0">
                      <thead className='table-light'>
                        <tr>
                          {/* <th>Enrolled Number</th> */}
                          <th>#</th>
                          <th>Exam Date</th>
                          <th>Program Title</th>
                          <th>Course Title</th>
                          <th>Subject Title</th>
                          <th>Total Marks</th>
                          <th>Marks Obtained</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {
                          data.map((item, i) => {
                            return (
                              <tr>
                                {/* <td className='fw-bold'>{item.student_program_id}</td> */}
                                <td>{i + 1}</td>
                                <td>{item.exam_date || "-"}</td>
                                <td>{item.program_title}</td>
                                <td>{item.course_title}</td>
                                <td>{item.subject_title}</td>
                                <td>{item.total_marks}</td>
                                <td className='fw-bold'>{item.obtain_marks}</td>
                                <td className='text-center'>
                                  <Link to={`/Provision/Result/${item?.student_subject_id}`}>
                                    <button className='btn btn-icon btn-sm btn-soft-success'>
                                      <i class="fa-regular fa-eye"></i>
                                    </button>
                                  </Link>
                                </td>
                              </tr>
                            )
                          })
                        }
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Provision;