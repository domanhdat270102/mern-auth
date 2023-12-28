import { useState } from 'react'
import {getDownloadURL, getStorage, ref, uploadBytesResumable} from 'firebase/storage'
import { app } from '../firebase'
import {useSelector} from 'react-redux'
import {useNavigate} from 'react-router-dom'

export default function CreateListing() {
    const [files, setFiles] = useState([])
    const navigate = useNavigate()
    const {currentUser} = useSelector(state => state.user)
    const [formData, setFormData] = useState({
        imageUrls: [],
        name: '',
        description: '',
        address: '',
        regularPrice: 50,        
        discountPrice: 0,
        bathrooms: 1,
        bedrooms: 1,
        furnished: false,        
        parking: false,    
        type: 'rent',
        offer: false,   
    })
    const [imageUploadError, setImageUploadError] = useState(false)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)
    const [uploading, setUploading] = useState(false)
    console.log(formData);
    const handleImageSubmit = () => {
       if (files.length > 0 && files.length + formData.imageUrls.length < 7) {
        setUploading(true)
        const promises = [];

        for (let i = 0; i < files.length; i++) {
            promises.push(storeImage(files[i]));
        }

        Promise.all(promises).then((urls) => {
            console.log(urls);
            setFormData({...formData, imageUrls: formData.imageUrls.concat(urls)});
            setImageUploadError(false)
            setUploading(false)
        })
        .catch (() => {
            setImageUploadError('Image upload failed:(2 mb max per image)')
            setUploading(false)
        });
       } else {
        setImageUploadError('You can only upload 6 images per listing')
       }
    }

    const handleRemoveImage = (index) => {
        setFormData({
            ...formData,
            imageUrls: formData.imageUrls.filter((_, i) => i !== index)
        })
    }

    const storeImage = async (file) => {
        return new Promise((resolve, reject) => {
            const storage = getStorage(app)
            const filename = new Date().getTime() + file.name
            const storageRef = ref(storage, filename)
            const uploadTask = uploadBytesResumable(storageRef, file)
            uploadTask.on(
                'state_changed',
                (snapshot) => {
                    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                    console.log(`Upload is ${progress}% done`);
                },
                (error) => {
                    reject(error)
                },
                () => {
                    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                        resolve(downloadURL)
                    })
                }
            )
        })
    }

    const handleChange = (e) => {
        if (e.target.id === 'sale' || e.target.id === 'rent') {
            setFormData({
                ...formData,
                type: e.target.id
            })
        }

        if (e.target.id === 'furnished' || e.target.id === 'parking' || e.target.id === 'offer') {
            setFormData({
                ...formData,
                [e.target.id]: e.target.checked
            })
        }

        if (e.target.type === 'number' || e.target.type === 'text' || e.target.type === 'textarea') {
            setFormData({
                ...formData,
                [e.target.id]: e.target.value
            })
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            if(formData.imageUrls.length < 1 ) return setError('You must upload at least one image')
            if(+formData.regularPrice < +formData.discountPrice) return setError('Discount price must be lower than regular price')
            setLoading(true);
            setError(false)
            const res = await fetch('/api/listing/create', {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify({
                    ...formData,
                    useRef: currentUser._id
                })
            })

            const data = await res.json()
            setLoading(false)
            if (data.success === false) {
                setError(data.message)
                return;
            }
            navigate(`/listing/${data._id}`)
        } catch (error) {
            setError(error.message)
            setLoading(false)
        }
    }
  return (
    <main className='max-w-4xl mx-auto p-3'>
        <h1 className='text-center font-semibold my-7 text-3xl'>
            Create a Listing
        </h1>

        <form onSubmit = {handleSubmit} className='flex flex-col sm:flex-row gap-4'>
            <div className='flex flex-col gap-4 flex-1'>
                <input 
                    type='text' 
                    id='name' 
                    maxLength='62' 
                    minLength='10' 
                    placeholder='Name'
                    className='border p-3 rounded-lg'
                    required
                    value={formData.name}
                    onChange={handleChange} 
                />

                <textarea  
                    id="description"  
                    className='border p-3 rounded-lg'
                    placeholder='Description'
                    required
                    value={formData.description}
                    onChange={handleChange}
                />

                <input 
                    type='text'
                    id='address'
                    placeholder='Address'
                    required
                    className='border p-3 rounded-lg'
                    value={formData.address}
                    onChange={handleChange}
                />

                <div className='flex gap-6 flex-wrap'>
                    <div className='flex gap-2'>
                        <input 
                            type='checkbox' 
                            id='sale' 
                            className='w-5'
                            checked={formData.type === 'sale'}
                            onChange={handleChange}
                        />
                        <span>Sell</span>
                    </div>

                    <div className='flex gap-2'>
                        <input 
                            type='checkbox' 
                            id='rent' 
                            className='w-5' 
                            checked={formData.type === 'rent'}
                            onChange={handleChange}
                        />
                        <span>Rent</span>
                    </div>

                    <div className='flex gap-2'>
                        <input 
                            type='checkbox' 
                            id='parking' 
                            className='w-5'
                            checked={formData.parking}
                            onChange={handleChange} 
                        />
                        <span>Parking spot</span>
                    </div>

                    <div className='flex gap-2'>
                        <input
                            type='checkbox' 
                            id='furnished' 
                            className='w-5'
                            onChange={handleChange}
                            checked={formData.furnished}
                        />
                        <span>Furnished</span>
                    </div>

                    <div className='flex gap-2'>
                        <input 
                            type='checkbox' 
                            id='offer' 
                            className='w-5'
                            checked={formData.offer}
                            onChange={handleChange}
                        />
                        <span>Offer</span>
                    </div>
                </div>

                <div className='flex gap-6 flex-wrap'>
                    <div className='flex gap-2 items-center'>
                        <input 
                            type='number' 
                            id='bedrooms' 
                            min='1' 
                            max='10' 
                            required 
                            className='p-3 border border-gray-300 rounded-lg'
                            value={formData.bedrooms}
                            onChange={handleChange}  
                        />
                        <p>beds</p>
                    </div>

                    <div className='flex gap-2 items-center'>
                        <input 
                            type='number' 
                            id='bathrooms' 
                            min='1' 
                            max='10' 
                            required 
                            className='p-3 border border-gray-300 rounded-lg'
                            value={formData.bathrooms}
                            onChange={handleChange}  
                        />
                        <p>Baths</p>
                    </div>

                    <div className='flex gap-2 items-center'>
                        <input 
                            type='number' 
                            id='regularPrice' 
                            min='50' 
                            max='1000000' 
                            required 
                            className='p-3 border border-gray-300 rounded-lg'
                            onChange={handleChange}
                            value={formData.regularPrice}  
                        />
                        <div className='flex flex-col items-center'>
                            <p>Regular price</p>
                            <span>
                                ($ / Month)
                            </span>
                        </div>
                    </div>

                    {formData.offer && (
                        <div className='flex gap-2 items-center'>
                        <input 
                            type='number' 
                            id='discountPrice' 
                            min='0' 
                            max='1000000' 
                            required 
                            className='p-3 border border-gray-300 rounded-lg'
                            value={formData.discountPrice}
                            onChange={handleChange}  
                        />
                        <div className='flex flex-col items-center'>
                            <p>Discounted price</p>
                            <span>
                                ($ / Month)
                            </span>
                        </div>
                    </div>
                    )}
                </div>
            </div>

            <div className='flex flex-col flex-1 gap-4'>
                <p className='font-semibold'>
                    Images: <span className='font-normal text-gray-600 ml-2'>The first image will be the cover (max 6) </span>
                </p>

                <div className='flex gap-4'>
                    <input 
                        type='file'
                        id='images'
                        accept='image/*'
                        multiple
                        className='p-3 border border-gray-300 rounded w-full'
                        onChange={(e) => setFiles(e.target.files)}
                    />

                    <button 
                        className='p-3 text-green-700 border border-green-700 uppercase rounded hover:shadow-lg disabled:opacity-80'
                        onClick={handleImageSubmit}
                        type='button'
                        disabled={uploading}
                    >
                        {uploading ? 'Loading...' : 'Upload'}
                    </button>

                </div>
                    <p className='text-red-700 text-sm'>
                        {imageUploadError && imageUploadError}
                    </p>

                    {formData.imageUrls.length > 0 
                    && 
                    formData.imageUrls.map((url, index) => (
                        <div className='flex justify-between p-3 border items-center' key={url}>
                            <img loading='lazy' src={url} className='w-20 h-20 object-contain rounded-xl'/>
                            <button type='button' onClick={() => handleRemoveImage(index)} className='p-3 uppercase text-red-700 rounded-lg hover:opacity-95'>
                                Delete
                            </button>
                        </div>
                    ))}

                <button disabled={loading || uploading } className='p-3 text-white bg-slate-700 uppercase rounded-lg hover:opacity-95 disabled:opacity-80'>
                   {loading ? 'Creating...' : 'Create listing'}
                </button>

                {error && <p className='text-red-700 text-sm'>{error}</p>}
            </div>
            
        </form>
    </main>
  )
}
