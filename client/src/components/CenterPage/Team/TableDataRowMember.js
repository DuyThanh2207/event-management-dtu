import React from 'react';
const TableDataRowMember = (props) => {
    // const getEditInfo = () => {
    //     props.getEditData(props.value)
    //     props.changeEditStatus()
    // }
    const onClickDelete = () => {
        props.deleteUser(props.id)
    }
    return (
        <>
            <tr>
                <th scope="row">{props.id}</th>
                <td>{props.name}</td>
                <td>{props.email}</td>
                <td>
                <div className="btn-group">                   
                    <div onClick = {() => onClickDelete()} className="btn btn-danger" style={{width: '60px'}}>Delete</div>
                </div>
                </td>
            </tr>
        </>);
}
export default TableDataRowMember;