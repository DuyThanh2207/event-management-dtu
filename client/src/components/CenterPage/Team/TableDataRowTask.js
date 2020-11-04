import React from 'react';
const TableDataRowTask = (props) => {
    return (
        <>
            <tr>
                <th scope="row">{props.order + 1}</th>
                <td>{props.name}</td>
                <td>{props.description}</td>
                <td>{props.staff}</td>
            </tr>
        </>);
}
export default TableDataRowTask;