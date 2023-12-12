import  { useEffect, useState } from 'react';

import TitleCard from "../../components/Cards/TitleCard.tsx";

const Stock = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://127.0.0.1:5000/products');
                const data = await response.json();
                setProducts(data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    const outOfStockProducts = products.filter((product) => product.countInStock != 0);


    return (
        <div>
            <TitleCard title={'Stock'}>
                <ul >
                    {outOfStockProducts.map((product) => (
                        <li key={product.id} className="p-5 bg-lime-800 mt-3 rounded-xl text-base text-white font-semibold">
                            {product.name} - {product.countInStock} in stock
                        </li>
                    ))}
                </ul>
            </TitleCard>


        </div>
    );
};

export default Stock;
