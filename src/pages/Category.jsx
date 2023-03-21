import {
    collection,
    getDocs,
    limit,
    orderBy,
    query,
    startAfter,
    where,
  } from "firebase/firestore";
  import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
  import { toast } from "react-toastify";
  import ListingItem from "../components/ListingItem";
  import Spinner from "../components/Spinner";
  import { db } from "../firebase";
  
  const Category = () => {
    const [listings, setListings] = useState(null);
    const [loading, setLoading] = useState(true);
    const [lastFetchedListing, setLastFetchedListing] = useState(null);

    const params = useParams();
  
    useEffect(() => {
      const fetchListings = async () => {
        try {
          const listingRef = collection(db, "listings");
          const q = query(
            listingRef,
            where("type", "==", params.categoryName),
            orderBy("timestamp", "desc"),
            limit(8)
          );
          const querySnap = await getDocs(q);
          const lastVisible = querySnap.docs[querySnap.docs.length - 1];
          setLastFetchedListing(lastVisible);
          const listings = [];
          querySnap.forEach((doc) => {
            return listings.push({
              id: doc.id,
              data: doc.data(),
            });
          });
          setListings(listings);
          setLoading(false);
        } catch (error) {
          toast.error("Could not fetch listing");
        }
      };
      fetchListings();
    }, [params.categoryName]);
  
    const onFetchMoreListings = async() => {
  
      try {
        const listingRef = collection(db, "listings");
        const q = query(
          listingRef,
          where("offer", "==", params.categoryName),
          orderBy("timestamp", "desc"),
          startAfter(lastFetchedListing),
          limit(4)
        );
        const querySnap = await getDocs(q);
        const lastVisible = querySnap.docs[querySnap.docs.length - 1];
        setLastFetchedListing(lastVisible);
        const listings = [];
        querySnap.forEach((doc) => {
          return listings.push({
            id: doc.id,
            data: doc.data(),
          });
        });
        setListings((prevState) => [...prevState,...listings]);
        setLoading(false);
      } catch (error) {
        toast.error("Could not fetch listing");
      }
  
    }
  
    return (
      <div className="max-w-6xl mx-auto px-3">
        <h1 className="text-3xl text-center mt-6 font-bold mb-6">{params.categoryName === "rent"? "Places For Rent" : "Places For Sale"}</h1>
        {loading ? (
          <Spinner />
        ) : listings && listings.length > 0 ? (
          <React.Fragment>
            <main>
              <ul className="sm:grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {listings.map((item) => (
                  <ListingItem key={item.id} id={item.id} listing={item.data} />
                ))}
              </ul>
            </main>
            {lastFetchedListing && (
              <div className="flex justify-center items-center">
                <button className="bg-white px-3 py-1.5 text-gray-700 border border-gray-300 mb-6 mt-6 hover:border-slate-600 rounded transition duration-150 ease-in-out" onClick={onFetchMoreListings}>Load more</button>
              </div>
            )}
          </React.Fragment>
        ) : (
          <p>there are no current offers</p>
        )}
      </div>
    );
  };
  
  export default Category;
  