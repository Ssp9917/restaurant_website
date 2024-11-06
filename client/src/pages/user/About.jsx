import React from 'react'
import aboutImg from '../../assets/about-banner.png'
import saleShapeImage from '../../assets/sale-shape-red.png'

const About = () => {
  return (
    <section id="about" class="bg-gray-100 py-16">
      <div class="container mx-auto flex flex-col md:flex-row items-center space-y-8 md:space-y-0">

        <div class="relative w-full md:w-1/2 flex justify-center">
          <img
            src={aboutImg}
            alt="Burger with Drinks"
            class="w-full max-w-md h-auto object-cover rounded-lg shadow-lg"
            loading="lazy"
          />
          <img
            src={saleShapeImage}
            alt="get up to 50% off now"
            class="absolute top-0 left-0 transform scale-90 md:scale-100 animate-pulse"
            style={{'width': 200, 'height': 'auto'}}
          />
        </div>


        <div class="w-full md:w-1/2 space-y-4 md:pl-12 text-center md:text-left">
          <h2 class="text-3xl font-bold text-gray-800">
            Caferio, Burgers, and Best Pizzas
            <span class="block text-red-500">in Town!</span>
          </h2>
          <p class="text-gray-600 text-lg">
            The restaurants in Hangzhou also catered to many northern Chinese who had fled south from Kaifeng during the Jurchen invasion of the 1120s, while it is also known that many restaurants were run by families.
          </p>

          <ul class="space-y-2 text-gray-700">
            <li class="flex items-center space-x-2">
              <ion-icon name="checkmark-outline" class="text-green-500"></ion-icon>
              <span>Delicious &amp; Healthy Foods</span>
            </li>
            <li class="flex items-center space-x-2">
              <ion-icon name="checkmark-outline" class="text-green-500"></ion-icon>
              <span>Specific Family and Kids Zone</span>
            </li>
            <li class="flex items-center space-x-2">
              <ion-icon name="checkmark-outline" class="text-green-500"></ion-icon>
              <span>Music &amp; Other Facilities</span>
            </li>
            <li class="flex items-center space-x-2">
              <ion-icon name="checkmark-outline" class="text-green-500"></ion-icon>
              <span>Fastest Food Home Delivery</span>
            </li>
          </ul>

          <button class="mt-6 px-6 py-2 text-white bg-red-500 rounded-full font-semibold hover:bg-red-600 transition-all">
            Order Now
          </button>
        </div>
      </div>
    </section>

  )
}

export default About