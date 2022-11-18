import classNames from "classnames/bind";
import style from "./TableItem.module.scss";
import { useContext } from "react";
import { UserContext } from "../../../pages/Profile";
const cx = classNames.bind(style);

function TableItem({data}) {
    const userInfo = useContext(UserContext);
    // const rowItems = data.map((item) => {for (let [key, value] of Object.entries(data)) {
    //     <td key={key}>{value}</td>;
    // }})

    //return <tr className={cx('table-element')}>{rowItems}</tr>
    return <tr className={cx('row-element')}>
        <td className={cx('key-col')}>{data[0]}</td>
        <td className={cx('value-col')}><input type='text' defaultValue={data[1]} onChange={(event) => {
            console.log(event.target.value);
            let newUserInfo = userInfo[0];
            newUserInfo[data[0]] = event.target.value;
            userInfo[1](newUserInfo);
        }}></input></td>
    </tr>
}

export default TableItem;