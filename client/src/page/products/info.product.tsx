
import  {useEffect, useState} from "react";
import {useParams} from "react-router-dom";

import OptionNearYou from "../../components/Product/OptionNearYou";
import HandleProducts from "../../api/HandleProducts.ts";
import {Products} from "../../models/Products.ts";


export default function ProductInforPage() {

    const [productDetail, setProductDetail] = useState<Products[]>([])


    const id = useParams().id;



    useEffect(() => {
        getProductsDetail()
    }, [])

    const getProductsDetail = async () => {
        const api = `/product/${id}`

        try {
            const res: any = await HandleProducts.getProducts(api)
            if (res) {
                setProductDetail(res)
            }
        } catch (e) {
            console.log(`Product not found: ${e}`)
        }


    }





    return (
        <div>

            {productDetail.map(item => (
                <div className="px-20">
                    <div className="pet-stock-text-color py-10 text-4xl font-semibold">
                        {item.name}

                    </div>


                    <main className="flex flex-row mb-20">
                        <div className="basis-1/4 border border-slate-200 rounded ">
                            <figure className="py-3 ">
                                <img src={item.imageUrl} alt= {item.name}/>
                            </figure>
                        </div>
                        <div className=" basis-2/4 grid border border-slate-200 rounded mx-8 px-5   bg-zinc-200">

                            <p className="pet-stock-text-color pt-10 text-2xl font-semibold text-center">Description</p>
                            <p className="text-center px-16">{item.description}</p>

                        </div>
                        <div className="basis-1/4">
                            <OptionNearYou/>
                        </div>
                    </main>
                    {/*<div className="mt-16 flex flex-row bg-zinc-200 border rounded pb-16 mb-20">*/}
                    {/*    <div className="basis-1/3">*/}
                    {/*        <p className="pet-stock-text-color py-10 text-2xl font-semibold text-center">Description</p>*/}
                    {/*        <p className="text-center px-16">{productDetail.description}</p>*/}
                    {/*    </div>*/}

                    {/*    <div className="basis-1/3">*/}
                    {/*        <p className="pet-stock-text-color py-10 text-2xl font-semibold text-center">Ingredients</p>*/}
                    {/*        <p className="text-center px-16">{productDetail.ingredient}</p>*/}
                    {/*    </div>*/}
                    {/*    <div className="basis-1/3">*/}
                    {/*        <p className="pet-stock-text-color py-10 text-2xl font-semibold text-center">Reviews</p>*/}
                    {/*        <p className="text-center px-16">{productDetail.reviews}</p>*/}
                    {/*    </div>*/}
                    {/*</div>*/}

                </div>
            ))}

        </div>
    )

}