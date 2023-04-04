import axios from 'axios';
import React, { useEffect, useState } from 'react'

export default function UserDetails() {
    const [useDetails, setUerDetails] = useState<any>(null)
    const [isloding, setLoading] = useState<boolean>(true)
    const [isRefresh, setRefresh] = useState<boolean>(false)
    const getUsers = async () => {
        let res = await axios.get("https://randomuser.me/api");
        const { results, info } = res.data;
        setUerDetails(results[0])
        localStorage.setItem("randomuser", JSON.stringify(results[0]))
    };

    useEffect(() => {
        getUsers()
        setLoading(false)

    }, [])

    useEffect(() => {
        if (isRefresh) {
            getUsers()
            setLoading(false)
            setRefresh(false)
        }
    }, [isRefresh])

    const handleRefresher = () => {
        setRefresh(true)
        setLoading(true)
    }



    return (
        <div className="center-container">
            {!isloding ?
                <div style={{ padding: "10px" }}>
                    <div className="title">Name</div>
                    <div style={{ fontSize: "25px", fontWeight: "bold" }}>{`${useDetails?.name?.title} ${useDetails?.name?.first} ${useDetails?.name?.last}`}</div>
                    <div className="title">Email</div>
                    <div style={{ fontSize: "25px", fontWeight: "bold" }}>{` ${useDetails?.email}`}</div>
                </div> :
                <div>Fetching Data.....</div>}
            <button onClick={handleRefresher}>
                Refresh
            </button>
        </div>
    )
}
