import { useState, useEffect } from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import TitleCard from "../Cards/TitleCard.tsx";

ChartJS.register(ArcElement, Tooltip, Legend);

interface Product {
    category: string;
}

function DoughnutChart() {
    const [data, setData] = useState({
        labels: [] as string[],
        datasets: [
            {
                data: [] as number[],
                backgroundColor: [] as string[],
            },
        ],
    });

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await fetch('http://127.0.0.1:5000/products');
                const products: Product[] = await response.json();

                const categories = Array.from(new Set(products.map((product) => product.category)));

                console.log(categories)

                const categoryCounts = categories.map((category) => {
                    return products.filter((product) => product.category === category).length;
                });

                console.log(categoryCounts)

                const backgroundColors = [
                    'rgba(255, 99, 132, 0.8)',
                    'rgba(54, 162, 235, 0.8)',
                    'rgba(255, 206, 86, 0.8)',
                    'rgba(75, 192, 192, 0.8)',
                    'rgba(153, 102, 255, 0.8)',
                    'rgba(255, 159, 64, 0.8)',
                ];

                setData({
                    labels: categories,
                    datasets: [
                        {
                            data: categoryCounts,
                            backgroundColor: backgroundColors,
                        },
                    ],
                });
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }

        fetchData();
    }, []);

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },


        },
    };

    return (
        <TitleCard title={'Category'}>
            <Doughnut options={options} data={data} />
         </TitleCard>
    );
}

export default DoughnutChart;
