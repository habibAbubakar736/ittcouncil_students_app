import React, { createContext, useState } from "react";

export const ConfigContext = createContext();

export const ConfigProvider = ({ children }) => {
    const [apiURL] = useState("http://69.62.74.27:3300/");

    const [token, setToken] = useState(localStorage.getItem("token"));
    const [student_id, setStudentId] = useState(localStorage.getItem("student_id"));

    const [apiHeaderJson] = useState({ "Content-Type": "application/json", token: `${token}`, student_id: `${student_id}`, "student_id": student_id });
    const [apiHeaderFile] = useState({ "Content-Type": "multipart/form-data", token: `${token}`, student_id: `${student_id}`, "student_id": student_id });

    const primaryColor = "#ec5e1b";

    const handleUpdateLogin = (data) => {
        setToken(data?.token);
        setStudentId(data?.student_id);
        localStorage.setItem("token", data?.token);
        localStorage.setItem("student_id", data?.student_id);
    };


    const LogoutStudent = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("student_id");
        setToken("");
        setStudentId("");
    }


    var vals = {
        apiURL,
        token,
        student_id,
        apiHeaderJson,
        apiHeaderFile,
        handleUpdateLogin,
        LogoutStudent,
        primaryColor,
    };

    return (
        <ConfigContext.Provider value={vals}>
            {children}
        </ConfigContext.Provider>
    );
};
