import React from 'react';
import { useGetAllRecipeQuery } from '../../api/recipeSlice';
import CardFeature from '../../components/CardFeature';
import { useNavigate } from 'react-router-dom';


const FeaturedProduct = () => {
    const { data: products, isLoading, isError } = useGetAllRecipeQuery();
    const backendBaseUrl = import.meta.env.VITE_BACKEND_BASE_URL;
    const navigate = useNavigate()

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (isError) {
        return <div>Failed to load products. Please try again later.</div>;
    }

    // Filter products to only include those with featuredProduct set to true
    const featuredProduct = products?.filter(product => product.featuredProduct) || [];

    // mobail ke liye feature recipe
    const recipe = products?.filter(product => product.featuredProduct) || [];

    // Convert backslashes in the image path to forward slashes
    const normalizeImagePath = (path) => path.replace(/\\/g, '/');

    return (
        <>
            {/* desktop screen code */}
            <div className='hidden md:block'>
                <div className="flex w-full items-center">
                    <h2 className="font-bold text-center text-2xl text-slate-800 mb-4 pl-2">
                        Featured dishes
                    </h2>
                </div>

                <div className="flex gap-3">
                    {/* left */}
                    <div className="w-[70%] flex flex-col gap-3">
                        <div className="flex gap-3">
                            <div
                                onClick={()=>navigate(`/menu/${featuredProduct[0]._id}`)}
                                className=" h-[240px]  w-[50%] relative"
                                style={{
                                    backgroundImage: featuredProduct[0]
                                        ? `url(${backendBaseUrl}/${normalizeImagePath(featuredProduct[0].image)})`
                                        : 'none',
                                    backgroundSize: 'cover',
                                    backgroundPosition: 'center center',
                                }}
                            >
                                <div className='absolute bottom-0 right-0 bg-black w-[250px] rounded-s-lg h-[80px]'>
                                    <div className='text-white pt-4 pl-4'>
                                        {featuredProduct[0].name}
                                    </div>
                                    <div className='text-red-500 font-bold  pl-4'>
                                        ₹ {featuredProduct[0].price}
                                    </div>
                                </div>
                            </div>

                            <div
                                onClick={()=>navigate(`/menu/${featuredProduct[1]._id}`)}
                                className=" h-[240px]  w-[50%] relative"
                                style={{
                                    backgroundImage: featuredProduct[1]
                                        ? `url(${backendBaseUrl}/${normalizeImagePath(featuredProduct[1].image)})`
                                        : 'none',
                                    backgroundSize: 'cover',
                                    backgroundPosition: 'center',
                                }}
                            >
                                <div className='absolute bottom-0 right-0 bg-black w-[250px] rounded-s-lg h-[80px]'>
                                    <div className='text-white pt-4 pl-4'>
                                        {featuredProduct[1].name}
                                    </div>
                                    <div className='text-red-500 font-bold  pl-4'>
                                        ₹ {featuredProduct[1].price}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div
                        onClick={()=>navigate(`/menu/${featuredProduct[2]._id}`)}
                            className="h-[240px]  relative"
                            style={{
                                backgroundImage: featuredProduct[2]
                                    ? `url(${backendBaseUrl}/${normalizeImagePath(featuredProduct[2].image)})`
                                    : 'none',
                                backgroundSize: 'cover',
                                backgroundPosition: 'center',
                            }}
                        >
                            <div className='absolute bottom-0 right-0 bg-black w-[250px] rounded-s-lg h-[80px]'>
                                <div className='text-white pt-4 pl-4'>
                                    {featuredProduct[2].name}
                                </div>
                                <div className='text-red-500 font-bold  pl-4'>
                                    ₹ {featuredProduct[2].price}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* right */}
                    <div
                    onClick={()=>navigate(`/menu/${featuredProduct[3]._id}`)}
                        className="h-[492px] w-[30%]  relative"
                        style={{
                            backgroundImage: featuredProduct[3]
                                ? `url(${backendBaseUrl}/${normalizeImagePath(featuredProduct[3].image)})`
                                : 'none',
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                        }}
                    >
                        <div className='absolute bottom-0 right-0 bg-black w-[250px] rounded-s-lg h-[80px]'>
                            <div className='text-white pt-4 pl-4'>
                                {featuredProduct[3].name}
                            </div>
                            <div className='text-red-500 font-bold  pl-4'>
                                ₹ {featuredProduct[3].price}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* mobail screen code */}
            <div className='block md:hidden mb-20'>

                <div className="w-full items-center">
                    <h2 className="md:font-bold  md:text-2xl font-medium text-xl text-slate-800 mt-3 pl-2">
                        Features Dishes
                    </h2>
                </div>

                {/* Container for products */}
                <div className="overflow-x-auto ml-2 md:ml-0 scrollbar-none md:overflow-hidden">
                    <div
                        // ref={scrollContainerRef}
                        className="flex md:grid gap-5 place-items-center md:grid-cols-4"
                    >
                        {recipe?.length > 0
                            ? recipe.map((el) => (
                                <CardFeature

                                    key={el._id + "feature product"}
                                    id={el._id}
                                    name={el.name}
                                    category={el.category.name}
                                    price={el.price}
                                    image={el.image}
                                    oldprice={el.oldPrice}
                                />
                            ))
                            : loadingArray.map((_, index) => (
                                <CardFeature loading="Loading..." key={index + "cartLoading"} />
                            ))}
                    </div>
                </div>
            </div>


        </>


    );
};

export default FeaturedProduct;
