import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AllHomes from './all_home';

const UserListComponent = () => {
    const [selectedOption, setSelectedOption] = useState("");
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const handleChange = (event) => {
        setSelectedOption(event.target.value);
    };


    const apiCall = async () => {
        try {
            const response = await axios.get(`/api/user/find-all`);
            console.log("response", response)
            if (!response.statusText) {
                throw new Error(`Network response was not ok: ${response.statusText}`);
            }
            setUsers(response.data.data)
            setLoading(false);
            return response
        } catch (error) {
            setLoading(false);
            setError(error);
        }
    };
    

    useEffect(() => {
        apiCall();
    }, []);


    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div>
            <h2>Select Users</h2>
            <select value={selectedOption} onChange={handleChange}>
                <option value="">Select a Users</option>
                {users.map((item) => (
                    <option key={item.user_id} value={item.user_id}>
                        {item.username}
                    </option>
                ))}
            </select>
            <AllHomes data={selectedOption}/>
        </div>
    );
};

export default UserListComponent;
