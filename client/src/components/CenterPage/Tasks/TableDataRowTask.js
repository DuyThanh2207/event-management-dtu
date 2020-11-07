import React from 'react';
const TableDataRowTask = (props) => {
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
                <th scope="row">{props.order + 1}</th>
                <td>{props.name}</td>
                <td>{props.description}</td>
                <td>{props.deadline}</td>
                <td>{props.status}</td>
                <td>{props.staff}</td>
                <td>
                    <div className="btn-group">
                        <div onClick = {() => getEditInfo()} className="btn btn-warning" style={{width: '60px'}}>Edit</div>
                        <div onClick = {() => onClickDelete()} className="btn btn-danger ml-2" style={{width: '60px'}}>Delete</div>
                    </div>
                </td>
            </tr>
        </>);
}
export default TableDataRowTask;