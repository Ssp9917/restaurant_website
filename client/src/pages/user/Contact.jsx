import React from 'react'

const Contact = () => {
  return (
    <section className="bg-gray-500">
      <div className="">
        <div className="flex flex-col lg:flex-row bg-gray-100  overflow-hidden">
          <div className="lg:w-2/3 p-8 bg-white">
            <h2 className="text-3xl font-semibold text-center text-gray-800 mb-4">Online Reservation</h2>
            <p className="text-center text-gray-600 mb-8">
              Booking request{" "}
              <a href="tel:+88123123456" className="text-lamaSky hover:underline">
                +88-123-123456
              </a>{" "}
              or fill out the order form
            </p>
            <form className="space-y-6">
              <div className="flex gap-4">
                <input
                  type="text"
                  name="name"
                  placeholder="Your Name"
                  autoComplete="off"
                  className="w-full p-4 border border-gray-300 rounded-md focus:outline-none focus:border-lamaSky"
                />
                <input
                  type="tel"
                  name="phone"
                  placeholder="Phone Number"
                  autoComplete="off"
                  className="w-full p-4 border border-gray-300 rounded-md focus:outline-none focus:border-lamaSky"
                />
              </div>

              <div className="flex flex-col md:flex-row gap-4">
                <div className="relative flex-1">
                  <ion-icon name="person-outline" className="absolute top-3 left-3 text-gray-400" />
                  <select
                    name="person"
                    className="w-full p-4 pl-10 border border-gray-300 rounded-md focus:outline-none focus:border-lamaSky"
                  >
                    <option value="1-person">1 Person</option>
                    <option value="2-person">2 Person</option>
                    <option value="3-person">3 Person</option>
                    <option value="4-person">4 Person</option>
                    <option value="5-person">5 Person</option>
                    <option value="6-person">6 Person</option>
                    <option value="7-person">7 Person</option>
                  </select>
                </div>

                <div className="relative flex-1">
                  <ion-icon name="calendar-clear-outline" className="absolute top-3 left-3 text-gray-400" />
                  <input
                    type="date"
                    name="reservation-date"
                    className="w-full p-4 pl-10 border border-gray-300 rounded-md focus:outline-none focus:border-lamaSky"
                  />
                </div>

                <div className="relative flex-1">
                  <ion-icon name="time-outline" className="absolute top-3 left-3 text-gray-400" />
                  <select
                    name="time"
                    className="w-full p-4 pl-10 border border-gray-300 rounded-md focus:outline-none focus:border-lamaSky"
                  >
                    <option value="08:00am">08 : 00 am</option>
                    <option value="09:00am">09 : 00 am</option>
                    <option value="10:00am">10 : 00 am</option>
                    <option value="11:00am">11 : 00 am</option>
                    <option value="12:00pm">12 : 00 pm</option>
                    <option value="01:00pm">01 : 00 pm</option>
                    <option value="02:00pm">02 : 00 pm</option>
                    <option value="03:00pm">03 : 00 pm</option>
                    <option value="04:00pm">04 : 00 pm</option>
                    <option value="05:00pm">05 : 00 pm</option>
                    <option value="06:00pm">06 : 00 pm</option>
                    <option value="07:00pm">07 : 00 pm</option>
                    <option value="08:00pm">08 : 00 pm</option>
                    <option value="09:00pm">09 : 00 pm</option>
                    <option value="10:00pm">10 : 00 pm</option>
                  </select>
                </div>
              </div>

              <textarea
                name="message"
                placeholder="Message"
                autoComplete="off"
                className="w-full p-4 border border-gray-300 rounded-md focus:outline-none focus:border-lamaSky"
              ></textarea>

              <button type="submit" className="w-full py-4 bg-black text-white font-semibold rounded-md hover:bg-lamaSky-dark transition">
                Book A Table
              </button>
            </form>
          </div>

          <div
            className="lg:w-1/3 p-8 text-center text-white bg-black flex flex-col items-center justify-center space-y-6"
          >
            <h2 className="text-3xl font-semibold">Contact Us</h2>
            <p className="text-lg">Booking Request</p>
            <a href="tel:+88123123456" className="text-2xl font-bold hover:underline">
              +88-123-123456
            </a>
            <div className="w-full h-px bg-white opacity-30"></div>
            <p className="text-lg">Location</p>
            <address className="text-lg leading-relaxed">
              Restaurant St, Delicious City, <br />
              London 9578, UK
            </address>
            <p className="text-lg">Lunch Time</p>
            <p className="text-lg">Monday to Sunday <br /> 11.00 am - 2.30 pm</p>
            <p className="text-lg">Dinner Time</p>
            <p className="text-lg">Monday to Sunday <br /> 05.00 pm - 10.00 pm</p>
          </div>
        </div>
      </div>
    </section>

  )
}

export default Contact