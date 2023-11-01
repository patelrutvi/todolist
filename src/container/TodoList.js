
import React, { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import TodoForm from './TodoForm';
import { Button, IconButton, Switch } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';



export default function TodoList() {
    const [data, setData] = useState([]);
    const [open, setOpen] = useState(false);
    const [update, setupdate] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    const gettodo = () => {
        let localData = JSON.parse(localStorage.getItem("todo"));
        if (localData) {
            setData(localData)
        }
    }

    useEffect(() => {
        gettodo();
    }, [])

    const addtodo = (data) => {
        console.log(data, "add data");

        let localData = JSON.parse(localStorage.getItem("todo"));
        let id = Math.floor(Math.random() * 1000)
        if (localData) {
            localData.push({ ...data, id })
            localStorage.setItem("todo", JSON.stringify(localData))
        } else {
            localStorage.setItem("todo", JSON.stringify([{ ...data, id }]))
        }
    }
    const handleUpdate = (data) => {
        let localData  = JSON.parse(localStorage.getItem("todo"))
        let udata = localData.map((v) => {
            if(v.id === data.id){
                return  data
            }else{
                return v
            }
        })

        localStorage.setItem("todo" , JSON.stringify(udata))
        setData(udata);
    }
    const handleFormSubmit = (data) => {
        if(update){
            handleUpdate(data)
        }else{
            addtodo(data)
        }
       setupdate(false)
        gettodo();
    }

   
    const handleToggle = (id, status) => {
        console.log(id, status, "status,id");
        let localData = JSON.parse(localStorage.getItem("todo"))

        let tdata = localData.map((v) => {
            if (v.id === id) {
                return { ...v, status: !status }
            } else {
                return v
            }
        })
        console.log(tdata, "tdata");
        localStorage.setItem("todo", JSON.stringify(tdata))
        setData(tdata);
    }
    const handleEdit = (data) => {
        console.log(data, "edit");
        setupdate(data)
    }
    const handleDelete = (id) => {
        console.log(id, 'delete data');

        let localData = JSON.parse(localStorage.getItem("todo"));

        let dtodo = localData.filter((v) => v.id !== id);

        localStorage.setItem("todo", JSON.stringify(dtodo))

        setData(dtodo);
    }

    const columns = [
        { field: 'title', headerName: 'Title', width: 130 },
        {
            field: 'status',
            headerName: 'Status',
            width: 130,
            renderCell: (params) => {
                console.log(params.row.status, "status");
                return (
                    <Switch
                        id="status"
                        name='status'
                        checked={params.row.status}
                        onChange={() => handleToggle(params.row.id, params.row.status)}
                    />
                )
            }
        },
        {
            field: 'action', headerName: 'Action', width: 130,
            renderCell: (params) => {
                return (
                    <>
                        <IconButton aria-label="edit" onClick={() => handleEdit(params.row)}>
                            <EditIcon />
                        </IconButton>
                        <IconButton aria-label="delete" onClick={() => handleDelete(params.row.id)}>
                            <DeleteIcon />
                        </IconButton>
                    </>
                )
            }
        }

    ];

    return (
        <>
            <TodoForm
                onHandleSubmit={handleFormSubmit}
                updateData={update}
                handleClose1={handleClose}
                open={open}
                handleClickOpen1={handleClickOpen} />
            <Button variant="outlined" onClick={handleClickOpen} style={{ margin: '30px' }}>
                ADD TODO
            </Button>
            <div style={{ height: 400, width: '100%' }}>
                <DataGrid
                    rows={data}
                    columns={columns}
                    initialState={{
                        pagination: {
                            paginationModel: { page: 0, pageSize: 5 },
                        },
                    }}
                    pageSizeOptions={[5, 10]}

                />
            </div>
        </>
    );

}

