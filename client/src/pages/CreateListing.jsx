import React from 'react'

export default function CreateListing() {
  return (
    <main className='max-w-4xl mx-auto p-3'>
        <h1 className='text-center font-semibold my-7 text-3xl'>
            Create a Listing
        </h1>

        <form className='flex flex-col sm:flex-row gap-4'>
            <div className='flex flex-col gap-4 flex-1'>
                <input 
                    type='text' 
                    id='name' 
                    maxLength='62' 
                    minLength='10' 
                    placeholder='Name'
                    className='border p-3 rounded-lg'
                    required 
                />

                <textarea  
                    id="description"  
                    className='border p-3 rounded-lg'
                    placeholder='Description'
                    required
                />

                <input 
                    type='text'
                    id='address'
                    placeholder='Address'
                    required
                    className='border p-3 rounded-lg'
                />

                <div className='flex gap-6 flex-wrap'>
                    <div className='flex gap-2'>
                        <input type='checkbox' id='sale' className='w-5' />
                        <span>Sell</span>
                    </div>

                    <div className='flex gap-2'>
                        <input type='checkbox' id='rent' className='w-5' />
                        <span>Rent</span>
                    </div>

                    <div className='flex gap-2'>
                        <input type='checkbox' id='parking' className='w-5' />
                        <span>Parking spot</span>
                    </div>

                    <div className='flex gap-2'>
                        <input type='checkbox' id='furnished' className='w-5' />
                        <span>Furnished</span>
                    </div>

                    <div className='flex gap-2'>
                        <input type='checkbox' id='offer' className='w-5' />
                        <span>Offer</span>
                    </div>
                </div>

                <div className='flex gap-6 flex-wrap'>
                    <div className='flex gap-2 items-center'>
                        <input type='number' id='bedrooms' min='1' max='10' required className='p-3 border border-gray-300 rounded-lg'  />
                        <p>beds</p>
                    </div>

                    <div className='flex gap-2 items-center'>
                        <input type='number' id='bathrooms' min='1' max='10' required className='p-3 border border-gray-300 rounded-lg'  />
                        <p>Baths</p>
                    </div>

                    <div className='flex gap-2 items-center'>
                        <input type='number' id='regularPrice' min='1' max='10' required className='p-3 border border-gray-300 rounded-lg'  />
                        <div className='flex flex-col items-center'>
                            <p>Regular price</p>
                            <span>
                                ($ / Month)
                            </span>
                        </div>
                    </div>

                    <div className='flex gap-2 items-center'>
                        <input type='number' id='discountPrice' min='1' max='10' required className='p-3 border border-gray-300 rounded-lg'  />
                        <div className='flex flex-col items-center'>
                            <p>Discounted price</p>
                            <span>
                                ($ / Month)
                            </span>
                        </div>
                    </div>
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
                    />

                    <button 
                    className='p-3 text-green-700 border border-green-700 uppercase rounded hover:shadow-lg disabled:opacity-80'>
                        Upload
                    </button>
                </div>

                <button className='p-3 text-white bg-slate-700 uppercase rounded-lg hover:opacity-95 disabled:opacity-80'>
                    Create Listing
                </button>
            </div>
            
        </form>
    </main>
  )
}
