// import { useEffect, useState } from "react"
// import { useNavigate } from "react-router-dom";
// import ListingItem from "../components/ListingItem";

// export default function Search() {
//     const navigate = useNavigate()
//     const [sidebardata, setSidebardata] = useState({
//         searchTerm: '',
//         type: 'all',
//         parking: false,
//         furnished: false,
//         offer: false,
//         sort: 'created_at',
//         order: 'desc'
//     })
//     const [loading, setLoading] = useState(false)
//     const [listings, setListings] = useState([])
//     const [showMore, setShowMore] = useState(false)
//     console.log(listings);
//     useEffect(() => {
//         console.log('a', location.search);
//         const urlParams = new URLSearchParams(location.search)
//         const searchTermFromUrl = urlParams.get('searchTerm')
//         const typeFromUrl = urlParams.get('type')
//         const parkingFromUrl = urlParams.get('parking')
//         const furnishedFromUrl = urlParams.get('furnished')
//         const offerFromUrl = urlParams.get('offer')
//         const sortFromUrl = urlParams.get('sort')
//         const orderFromUrl = urlParams.get('order')
//         if (
//             searchTermFromUrl || typeFromUrl || parkingFromUrl || furnishedFromUrl || offerFromUrl || sortFromUrl || orderFromUrl
//         ) {
//             setSidebardata({
//                 searchTerm: searchTermFromUrl || '',
//                 type: typeFromUrl || 'all',
//                 parking: parkingFromUrl === 'true' ? true : false,
//                 furnished: furnishedFromUrl === 'true' ? true : false,
//                 offer: offerFromUrl === 'true' ? true : false,
//                 sort: sortFromUrl || 'created_at',
//                 order: orderFromUrl || 'desc'
//             })
//         }

//         const fetchListings = async () => {
//             setLoading(true)
//             setShowMore(false)
//             const searchQuery = urlParams.toString();
//             console.log('searchQuery', searchQuery);
//             const res = await fetch(`/api/listing/get?${searchQuery}`)
//             const data = await res.json()
//             if (data.length > 8) {
//                 setShowMore(true)
//             } else {
//                 setShowMore(false)
//             }
//             setListings(data)
//             setLoading(false)
//         }

//         fetchListings()
//     }, [location.search])  

//     const handleChange = (e) => {
//         if (e.target.id === 'all' || e.target.id === 'rent' || e.target.id === 'sale') {
//             setSidebardata({
//                 ...sidebardata,
//                 type: e.target.id
//             })
//         }

//         if (e.target.id === 'searchTerm') {
//             setSidebardata({
//                 ...sidebardata,
//                 searchTerm: e.target.value
//             })
//         }

//         if (e.target.id === 'parking' || e.target.id === 'furnished' || e.target.id === 'offer') {
//             setSidebardata({
//                 ...sidebardata,
//                 [e.target.id]: e.target.checked || e.target.checked === 'true' ? true : false
//             })
//         }

//         if (e.target.id === 'sort_order') {
//             const sort = e.target.value.split('_')[0] || 'created_at'
//             const order = e.target.value.split('_')[1] || 'desc'
//             setSidebardata({
//                 ...sidebardata, sort, order
//             })
//         }
//     }

//     const handleSubmit = (e) => {
//         e.preventDefault()
//         const urlParams = new URLSearchParams()
//         urlParams.set('searchTerm', sidebardata.searchTerm)
//         urlParams.set('type', sidebardata.type)
//         urlParams.set('parking', sidebardata.parking)
//         urlParams.set('furnished', sidebardata.furnished)
//         urlParams.set('offer', sidebardata.offer)
//         urlParams.set('sort', sidebardata.sort)
//         urlParams.set('order', sidebardata.order)
//         const searchQuery = urlParams.toString();
//         navigate(`/search?${searchQuery}`)
//     }

//     const onShowMoreClick = async () => {
//         const numberOfListings = listings.length
//         const startIndex = numberOfListings
//         const urlParams = new URLSearchParams(location.search)
//         urlParams.set('startIndex', startIndex)
//         const searchQuery = urlParams.toString()
//         const res = await fetch(`api/listing/get?${searchQuery}`)
//         const data = await res.json()
//         if (data.length < 9) {
//             setShowMore(false)
//         }
//         setListings([...listings, ...data])
//     }
//   return (
//     <div className="flex flex-col md:flex-row">
//         <div className="p-7 border-b-2 md:border-r-2 md:min-h-screen md:min-w-[400px]">
//             <form onSubmit={handleSubmit} className="flex flex-col gap-8">
//                 <div className="flex items-center gap-2">
//                     <label  htmlFor="searchTerm" className="whitespace-nowrap font-semibold">Search Term</label>
//                     <input
//                         type="text"
//                         placeholder="Search..."
//                         id="searchTerm"
//                         className="p-3 w-full rounded-lg border"
//                         value={sidebardata.searchTerm}
//                         onChange={handleChange}
//                     />
//                 </div>

//                 <div className="flex gap-2 flex-wrap items-center">
//                     <label htmlFor="all" className="font-semibold">Type: </label>
//                     <div className="flex gap-2">
//                         <input onChange={handleChange} checked={sidebardata.type === 'all'} type="checkbox" id="all" className="w-5"/>
//                         <span>Rent & Sale</span>
//                     </div>

//                     <div className="flex gap-2">
//                         <input onChange={handleChange} checked={sidebardata.type === 'rent'} type="checkbox" id="rent" className="w-5"/>
//                         <span>Rent</span>
//                     </div>

//                     <div className="flex gap-2">
//                         <input onChange={handleChange} checked={sidebardata.type === 'sale'} type="checkbox" id="sale" className="w-5"/>
//                         <span>Sale</span>
//                     </div>

//                     <div className="flex gap-2">
//                         <input onChange={handleChange} checked={sidebardata.offer} type="checkbox" id="offer" className="w-5"/>
//                         <span>Offer</span>
//                     </div>
//                 </div>

//                 <div className="flex gap-2 flex-wrap items-center">
//                     <label className="font-semibold">Amenities: </label>
//                     <div className="flex gap-2">
//                         <input onChange={handleChange} checked={sidebardata.parking} type="checkbox" id="parking" className="w-5"/>
//                         <span>Parking</span>
//                     </div>

//                     <div className="flex gap-2">
//                         <input onChange={handleChange} checked={sidebardata.furnished} type="checkbox" id="furnished" className="w-5"/>
//                         <span>Furnished</span>
//                     </div>
//                 </div>

//                 <div className="flex items-center gap-2">
//                     <label htmlFor="sort_order" className="font-semibold">Sort</label>
//                     <select defaultValue={'createdAt_desc'} onChange={handleChange} className="border rounded-lg p-3" id="sort_order">
//                         <option value={'regularPrice_desc'}>Price hight to low</option>
//                         <option value={'regularPrice_asc'}>Price low to hight</option>
//                         <option value={'createdAt_desc'}>Latest</option>
//                         <option value={'createdAt_asc'}>Oldest</option>
//                     </select>
//                 </div>

//                 <button className="bg-slate-700 rounded-lg text-white p-3 uppercase hover:opacity-95">Search</button>
//             </form>
//         </div>

//         <div className="flex-1">
//             <h1 className="text-3xl font-semibold border-b p-3 mt-5">Listing result</h1>

//             <div className="p-7 flex flex-wrap gap-4">
//                 {!loading && listings.length === 0 && (
//                     <p className="text-xl text-slate-700">No listing found!</p>
//                 )}

//                 {loading && (
//                     <p className="text-xl text-slate-700 text-center w-full">Loading...</p>
//                 )}
//                     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 w-full gap-3">
//                     {!loading && listings && listings.length > 0 && listings.map((listing, index) => (
//                         <ListingItem key={index} listing={listing} />
//                     ))}
//                     </div>

//                     {showMore && (
//                         <button className="text-green-700 hover:underline p-7 text-center w-full" onClick={() => {
//                             onShowMoreClick()
//                         }}>
//                             Show more
//                         </button>
//                     )}
//             </div>
//         </div>
//     </div>
//   )
// }


import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";
import ListingItem from "../components/ListingItem";
import queryString from "query-string";

export default function Search() {
    const navigate = useNavigate()
    const [sidebardata, setSidebardata] = useState({
        searchTerm: '',
        type: 'all',
        parking: false,
        furnished: false,
        offer: false,
        sort: 'created_at',
        order: 'desc'
    })
    const [loading, setLoading] = useState(false)
    const [listings, setListings] = useState([])
    const [showMore, setShowMore] = useState(false)
    console.log(listings);
    const parsedQueryParams = queryString.parse(location.search);
    useEffect(() => {
        // Xác định các tham số từ URL và cập nhật sidebardata nếu cần
        const queryParams = {
            searchTerm: parsedQueryParams.searchTerm || '',
            type: parsedQueryParams.type || 'all',
            parking: parsedQueryParams.parking === 'true' ? true : false,
            furnished: parsedQueryParams.furnished === 'true' ? true : false,
            offer: parsedQueryParams.offer === 'true' ? true : false,
            sort: parsedQueryParams.sort || 'created_at',
            order: parsedQueryParams.order || 'desc'
        };

        // Kiểm tra xem có giá trị nào đó không phải mặc định không, nếu có thì cập nhật sidebardata
        if (Object.values(queryParams).some(value => value)) {
            setSidebardata(queryParams);
        }
        console.log('a', queryParams);
    }, [location.search]);


    useEffect(() => {
        const fetchListings = async () => {
            setLoading(true)
            setShowMore(false)
            const searchQuery = queryString.stringify(parsedQueryParams);
            console.log('searchQuery', searchQuery);
            const res = await fetch(`/api/listing/get?${searchQuery}`)
            const data = await res.json()
            if (data.length > 8) {
                setShowMore(true)
            } else {
                setShowMore(false)
            }
            setListings(data)
            setLoading(false)
        }

        fetchListings()
    }, [location.search])  

    const handleChange = (e) => {
        if (e.target.id === 'all' || e.target.id === 'rent' || e.target.id === 'sale') {
            setSidebardata({
                ...sidebardata,
                type: e.target.id
            })
        }

        if (e.target.id === 'searchTerm') {
            setSidebardata({
                ...sidebardata,
                searchTerm: e.target.value
            })
        }

        if (e.target.id === 'parking' || e.target.id === 'furnished' || e.target.id === 'offer') {
            setSidebardata({
                ...sidebardata,
                [e.target.id]: e.target.checked || e.target.checked === 'true' ? true : false
            })
        }

        if (e.target.id === 'sort_order') {
            const sort = e.target.value.split('_')[0] || 'created_at'
            const order = e.target.value.split('_')[1] || 'desc'
            setSidebardata({
                ...sidebardata, sort, order
            })
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        navigate(`/search?${queryString.stringify(sidebardata)}`)
    }

    const onShowMoreClick = async () => {
        const numberOfListings = listings.length
        const startIndex = numberOfListings
        const urlParams = queryString.parse(location.search)
        const searchQuery = {...urlParams, startIndex}
        console.log('search query: ', searchQuery);
        const res = await fetch(`api/listing/get?${queryString.stringify(searchQuery)}`)
        const data = await res.json()
        if (data.length < 9) {
            setShowMore(false)
        }
        setListings([...listings, ...data])
    }
  return (
    <div className="flex flex-col md:flex-row">
        <div className="p-7 border-b-2 md:border-r-2 md:min-h-screen md:min-w-[400px]">
            <form onSubmit={handleSubmit} className="flex flex-col gap-8">
                <div className="flex items-center gap-2">
                    <label  htmlFor="searchTerm" className="whitespace-nowrap font-semibold">Search Term</label>
                    <input
                        type="text"
                        placeholder="Search..."
                        id="searchTerm"
                        className="p-3 w-full rounded-lg border"
                        value={sidebardata.searchTerm}
                        onChange={handleChange}
                    />
                </div>

                <div className="flex gap-2 flex-wrap items-center">
                    <label htmlFor="all" className="font-semibold">Type: </label>
                    <div className="flex gap-2">
                        <input onChange={handleChange} checked={sidebardata.type === 'all'} type="checkbox" id="all" className="w-5"/>
                        <span>Rent & Sale</span>
                    </div>

                    <div className="flex gap-2">
                        <input onChange={handleChange} checked={sidebardata.type === 'rent'} type="checkbox" id="rent" className="w-5"/>
                        <span>Rent</span>
                    </div>

                    <div className="flex gap-2">
                        <input onChange={handleChange} checked={sidebardata.type === 'sale'} type="checkbox" id="sale" className="w-5"/>
                        <span>Sale</span>
                    </div>

                    <div className="flex gap-2">
                        <input onChange={handleChange} checked={sidebardata.offer} type="checkbox" id="offer" className="w-5"/>
                        <span>Offer</span>
                    </div>
                </div>

                <div className="flex gap-2 flex-wrap items-center">
                    <label className="font-semibold">Amenities: </label>
                    <div className="flex gap-2">
                        <input onChange={handleChange} checked={sidebardata.parking} type="checkbox" id="parking" className="w-5"/>
                        <span>Parking</span>
                    </div>

                    <div className="flex gap-2">
                        <input onChange={handleChange} checked={sidebardata.furnished} type="checkbox" id="furnished" className="w-5"/>
                        <span>Furnished</span>
                    </div>
                </div>

                <div className="flex items-center gap-2">
                    <label htmlFor="sort_order" className="font-semibold">Sort</label>
                    <select defaultValue={'createdAt_desc'} onChange={handleChange} className="border rounded-lg p-3" id="sort_order">
                        <option value={'regularPrice_desc'}>Price hight to low</option>
                        <option value={'regularPrice_asc'}>Price low to hight</option>
                        <option value={'createdAt_desc'}>Latest</option>
                        <option value={'createdAt_asc'}>Oldest</option>
                    </select>
                </div>

                <button className="bg-slate-700 rounded-lg text-white p-3 uppercase hover:opacity-95">Search</button>
            </form>
        </div>

        <div className="flex-1">
            <h1 className="text-3xl font-semibold border-b p-3 mt-5">Listing result</h1>

            <div className="p-7 flex flex-wrap gap-4">
                {!loading && listings.length === 0 && (
                    <p className="text-xl text-slate-700">No listing found!</p>
                )}

                {loading && (
                    <p className="text-xl text-slate-700 text-center w-full">Loading...</p>
                )}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 w-full gap-3">
                    {!loading && listings && listings.length > 0 && listings.map((listing, index) => (
                        <ListingItem key={index} listing={listing} />
                    ))}
                    </div>

                    {showMore && (
                        <button className="text-green-700 hover:underline p-7 text-center w-full" onClick={() => {
                            onShowMoreClick()
                        }}>
                            Show more
                        </button>
                    )}
            </div>
        </div>
    </div>
  )
}
