import React, { Component, useEffect , useState } from 'react';
import {Button , Input } from 'antd';
import axios from 'axios';
import { getDefaultNormalizer } from '@testing-library/react';




const CompA = () => {
    const [data, setdata] = useState([])
    const [title, setTitle] = useState()
    const [Items, setItems] = useState([])
    const [btn, setBtn] = useState(true)
    const [updateId, setUpdateId] = useState()

    const baseUrl = 'http://127.0.0.1:8000/'

    useEffect(() => {
        getData()
    }
    , [])
    const clickIt= async ()=>{
        await axios.get(baseUrl).then((res)=>{
            setItems([res.data])
        })  
    }

    const getData = async () =>{
        await axios.get(baseUrl).then((result)=>{
            setItems(result.data)
        })                
    }
    const delTask =(id)=>{
        console.log(id)
       async function work(){
           await  axios.delete(baseUrl+id).then((res)=>{
              getData()
           })
       }
       work()
       
      
    }
    const UpdateTask =(id)=>{
        Items.forEach((element)=>{
            if(element.id == id){
            setTitle(element.title)
            setBtn(false)
            setUpdateId(id)
            }
        })
    }

    const update=()=>{
        async function updateTitle(){
            await  axios.put(baseUrl+updateId+'/' ,  {
                title : title
            }).then((res)=>{
                setItems([...Items])
                getData()
            })
    }
    updateTitle()
    setBtn(true)
    setTitle('')
}

    const submit=()=>{
        axios.post(baseUrl, {
            title : title,
            complete:false
          }).then((res)=>{
              setItems([res.data, ...Items ])
          })
    }
    
    return ( 
        <>
        <button onClick={clickIt}>Click it</button>
        

<Input lablel="Title" name="title" value={title} onChange={(e)=>{setTitle(e.target.value)}} placeholder='Enter Title'/>

{btn ? <Button onClick={submit}>+</Button> : <Button onClick={update}>U</Button>}
<ul>
{Items.map((itemVal) => {
          return (
            <div key={itemVal.id}>
            <li  id={title}> {itemVal.title}
              <Button onClick={() => delTask(itemVal.id)}>D</Button> 
             <Button onClick={() => UpdateTask(itemVal.id)}>U</Button>
            </li>
            </div>
          )
        })}
</ul>

        </>
     );
}
 
export default CompA;