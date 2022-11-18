import TableItem from "./TableItem";
import style from "./Table.module.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(style);

function Table({ info, onSubmitUserInfo }) {

    const listItems = Object.entries(info).map((item) => 
        (<TableItem key={item[0]} data={item}></TableItem>)
    );

    return (
        <div className={cx('wrapper')}>
            <table className={cx('table-container')}><tbody>{listItems}</tbody></table>
            <button onClick={onSubmitUserInfo}>Update</button>
        </div>
    );
}
export default Table;
