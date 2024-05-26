// src/components/Dashboard.tsx
import { useState, FormEvent } from 'react';
import UploadButton from './uploadbtn';
import InputWithSpeech from './ui/inputWithSpeech';
import { useNavigate, useParams } from 'react-router-dom';
import Navbar from './navbar2';
import { productApi } from '../services/productApi';
import { toast } from 'react-toastify';
import axios from 'axios';

interface ProductData {
  productId: string;
  category: string;
  uploadedImages: string[];
  brand?: string | undefined;
  productName?: string | undefined;
  quantity?: number | undefined;
  price?: number | undefined;
  expiryDate?: string | undefined;
  manufacturingDate?: string | undefined;
  description?: string | undefined;
}

const UploadImage = () => {
  const [productId, setProductId] = useState<string>('');
  const [category, setCategory] = useState<string>('');
  const [uploadedImages, setUploadedImages] = useState<string[]>([]);
  const [brand, setBrand] = useState<string | undefined>(undefined);
  const [productName, setProductName] = useState<string | undefined>(undefined);
  const [quantity, setQuantity] = useState<number | undefined>(undefined);
  const [price, setPrice] = useState<number | undefined>(undefined);
  const [expiryDate, setExpiryDate] = useState<string | undefined>(undefined);
  const [manufacturingDate, setManufacturingDate] = useState<string | undefined>(undefined);
  const [description, setDescription] = useState<string | undefined>(undefined);
  const navigate = useNavigate();
  const { userId } = useParams();

  const handleImageChange = async (imageFile: File) => {
    const formData = new FormData();
    formData.append('image', imageFile);

    try {
      const response = await fetch('http://localhost:3002/user/upload-image', {
        method: 'POST',
        body: formData,
      });
      const data = await response.json();
      if (response.ok) {
        console.log(data.data);
        setUploadedImages((prevUploadedImages) => [...prevUploadedImages, data.data.imageUrl]);
        toast.success('Image uploaded successfully');
      } else {
        toast.error('Error uploading image');
        console.error('Error uploading image:', data.message);
      }
    } catch (error) {
      toast.error('Error uploading image');
      console.error('Error uploading image:', error);
    }
  };

  const handleCancelButton = () => {
    navigate(`/genvision/${userId}`);
  }

  const handleGetDescription = async (imageSrc:string) => {
    const prompt = '`Use the following details to write a short description about the product. Details are `';

    try {
      const response = await axios.post('http://localhost:3002/user/get-description', {
        imageUrl: imageSrc,
        prompt: prompt
      });

      if (response.data && response.data.message) {
        setDescription(response.data.message);
      } else {
        console.error('Unexpected response format:', response);
      }
    } catch (error) {
      console.error('Error fetching description:', error);
    }
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const productData: ProductData = {
      productId,
      category,
      uploadedImages,
      brand,
      productName,
      quantity,
      price,
      expiryDate,
      manufacturingDate,
      description,
    };

    productApi.createProduct(
      productData,
      (data:any) => {
        // Handle success (e.g., show success message, navigate to another page)
        console.log('Product created successfully:', data);
        setProductId('');
        setCategory('');
        setBrand('');
        setProductName('');
        setPrice(undefined);
        setQuantity(undefined);
        setExpiryDate('');
        setUploadedImages([]);
        setManufacturingDate('');
        setDescription('');
        navigate(`/genvision/${userId}`);
      },
      (error:any) => {
        // Handle error (e.g., show error message)
        console.error('Error creating product:', error);
      }
    );
  };

  return (
    <div>
      <style>{`
      .image-container:hover .hidden-on-load {
        display: block;
      }
      .hidden-on-load {
        display: none;
      }

      .hidden-on-load:hover {
        display: block;
      }
    `}
</style>
      <Navbar />
      <div className="flex-1 bg-black mx-7 my-7 flex">
        <div className="w-1/3 bg-white border-[#D4D4D4]">
          <div className="h-[350px] bg-white p-4 rounded-b-lg">
            <h1 className="font-bold text-[#000000] mx-2 text-xl">Add New Product</h1>
            <div className="mt-4 mx-2">
              <div className="mx-0">
                <UploadButton onImageChange={handleImageChange} />
              </div>
              <form className="mt-4" action="" onSubmit={handleSubmit}>
                <div className="mb-4">
                  <InputWithSpeech
                    placeholder="Brand Name"
                    label="Brand"
                    inputValue={brand}
                    setInput={setBrand}
                    name="brand"
                    disabled={false}
                  />
                </div>
                <div className="mb-4">
                  <InputWithSpeech
                    placeholder="Product Name"
                    label="Product"
                    inputValue={productName}
                    setInput={setProductName}
                    name="productName"
                    disabled={false}
                  />
                </div>
                {/* <div className="mb-4">
                  <InputWithSpeech
                    placeholder="Product Id Required."
                    label="Product ID"
                    inputValue={productId}
                    setInput={setProductId}
                    name="productId"
                    disabled={false}
                  />
                </div> */}
                <div className="mb-4">
                  <InputWithSpeech
                    placeholder="Category Required."
                    label="Category"
                    inputValue={category}
                    setInput={setCategory}
                    name="category"
                    disabled={false}
                  />
                </div>
                <div className="mb-4 flex">
                  <div className="mr-2 flex-1">
                    <label htmlFor="quantity" className="block font-bold text-[#000000]">
                      Quantity
                    </label>
                    <input
                      type="number"
                      id="quantity"
                      name="quantity"
                      placeholder="Quantity Required."
                      className="border border-grey-300 shadow p-1 w-full rounded"
                      value={quantity}
                      onChange={(e) => setQuantity(parseInt(e.target.value))}
                    />
                  </div>
                  <div className="mr-2 flex-1">
                    <label htmlFor="price" className="block font-bold text-[#000000]">
                      Price
                    </label>
                    <input
                      type="number"
                      id="price"
                      name="price"
                      placeholder="Price Required."
                      className="border border-grey-300 shadow p-1 w-full rounded"
                      value={price}
                      onChange={(e) => setPrice(parseInt(e.target.value))}
                    />
                  </div>
                </div>

                <div className='mb-4'>
                <label htmlFor="description" className="block font-bold text-[#000000]">
                    Description
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    placeholder="Description Required."
                    className="border border-gray-300 shadow p-1 w-full rounded"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                  </div>

                <div className="mb-4">
                  <label htmlFor="manufacturingDate" className="block font-bold text-[#000000]">
                    Manufacturing Date
                  </label>
                  <input
                    type="date"
                    id="manufacturingDate"
                    name="manufacturingDate"
                    placeholder="Manufacturing Date Required."
                    className="border border-gray-300 shadow p-1 w-full rounded"
                    value={manufacturingDate}
                    onChange={(e) => setManufacturingDate(e.target.value)}
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="expiryDate" className="block font-bold text-[#000000]">
                    Expiry Date
                  </label>
                  <input
                    type="date"
                    id="expiryDate"
                    name="expiryDate"
                    placeholder="Expiry Date Required."
                    className="border border-gray-300 shadow p-1 w-full rounded"
                    value={expiryDate}
                    onChange={(e) => setExpiryDate(e.target.value)}
                  />
                </div>
                <div className="flex gap-4 mt-4">
                  <button
                    type="button"
                    onClick={handleCancelButton}
                    className="bg-[#FEFBFF] w-1/2 items-center justify-center px-2 py-2 font-medium rounded-md cursor-pointer border border-violet-600"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="bg-[#623FC4] w-1/2 items-center justify-center font-medium rounded-md cursor-pointer text-white"
                  >
                    Add Product
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
        <div className="w-2/3 bg-white p-8">
          <div className="flex flex-row flex-wrap overflow-y-auto gap-4 border p-5 rounded-md border-[#623FC4]">
            {uploadedImages.map((imageSrc, index) => (
              <div  className='relative image-container'>
              <div key={index} className="flex w-[200px] h-[200px]">
                <img src={imageSrc} alt={`Image ${index}`} />
              </div>
              <div className="hidden-on-load w-2/3 rounded absolute bottom-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2  gap-2 p-1 text-center flex flex-row" >
                  <button className='p-1 mx-1 rounded' style={{background:'white',border:"1px solid black"}}>
                  <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="25" height="25" viewBox="0 0 100 100">
<path d="M 46 13 C 44.35503 13 43 14.35503 43 16 L 43 18 L 32.265625 18 C 30.510922 18 28.879517 18.922811 27.976562 20.427734 L 26.433594 23 L 23 23 C 20.802666 23 19 24.802666 19 27 C 19 29.197334 20.802666 31 23 31 L 24.074219 31 L 27.648438 77.458984 C 27.88773 80.575775 30.504529 83 33.630859 83 L 66.369141 83 C 69.495471 83 72.11227 80.575775 72.351562 77.458984 L 75.925781 31 L 77 31 C 79.197334 31 81 29.197334 81 27 C 81 24.802666 79.197334 23 77 23 L 73.566406 23 L 72.023438 20.427734 C 71.120481 18.922811 69.489078 18 67.734375 18 L 57 18 L 57 16 C 57 14.35503 55.64497 13 54 13 L 46 13 z M 46 15 L 54 15 C 54.56503 15 55 15.43497 55 16 L 55 18 L 45 18 L 45 16 C 45 15.43497 45.43497 15 46 15 z M 32.265625 20 L 43.832031 20 A 1.0001 1.0001 0 0 0 44.158203 20 L 55.832031 20 A 1.0001 1.0001 0 0 0 56.158203 20 L 67.734375 20 C 68.789672 20 69.763595 20.551955 70.306641 21.457031 L 71.833984 24 L 68.5 24 A 0.50005 0.50005 0 1 0 68.5 25 L 73.5 25 L 77 25 C 78.116666 25 79 25.883334 79 27 C 79 28.116666 78.116666 29 77 29 L 23 29 C 21.883334 29 21 28.116666 21 27 C 21 25.883334 21.883334 25 23 25 L 27 25 L 61.5 25 A 0.50005 0.50005 0 1 0 61.5 24 L 28.166016 24 L 29.693359 21.457031 C 30.236405 20.551955 31.210328 20 32.265625 20 z M 64.5 24 A 0.50005 0.50005 0 1 0 64.5 25 L 66.5 25 A 0.50005 0.50005 0 1 0 66.5 24 L 64.5 24 z M 26.078125 31 L 73.921875 31 L 70.357422 77.306641 C 70.196715 79.39985 68.46881 81 66.369141 81 L 33.630859 81 C 31.53119 81 29.803285 79.39985 29.642578 77.306641 L 26.078125 31 z M 38 35 C 36.348906 35 35 36.348906 35 38 L 35 73 C 35 74.651094 36.348906 76 38 76 C 39.651094 76 41 74.651094 41 73 L 41 38 C 41 36.348906 39.651094 35 38 35 z M 50 35 C 48.348906 35 47 36.348906 47 38 L 47 73 C 47 74.651094 48.348906 76 50 76 C 51.651094 76 53 74.651094 53 73 L 53 69.5 A 0.50005 0.50005 0 1 0 52 69.5 L 52 73 C 52 74.110906 51.110906 75 50 75 C 48.889094 75 48 74.110906 48 73 L 48 38 C 48 36.889094 48.889094 36 50 36 C 51.110906 36 52 36.889094 52 38 L 52 63.5 A 0.50005 0.50005 0 1 0 53 63.5 L 53 38 C 53 36.348906 51.651094 35 50 35 z M 62 35 C 60.348906 35 59 36.348906 59 38 L 59 39.5 A 0.50005 0.50005 0 1 0 60 39.5 L 60 38 C 60 36.889094 60.889094 36 62 36 C 63.110906 36 64 36.889094 64 38 L 64 73 C 64 74.110906 63.110906 75 62 75 C 60.889094 75 60 74.110906 60 73 L 60 47.5 A 0.50005 0.50005 0 1 0 59 47.5 L 59 73 C 59 74.651094 60.348906 76 62 76 C 63.651094 76 65 74.651094 65 73 L 65 38 C 65 36.348906 63.651094 35 62 35 z M 38 36 C 39.110906 36 40 36.889094 40 38 L 40 73 C 40 74.110906 39.110906 75 38 75 C 36.889094 75 36 74.110906 36 73 L 36 38 C 36 36.889094 36.889094 36 38 36 z M 59.492188 41.992188 A 0.50005 0.50005 0 0 0 59 42.5 L 59 44.5 A 0.50005 0.50005 0 1 0 60 44.5 L 60 42.5 A 0.50005 0.50005 0 0 0 59.492188 41.992188 z"></path>
</svg>
                  </button>
                  <button className='p-1  rounded border-right ' onClick={() => {}} style={{background:'white',border:"1px solid black"}}>
                  <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="25" height="25" viewBox="0 0 50 50">
<path d="M 21 3 C 11.621094 3 4 10.621094 4 20 C 4 29.378906 11.621094 37 21 37 C 24.710938 37 28.140625 35.804688 30.9375 33.78125 L 44.09375 46.90625 L 46.90625 44.09375 L 33.90625 31.0625 C 36.460938 28.085938 38 24.222656 38 20 C 38 10.621094 30.378906 3 21 3 Z M 21 5 C 29.296875 5 36 11.703125 36 20 C 36 28.296875 29.296875 35 21 35 C 12.703125 35 6 28.296875 6 20 C 6 11.703125 12.703125 5 21 5 Z"></path>
</svg>
                  </button>
                  <button className='my-auto' onClick={ () => handleGetDescription(imageSrc)} style={{background:'white',border:"1px solid black"}}>
                  <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="25" height="25" viewBox="0 0 50 50">
<path d="M 7 2 L 7 48 L 43 48 L 43 14.59375 L 42.71875 14.28125 L 30.71875 2.28125 L 30.40625 2 Z M 9 4 L 29 4 L 29 16 L 41 16 L 41 46 L 9 46 Z M 31 5.4375 L 39.5625 14 L 31 14 Z"></path>
</svg>
                  </button>
              </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UploadImage;
