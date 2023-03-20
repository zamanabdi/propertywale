import React from "react";
import { collection, getDocs, limit, orderBy, query } from "firebase/firestore";
import { useEffect, useState } from "react";
import Spinner from "../components/Spinner";
import { db } from "../firebase";
import Real from "../assets/real.gif";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, {
  EffectFade,
  Autoplay,
  Navigation,
  Pagination,
} from "swiper";
import "swiper/css/bundle";
import { useNavigate } from "react-router-dom";

const Slider = () => {
  const [listings, setListings] = useState(null);
  const [loading, setLoading] = useState(true);

  SwiperCore.use([Autoplay, Navigation, Pagination]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchListings = async () => {
      const listingsRef = collection(db, "listings");
      const q = query(listingsRef, orderBy("timestamp", "desc"), limit(5));
      const querySnap = await getDocs(q);
      let listings = [];
      querySnap.forEach((doc) => {
        return listings.push({ id: doc.id, data: doc.data() });
      });
      setListings(listings);
      setLoading(false);
    };
    fetchListings();
  }, []);

  if (loading) {
    return <Spinner />;
  }

  if (listings.length === 0) {
    return <React.Fragment></React.Fragment>;
  }

  return (
    listings && (
      <>
        <div className="flex items-center justify-center w-full mb-[2rem] md:mb-[3.5rem]">
          <div className="flex sm:w-full md:w-full lg:w-full xl:w-full">
            <img src={Real} className="w-full" />
          </div>
        </div>
        <div>
          <img
            src="https://newspaperads.ads2publish.com/wp-content/uploads/2017/11/royal-park-inspiring-a-luxurious-living-ad-times-property-delhi-10-11-2017.png"
            className="w-full"
          />
        </div>

        <div className="mt-5">
          <Swiper
            slidesPerView={1}
            navigation
            pagination={{ type: "progressbar" }}
            effect="fade"
            modules={[EffectFade]}
            autoplay={{ delay: 3000 }}
          >
            {listings.map(({ data, id }) => (
              <SwiperSlide
                key={id}
                onClick={() => navigate(`/category/${data.type}/${id}`)}
              >
                <div
                  style={{
                    background: `url(${data.imgUrls[0]}) center center/cover no-repeat`,
                  }}
                  className="relative w-full h-[300px] overflow-hidden"
                ></div>
                <p className="text-[#f1faee] absolute left-1 top-3 font-medium max-w-[90%] bg-[#457b9d] shadow-lg opacity-90 p-2 rounded-br-3xl">{data.name}</p>
                <p className="text-[#f1faee] absolute left-1 bottom-1 font-semibold max-w-[90%] bg-[#e63946] shadow-lg opacity-90 p-2 rounded-tr-3xl">₹{data?.discountedPrice?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") ?? data?.regularPrice?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                {data.type === "rent" && "/ month"}</p>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </>
    )
  );
};

export default Slider;
