import React, { useEffect, useState } from "react";
import { auth } from "../utils/firebase";
import { signOut } from "firebase/auth";
import Navbar from "./Navbar";
import CarouselComponent from "./CarouselComponent";
import Footer from "./Footer";
import EventContainer from "./EventContainer";
import { useNavigate } from "react-router";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../utils/firebase";
import { IoIosCalendar, IoIosPin, IoIosSearch } from "react-icons/io";

const Homepage = () => {
  const [events, setevents] = useState([]);
  const navigate = useNavigate();

  const handleClick = async () => {
    const querySnapshot = await getDocs(collection(db, "events"));
    console.log(querySnapshot);
    setevents(querySnapshot.docs.map((doc) => doc.data()));
  };
  useEffect(() => {
    handleClick();
  }, []);
  return (
    <div className='bg-backgroundColor min-h-screen h-full min-w-screen'>
      <Navbar />
      <CarouselComponent />
      <div className='w-full px-96 mx-auto mt-10 flex items-center  relative'>
        <div className='flex items-center justify-center relative w-5/6'>
          <input
            type='text'
            className='w-full rounded-tl-3xl rounded-br-3xl outline-none z-10 bg-white border-4 h-20 border-mor pl-20 text-2xl'
            placeholder='Etkinlik Ara'
          />
          <IoIosSearch className='absolute text-gray-400 text-5xl top-4  z-20 left-4' />
        </div>
        <select
          name='cities'
          className=' pl-16 w-1/6 right-72 outline-none rounded-r-3xl absolute bg-white border-4 h-16 top-4 border-l-0 border-mor'
          id='cities'
        >
          <option value='istanbul'>İstanbul</option>
          <option value='izmir'>İzmir</option>
          <option value='ankara'>Ankara</option>
          <option value='bursa'>Bursa</option>
        </select>
      </div>
      <EventContainer />
      <div className='container mx-auto px-12 '>
        <div className='my-16'>
          <span className='text-3xl font-bold text-white mb-6'>
            Etkinlikler
          </span>
          <div className='w-full flex gap-12 mt-10 flex-wrap'>
            {events.map((event) => (
              <div
                onClick={() => {
                  navigate(`/Event/${event.eventName}`, { state: { event } });
                }}
                className='  bg-white pb-3 w-1/5  my-5 rounded-3xl flex  flex-col gap-2 mx-4 select-none'
              >
                <img
                  className=' mb-1 rounded-t-3xl h-44  pointer-events-none '
                  src={event.image}
                  alt=''
                />
                <span className='self-center font-medium text-xl '>
                  {event.eventName}
                </span>
                <div className='flex flex-col border-t-[1px] pt-3'>
                  <div className='text-black font-light text-lg flex gap-1 md:gap-3 ml-2 items-center justify-start'>
                    <IoIosPin /> {event.placeName}
                  </div>
                  <div className='text-black font-light text-lg flex gap-1 md:gap-3 ml-2 items-center justify-start'>
                    <IoIosCalendar /> {event.eventDate} {event.eventTime}
                  </div>
                </div>
                <div className='flex items-center w-full  justify-center px-2'>
                  <button className=' bg-lightPurple hover:bg-purple-700 border-solid border-2 rounded-xl border-transparent  shadow-md shadow-mor  transition-all py-2 text-white w-full'>
                    <span className='font-semibold'>
                      {event.tickets[0].price} ₺
                    </span>
                    <span> 'den Başlayan Fiyatlarla </span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
        {/* <div className='flex gap-64 flex-row text-white items-center justify-center lg:justify-between mt-16 flex-wrap'>
          <div className=''>
            <h3 className='text-3xl font-bold mb-16'>Yaklaşan Etkinlikler</h3>
            <ul className='flex-row flex-wrap lg:flex-col gap-32 flex items-center justify-center'>
              <li className='flex flex-col gap-4'>
                <LittlePartyBox />
              </li>
              <li className='flex flex-col gap-4'>
                <LittlePartyBox />
              </li>

              <li className='flex flex-col gap-4'>
                <LittlePartyBox />
              </li>
            </ul>
          </div>
          <div className='flex-1 flex items-center flex-col'>
            <h3 className='text-3xl font-bold self-start'>Aktif Chatler</h3>
            <div className='mt-16 w-full  text-black flex items-center flex-col gap-16'>
              <button className='w-3/4 bg-mor h-16 '>
                LuvxHiphop Sohbete Katıl
              </button>
              <button className='w-3/4 bg-mor h-16 '>
                LuvxHiphop Sohbete Katıl
              </button>
              <button className='w-3/4 bg-mor h-16 '>
                LuvxHiphop Sohbete Katıl
              </button>
              <button className='w-3/4 bg-mor h-16 '>
                LuvxHiphop Sohbete Katıl
              </button>
            </div>
          </div>
        </div> */}
        {/* <button
          onClick={() => {
            signOut(auth)
            .then(() => {
              // Sign-out successful.
            })
            .catch((error) => {
              // An error happened.
            });
          }}
          >
          Log out
        </button> */}
      </div>
      <Footer />
    </div>
  );
};

export default Homepage;
