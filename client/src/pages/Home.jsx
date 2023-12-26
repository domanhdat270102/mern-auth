import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import SwiperCore from 'swiper'
import 'swiper/css/bundle'
import ListingItem from "../components/ListingItem";
import { useDispatch, useSelector } from "react-redux";
import { deleteUserSuccess, signInSuccess } from "../redux/user/userSlice";
import {TypeAnimation} from 'react-type-animation'
import {motion} from 'framer-motion'
import toast from "react-hot-toast";

export default function Home() {
  SwiperCore.use([Navigation])
  const dispatch = useDispatch()
  const [offerListings, setOfferListings] = useState([])
  const [saleListings, setSaleListings] = useState([])
  const [rentListings, setRentListings] = useState([])
  const { currentUser } = useSelector(state => state.user)
  console.log(currentUser);
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

  useEffect(() => {
    if (currentUser?.username) {
      const hasShownWelcomeForUser = localStorage.getItem(`hasShownWelcome_${currentUser?.username}`);
  
      if (!hasShownWelcomeForUser) {
        toast.custom((t) => (
          <div
            className={`${
              t.visible ? 'animate-enter' : 'animate-leave'
            } max-w-md w-full bg-white shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5`}
          >
            <div className="flex-1 w-0 p-4">
              <div className="flex items-start">
                <div className="flex-shrink-0 pt-0.5">
                  <img
                    className="h-10 w-10 rounded-full"
                    src={currentUser?.avatar}
                    alt=""
                  />
                </div>
                <div className="ml-3 flex-1">
                  <p className="text-sm font-medium text-gray-900">
                    {currentUser?.username}
                  </p>
                  <p className="mt-1 text-sm text-gray-500">
                    Welcome to website
                  </p>
                </div>
              </div>
            </div>
            <div className="flex border-l border-gray-200">
              <button
                onClick={() => toast.dismiss(t.id)}
                className="w-full border border-transparent rounded-none rounded-r-lg p-4 flex items-center justify-center text-sm font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                Close
              </button>
            </div>
          </div>
        ))
        localStorage.setItem(`hasShownWelcome_${currentUser?.username}`, 'true');
        console.log('alo');
      }
    }
  }, [currentUser?.username]);
  return (
    <div>
      <div className="flex flex-col gap-6 p-28 px-3 max-w-6xl mx-auto">
        <motion.h1
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{
          duration: 0.8,
          delay: 0.5,
          ease: [0, 0.71, 0.2, 1.01]
        }}
          className="text-3xl text-red-400 font-bold lg:text-6xl"
          >
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
        </motion.h1>

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
              <SwiperSlide key={listing._id}>
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
