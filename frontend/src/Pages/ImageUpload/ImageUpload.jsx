import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {getImage,createImage, reset} from '../../features/imageSlice'

const ImageUpload = () => {
  const {url}  =  useSelector((store)=>store.img)
  console.log(url,"URL")
    const dispatch = useDispatch()
    const [data, setdata] = useState({
        name:'',
        description:'',
        image:''
    })


    // const {name, discription,image} = data
    const onChange =(e)=>{
        setdata({
            ...data,
            [e.target.name]:e.target.value})
    }

    const onSubmit =(e)=>{
        console.log(data.image,"sssdsd")
        e.preventDefault()
        const config = {
            header:{
              'content-type': 'multipart/form-data'
    
            }
          }
          if(data.name!=="" || data.description!=="" || data.description!==""){
            const formData = new FormData()
            formData.append('name', data.name)
            formData.append('description', data.description)
            formData.append('image', data.image)
        dispatch(createImage({formData,config}))
          }else{
            console.log("Provide data first")
          }
    

       
    }
        
          


    
    const {name,description,image} = data
  return (
    <section>
        <form onSubmit={onSubmit}>
            <div className='form-group'>
                <input type='text' id='name' name='name' value={name} placeholder='Enter your name' onChange={onChange}/>
                <input type='text' id='description' name='description' value={description} placeholder='Enter description' onChange={onChange}/>
                <input type="file" id="image" accept="image/*" name="image"  onChange={(e)=>setdata({...data,["image"]:e.target.files[0]})}/>
                <button className='btn btn-block' type='submit'>Submit</button>
            </div>
            <img src={url} alt="" />
        </form>
    </section>
  )
}
export default ImageUpload
