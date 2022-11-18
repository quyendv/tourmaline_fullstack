import { useState, useEffect, createContext } from "react";
import Table from "../../components/Table";

const UserContext = createContext();

function Profile() {
    const [userInfo, setUserInfo] = useState({});

    useEffect(() => {
        getUserInfo();
    }, []);

    const updateUserInfo = async () => {
        // TODO: update user info in database through API
		console.log(userInfo);
    };

    const getUserInfo = async () => {
        // Fetch API to get account information: username, email, password (?), phone number, address. (JSON)
        // Hardcode for now
        const response = {
            username: "admin",
            email: "admin@tourmaline.com",
            phone: "0123456789",
            address: "123, ABC Street, XYZ City, 12345",
        };
        setUserInfo(response);
    };

    return (
        <UserContext.Provider value={[userInfo, setUserInfo]}>
            <Table info={userInfo} onSubmitUserInfo={updateUserInfo} itemsData={Object.entries(userInfo)}></Table>
        </UserContext.Provider>
    );
}
export {Profile, UserContext};

