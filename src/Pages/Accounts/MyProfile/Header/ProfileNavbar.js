import React, { useContext, useEffect, useState } from 'react'
import { ConfigContext } from '../../../../Context/ConfigContext'
import axios from 'axios';
import images from '../../../../Utils/Images';

const ProfileNavbar = () => {

    const { apiURL, apiHeaderJson, student_id } = useContext(ConfigContext);
    const headers = apiHeaderJson;

    const [info, setInfo] = useState({});

    const GetStudentsProfile = async () => {
        try {
            const response = await axios.get(`${apiURL}Students/GetStudentsProfile`, { params: { student_id }, headers })

            const { data, success } = response?.data

            if (success) {
                setInfo(data[0])
            } else {
                console.error("error")
            }
        } catch (error) {
            console.log("error", error)
        }
    }

    useEffect(() => {
        if (student_id) {
            GetStudentsProfile()
        }
    }, [student_id])

    return (
        <>
            <div className="profile-foreground position-relative mx-n4 mt-n4">
                <div className="profile-wid-bg">
                    <img src={images?.banner_bg} alt className="profile-wid-img" />
                </div>
            </div>
            <div className="pt-4 mb-4 mb-lg-3 pb-lg-4 profile-wrapper">
                <div className="row g-4">
                    <div className="col-auto">
                        <div className="avatar-lg">
                            <img
                                src={info?.student_profile_url ? info?.student_profile_url : images?.user_profile}
                                alt="user-img"
                                className="img-thumbnail rounded-circle"
                            />
                        </div>
                    </div>
                    {/*end col*/}
                    <div className="col">
                        <div className="p-2">
                            <h3 className="text-white mb-1">{info?.student_full_name}</h3>
                            <p className="text-white text-opacity-75">{info?.student_pnr}</p>
                        </div>
                    </div>
                </div>
                {/*end row*/}
            </div>
        </>
    )
}

export default ProfileNavbar