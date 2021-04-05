import BTable from 'react-bootstrap/Table';
import { useTable } from 'react-table';
import Editable from '../editableText';
import { Button } from 'react-bootstrap';


function Table({columns, data, ...props }) {
  // Use the state and functions returned from useTable to build your UI
  const { getTableProps, headerGroups, rows, prepareRow } = useTable({

    columns,
    data,
  })
  

  const onInputChange = (_id, rowIndex, column) => (event) => {
    //alert(_id + rowIndex + column)
    props.onEdit(_id, rowIndex, column, event.target.value)
  }

  // Render the UI for your table
  return (<BTable striped bordered hover size="sm" {...getTableProps()}>
    <thead>
      {headerGroups.map(headerGroup => (
        <tr {...headerGroup.getHeaderGroupProps()}>
          {headerGroup.headers.map(column => (
            <th {...column.getHeaderProps()}>
              {column.render('Header')}
            </th>
          ))}
          <th>Actions</th>
        </tr>
      ))}
    </thead>
    <tbody>
      {rows.map((row, rowIndex) => {
        const untouchedRow = { ...row } // copy the row before stripping out the _id
        console.log('Before', row)
        prepareRow(row)
        console.log('After', row)
        return (
          <tr key={untouchedRow.original._id} {...row.getRowProps()}>
  
            {row.cells.map((cell, columnIndex) => {
              
              return (

                <Editable {...cell.getCellProps()} onInputChange={onInputChange(untouchedRow.original._id, rowIndex, cell.column.id)}>
                  {cell.value}
                </Editable>
              )
            })}
            <Button onClick={() => props.deleteItem(untouchedRow.original._id)}>Delete</Button>
          </tr>
        )
      })}
    </tbody>
  </BTable>
  )
}

export default Table;