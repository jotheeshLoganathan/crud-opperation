
import React from 'react'

import { FaBackspace } from "react-icons/fa";
import { IoIosCloudDone } from "react-icons/io";
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';

const Menaddcort = () => {
    const handleSubmit =(event) =>{
        event.preventDefault();
        const form = event.target;
        const image = form.image.value;
        const price = form.price.value;
        const title = form.title.value;
        const ds = form.ds.value;
        const quantity = 1;


        if(image === "" || title ==="" || price ==="" || ds === "" ){
            toast.warn("fill all the field");
        }

        const addProdect ={
            image,price,title,ds,quantity
        };
        console.log(addProdect);
        fetch("http://localhost:5000/product",{
            method: "POST",
            headers:{   
                "content-type":"application/json"
            },
            body:JSON.stringify(addProdect)
        })
        .then((res)=>res.json())
        .then((data)=>{
            toast.success("Product Added Successfully")
            form.reset();
            window.location.href ="/Mensadmin"
        });
        
    }
  return (
    <div className='admin_men_edit'>
        <div className='Men-edit'>
            <p className='fs-2'>
                ADD ITEMS
            </p>
            <form className='text-title' onSubmit={ handleSubmit }>
                <label className='text-title-label fs-4' value="title">Title</label><br></br>
                <input className='text-input fs-5' type='text'placeholder='Title' name='title' id='title'></input><br></br>
                <div className='row'>
                <div className='col'>
                    <label className='fs-4'value='price'>price</label><br></br>
                    <input  className='fs-5' type='text'placeholder='price'name='price' id='price'></input><br></br>
                </div>
                </div>
                <label className='text-title-label fs-4' value='image'>Imge url</label><br></br>
                <input className='text-input fs-5' type='url' placeholder='add url'name='image' id='image'></input><br></br>
                <label className='fs-4' value='ds'>
                    Decription
                </label><br></br>
                <textarea className='text-input-textarea fs-5' aria-lable='decription' name='ds'id='ds'></textarea><br></br>
                <button className='btn btn-danger'><Link className="moving-admin" to="/Mensadmin"><FaBackspace />
                Back </Link></button>
                <button className='btn btn-success' type='submit'><IoIosCloudDone />
                Sumit </button>


            </form>
        </div>

    </div>
  )
}

export default Menaddcort
