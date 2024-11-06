import React from 'react'
import FilterProduct from './FilterProduct';
import CardFeature from './CardFeature';

const Menu = ({ heading }) => {

    const categoryList = ["Electronics", "Clothing", "Furniture", "Books", "Groceries"];

    // Dummy data for products
    const productData = [
        { _id: "1", name: "Product 1", category: "Electronics", price: 100, image: "https://via.placeholder.com/150" },
        { _id: "2", name: "Product 2", category: "Clothing", price: 50, image: "https://via.placeholder.com/150" },
        { _id: "3", name: "Product 3", category: "Electronics", price: 150, image: "https://via.placeholder.com/150" },
        { _id: "4", name: "Product 4", category: "Furniture", price: 200, image: "https://via.placeholder.com/150" },
        { _id: "5", name: "Product 5", category: "Clothing", price: 80, image: "https://via.placeholder.com/150" },
    ];


    return (
        <>
            {/* categories listing */}
            <div className="my-5">
                <h2 className="font-bold text-center text-red-500 text-4xl  mb-4">{heading}</h2>
            </div>

            <div className="flex gap-4 justify-center overflow-scroll scrollbar-none">
                {categoryList[0] ? (
                    categoryList.map((el) => {
                        return (
                            <FilterProduct
                                category={el}
                                key={el}
                            // isActive={el.toLowerCase() === filterby.toLowerCase()}
                            // onClick={() => handleFilterProduct(el)}
                            />
                        );
                    })
                ) : (
                    <div className="min-h-[150px] flex justify-center items-center">
                        <p>Loading...</p>
                    </div>
                )}
            </div>

            {/* product listing */}
            <div className="flex flex-wrap justify-center gap-4 my-4">
                {productData[0]
                    ? productData.map((el) => {
                        return (
                            <CardFeature

                                key={el._id}
                                id={el._id}
                                image={el.image}
                                name={el.name}
                                category={el.category}
                                price={el.price}
                            />
                        );
                    })
                    : loadingArrayFeature.map((el, index) => (
                        <CardFeature loading="Loading..." key={index + "allProduct"} />
                    ))}
            </div>

        </>
    )
}

export default Menu