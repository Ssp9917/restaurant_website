import React from 'react';
import ShowBooking from '../../components/ShowBooking';
import recipeImage from '../../assets/recipe.png'; // Renamed the import to avoid conflict
import application from '../../assets/application.png';
import orderImage from '../../assets/checkout.png'; // Renamed the import to avoid conflict
import { useGetAllRecipeQuery } from '../../api/recipeSlice';
import { useGetAllCategoryQuery } from '../../api/categorySlice';
import { useGetAdminOrdersQuery, useGetAllOrdersQuery } from '../../api/orderSlice';
import { useGetAllBookingQuery } from '../../api/bookingTable';

const Dashboard = () => {
  const { data: recipe } = useGetAllRecipeQuery();
  const { data: category } = useGetAllCategoryQuery();
  const { data: order } = useGetAdminOrdersQuery();
  const {data} = useGetAllBookingQuery();

  const booking = data?.bookings || []

  return (
    <>
      {/* first row */}
      <div className="grid grid-cols-1 md:gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3">
        <ShowBooking
          title={"Total Recipes"}
          background={"linear-gradient(rgb(98 172 255), rgb(42 78 157))"}
          count={recipe?.length || 0}
          image={recipeImage} // Use the renamed image here
        />
        <ShowBooking
          title={"Total Categories"}
          background={"linear-gradient(rgb(239 165 255), rgb(167 90 152))"}
          count={category?.length || 0}
          image={application}
        />
        <ShowBooking
          title={"Total Order"}
          background={"linear-gradient(rgb(246 192 65), rgb(181 143 0))"}
          count={order?.length || 0}
          image={orderImage} // Use the renamed image here
        />
        <ShowBooking
        title={"Total Booking"}
        background={"linear-gradient(rgb(200 180 50),rgb(160 120 0))"}
        count={booking?.length || 0}
        image={orderImage}
        />
      </div>
    </>
  );
}

export default Dashboard;
