import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import SwiperCore from 'swiper'
import 'swiper/css/bundle'
import ListingItem from "../components/ListingItem";
import { useDispatch } from "react-redux";
import { deleteUserSuccess, signInSuccess } from "../redux/user/userSlice";
import {TypeAnimation} from 'react-type-animation'

export default function Home() {
  SwiperCore.use([Navigation])
  const dispatch = useDispatch()
  const [offerListings, setOfferListings] = useState([])
  const [saleListings, setSaleListings] = useState([])
  const [rentListings, setRentListings] = useState([])
  console.log('offerListings', offerListings);

  useEffect(() => {
    const fetchOfferListings = async () => {
      try {
        const res = await fetch('/api/listing/get?offer=true&limit=4')
        const data = await res.json()
        setOfferListings(data)
        fetchRentListings()
      } catch (error) {
        console.log(error);
      }
    }

    const fetchRentListings = async () => {
      try {
        const res = await fetch('/api/listing/get?type=rent&limit=4')
        const data = await res.json()
        setRentListings(data)
        fetchSaleListings()
      } catch (error) {
        console.log(error);
      }
    }

    const fetchSaleListings = async () => {
      try {
        const res = await fetch('/api/listing/get?type=sale&limit=4')
        const data = await res.json()
        setSaleListings(data)
      } catch (error) {
        console.log(error);
      }
    }
    fetchOfferListings()
  },[])

  useEffect(() => {
    const isLogin = async () => {
      try {
        const res = await fetch('/api/auth/isLogin')
        const data = await res.json()
        if (data.success === false) {
          dispatch(deleteUserSuccess(data.message))
          return;
        }
        dispatch(signInSuccess(data))
      } catch (error) {
        console.log(error);
      }
    }
    isLogin()
  },[])
  return (
    <div>
      <div className="flex flex-col gap-6 p-28 px-3 max-w-6xl mx-auto">
        <h1 className="text-3xl text-red-400 font-bold lg:text-6xl">
          Find your next {' '}
          <span className="text-amber-400">
          <TypeAnimation 
            sequence={[
              'perfect',
              2000,
              'convenient',
              2000,
            ]}
            speed={50}
            wrapper='span'
            repeat={Infinity}
          />

          </span>
          <br />
          place with ease
        </h1>

        <div className="text-gray-400 text-xs sm:text-sm">
          Saharand Estate is the best place find to your next perfect place to live
          <br />
          We have a wide range of properties for you to choose from.
        </div>

        <Link to={'/search'} className="text-blue-700 font-bold">
          Let&apos;s get started...
        </Link>
        <div>
          <Swiper navigation>
            {offerListings && offerListings.length > 0 && offerListings.map((listing) => (
              <SwiperSlide key={listing}>
              <div className="h-[500px]" style={{background: `url(${listing.imageUrls[0]}) center no-repeat`, backgroundSize: 'cover' }}>
              </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        <div>
          {offerListings && offerListings.length > 0 && (
            <div>
              <div className="my-3">
                <h2 className="text-2xl font-semibold text-slate-600">Recent offers</h2>
                <Link to={'/search?offer=true'} className="text-sm text-blue-800 hover:underline">
                  Show more offers
                </Link>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 w-full gap-3">
                {offerListings.map(listing => (
                  <ListingItem listing={listing} key={listing._id} />
                ))}
              </div>
            </div>
          )}

          {rentListings && rentListings.length > 0 && (
            <div>
              <div className="my-3">
                <h2 className="text-2xl font-semibold text-slate-600">Recent places for rent</h2>
                <Link to={'/search?type=rent'} className="text-sm text-blue-800 hover:underline">
                  Show more place for rent
                </Link>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 w-full gap-3">
                {rentListings.map(listing => (
                  <ListingItem listing={listing} key={listing._id} />
                ))}
              </div>
            </div>
          )}

          {saleListings && saleListings.length > 0 && (
            <div>
              <div className="my-3">
                <h2 className="text-2xl font-semibold text-slate-600">Recent place for sale</h2>
                <Link to={'/search?type=sale'} className="text-sm text-blue-800 hover:underline">
                  Show more place for sale
                </Link>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 w-full gap-3">
                {saleListings.map(listing => (
                  <ListingItem listing={listing} key={listing._id} />
                ))}
              </div>
            </div>
          )}
        </div>
        
      </div>
    </div>
  )
}
