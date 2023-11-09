import { useForm } from "react-hook-form"
import axios from 'axios'
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
const imageHostingToken = import.meta.env.VITE_imgbbKey

const AddItems = () => {
    const [axiosInstance] = useAxiosSecure()
    const imageHostingURL = 'https://api.imgbb.com/1/upload'
    const {
        register,
        handleSubmit,
        watch,
        reset,
        formState: { errors },
    } = useForm()

    const uploadImage = async (imageFile) => {
        const formData = new FormData()
        formData.set('key', imageHostingToken)
        formData.append('image', imageFile)

        return axios({
            method: 'post',
            url: 'https://api.imgbb.com/1/upload',
            data: formData
        })
    }

    const onSubmit = (data) => {
        uploadImage(data.itemImage[0])
            .then(({ data: imageData }) => {
                if (imageData.success) {
                    const menuDataDB = {
                        name: data.itemName,
                        recipe: data.recipeDetails,
                        image: imageData.data['display_url'],
                        category: data.itemCategory,
                        price: parseFloat(data.itemPrice),
                    }
                    axiosInstance.post('/menu', menuDataDB)
                        .then(({ data }) => {
                            if (data?.insertedId) {
                                Swal.fire({
                                    title: "Item Added!",
                                    text: "A new item has been added.",
                                    icon: "success"
                                  });
                                reset()
                            }
                            else {
                                Swal.fire({
                                    icon: "error",
                                    title: "Oops...",
                                    text: "Something went wrong!",
                                });
                            }
                        })
                        .catch(err => console.log('error posting data', err))
                }
                else {
                    console.log('failed')
                }
            })
    }

    return (
        <div className='text-black'>
            <h1 className='text-center text-4xl font-semibold mb-4'>Add New Items</h1>
            <form onSubmit={handleSubmit(onSubmit)} className='bg-slate-100 space-y-2 p-16 rounded-md'>
                <div className="form-control w-full max-w-xs">
                    <label className="label">
                        <span className="label-text text-black text-lg font-medium">Item Name?</span>
                    </label>
                    <input type="text" placeholder="Type here" name='itemName' {...register("itemName", { required: true, maxLength: 15 })} className="bg-white input input-bordered w-full max-w-xs" />
                    {errors.itemName?.type === 'required' && <p className="text-red-600 ml-1">This filed is required</p>}
                    {errors.itemName?.type === 'maxLength' && <p className="text-red-600 ml-1">Maxlength of 15</p>}
                </div>

                <div className='flex gap-4'>
                    <div className="form-control w-full max-w-xs">
                        <label className="label">
                            <span className="label-text text-black text-lg font-medium">Select Category</span>
                        </label>
                        <select className="select select-bordered bg-white" name="itemCategory" {...register("itemCategory", { required: true })} >
                            <option disabled selected value=''>Pick one</option>
                            <option value='pizza'>Pizza</option>
                            <option value='soup'>Soup</option>
                            <option value='salad'>Salad</option>
                            <option value='dessert'>Dessert</option>
                            <option value='drinks'>Drinks</option>
                        </select>
                        {watch("itemCategory") === '' && <p className="text-red-600 ml-1">This filed is required</p>}
                    </div>
                    <div className="form-control w-full max-w-xs">
                        <label className="label">
                            <span className="label-text text-black text-lg font-medium">Price?</span>
                        </label>
                        <input type="number" step='0.01' min='0' placeholder="Type here" name='itemPrice' {...register("itemPrice", { required: true })} className="bg-white input input-bordered w-full max-w-xs" />
                        {errors.itemPrice?.type === 'required' && <p className="text-red-600 ml-1">This filed is required</p>}
                    </div>
                </div>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text text-black text-lg font-medium">Recipe Details</span>
                    </label>
                    <textarea className="textarea textarea-bordered h-24 bg-white" placeholder="Details" name='recipeDetails' {...register("recipeDetails", { required: true })}></textarea>
                    {errors.recipeDetails?.type === 'required' && <p className="text-red-600 ml-1">This filed is required</p>}
                </div>

                <div className="form-control w-full max-w-xs">
                    <input type="file" name="itemImage" {...register("itemImage", { required: true })} className="file-input w-full max-w-xs bg-white" />
                    {errors.itemImage?.type === 'required' && <p className="text-red-600 ml-1">This filed is required</p>}
                </div>

                <input type="submit" className="btn btn-active btn-accent w-full" value="Add" />
            </form>
        </div>
    );
};

export default AddItems;