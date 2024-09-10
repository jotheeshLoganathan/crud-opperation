import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { MdDeleteForever } from "react-icons/md";
import { MdAddToPhotos } from "react-icons/md";
import { toast } from 'react-toastify';

const Mensadmin = () => {
    const [productData,setProductData]= useState([]);

    useEffect(()=>{
        fetch("http://localhost:5000/allproduct")
        .then((res)=>res.json())
        .then((data)=>setProductData(data));
    },[]);  
    const deleteProduct = (id)=>{
        fetch(`http://localhost:5000/product/${id}`,{
            method:"DELETE",
        })
        .then((res)=>res.json())
        .then((data)=>{
            toast.success("Product deleted Successfully");
            setProductData((prevProductData)=>
            prevProductData.filter((item)=>item._id !== id))
        })
    }
  return (
    <div className='admin_display'>
        <div className='man_addon'>
            <button className='btn mens_btn btn-success mr-3'><Link className='additem-btn' to='/Menaddcort'><MdAddToPhotos />
            ADD ITEMS</Link></button>
            <table className='table table-bordered'>
                <thead> 
                    <th>image</th>
                    <th>title</th>
                    <th>price</th>
                    <th>discription</th>
                    <th>Delete</th>
                </thead>
                <tbody>
                    {productData.map((item)=>(
                    <tr key={item._id}>
                        <td className='data-from-post'>
                            <img className='postimage' src={item.image} alt='img'/></td>
                        <td>{item.title}</td>
                        <td>{item.price}</td>
                        <td>{item.ds}</td>
                        <td>
                            <button className='btn btn-danger'onClick={()=>{deleteProduct(item._id)}}><MdDeleteForever />
                                Delete
                            </button>
                        </td>
                    </tr>
                    ))}
                </tbody>

            </table>
        </div>


    </div>
  )
}

export default Mensadmin