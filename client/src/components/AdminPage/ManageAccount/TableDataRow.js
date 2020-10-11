import React from 'react';
const TableDataRow = (props) => {
    const getEditInfo = () => {
        props.getEditData(props.value)
        props.changeEditStatus()
    }
    const onClickDelete = () => {
        props.deleteUser(props.id)
    }
    return (
        <>
            <tr>
                <th scope="row">{props.id}</th>
                <td>{props.name}</td>
                <td>{props.username}</td>
                <td>{props.email}</td>
                <td>{props.role}</td>
                <td>
                <div className="btn-group">
                    <div onClick = {() => {getEditInfo()}} className="btn btn-warning" style={{width: '60px'}}>Edit</div>
                    <button onClick = {() => onClickDelete()} type="button" className="btn btn-danger ml-2" style={{width: '60px'}}>Delete</button>
                </div>
                </td>
            </tr>
        </>);
}
export default TableDataRow;