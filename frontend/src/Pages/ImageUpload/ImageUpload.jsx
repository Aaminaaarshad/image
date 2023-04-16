import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {getImage,createImage, reset} from '../../features/imageSlice'

const ImageUpload = () => {
    const dispatch = useDispatch()
    const [formData, setFormData] = useState({
        name:'',
        description:'',
        image:''
    })

    // const {name, discription,image} = formData
    const onChange =(e)=>{
        setFormData({
            ...formData,
            [e.target.name]:e.target.value})
    }
    console.log(formData,'formdata');

    const onSubmit =(e)=>{
        e.preventDefault()
        const data = new FormData()
        data.append('name', formData.name)
        data.append('description', formData.description)
        data.append('image', formData.image)

        const config = {
            header:{
                'content-type': 'multipart/form-data'
            }
          }

        console.log(formData)
        dispatch(createImage({data,config}))
    }
        
          const {name,description,image} = formData
      


  return (
    <section>
        <form onSubmit={onSubmit}>
            <div className='form-group'>
                <input type='text' id='name' name='name' value={name} placeholder='Enter your name' onChange={onChange}/>
                <input type='text' id='description' name='description' value={description} placeholder='Enter description' onChange={onChange}/>
                <input type="file" id="image" accept="image/*" name="image" onChange={onChange}/>
                <button className='btn btn-block' type='submit'>Submit</button>
            </div>
        </form>
    </section>
  )
}
export default ImageUpload
