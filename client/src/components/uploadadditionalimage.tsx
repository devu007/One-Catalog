import React, { useState, useEffect, FormEvent } from 'react';
import UploadButton from './uploadbtn';
import InputWithSpeech from './ui/inputWithSpeech';
import { useNavigate, useParams } from 'react-router-dom';
import { productApi } from '../services/productApi';
import { toast } from 'react-toastify';

interface ProductData {
  _id: string;
  category: string;
  uploadedImages: string[];
  brand?: string;
  productName?: string;
  quantity?: number;
  price?: number;
  expiryDate?: string;
  manufacturingDate?:string;
}
interface UploadAdditionalImageProps {
  handleToggleModal: () => void;
}

const UploadAdditionalImage: React.FC<UploadAdditionalImageProps> = ({
  handleToggleModal
}) => {
  const [product, setProduct] = useState<ProductData | null>(null);
  const [uploadedImages, setUploadedImages] = useState<string[]>([]);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const navigate = useNavigate();
  const { userId, productId } = useParams<{ userId: string; productId: string }>();

  useEffect(() => {
    productApi.getProduct(
      productId!,
      (data: any) => {
        setProduct(data.product);
        setUploadedImages(data.product.uploadedImages);
      },
      (error: any) => {
        toast.error('Error fetching product data');
        console.error('Error fetching product data:', error);
      }
    );
  }, [productId]);

  const handleImageClick = (imageSrc: string) => {
    if (selectedImage === imageSrc) setSelectedImage(null);
    else setSelectedImage(imageSrc);
  };
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

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!product) return;

    const updatedProduct = { ...product, uploadedImages };

    productApi.updateProduct(
      productId!,
      {updatedProduct,sendNew:false},
      (data: any) => {
        toast.success('Product updated successfully');
        handleToggleModal();
        navigate(`/genvision/${userId}/${productId}`);
      },
      (error: any) => {
        toast.error('Error updating product');
        console.error('Error updating product:', error);
      }
    );

  };

  if (!product) {
    return <div>Loading...</div>;
  }

  function handleDeleteButton(imageSrc: string): void {
    throw new Error('Function not implemented.');
  }

  return (
    <div className="flex-1 bg-black mx-7 my-7 flex rounded">
      <div className="w-1/3 bg-white border-[#D4D4D4]">
        <div className="h-[350px] bg-white p-4 rounded-b-lg">
          <h1 className="font-bold text-[#000000] mx-2 text-xl">
            Add Additional Images
          </h1>
          <div className="mt-4 mx-2">
            <div className="mx-0">
              <UploadButton onImageChange={handleImageChange} />
            </div>
            <form className="mt-4" action="" onSubmit={handleSubmit}>
              <div className="mb-4">
                <InputWithSpeech
                  placeholder="Brand Name"
                  label="Brand"
                  inputValue={product.brand}
                  setInput={() => {}}
                  name="brand"
                  disabled={true}
                />
              </div>
              <div className="mb-4">
                <InputWithSpeech
                  placeholder="Product Name"
                  label="Product"
                  inputValue={product.productName}
                  setInput={() => {}}
                  name="productName"
                  disabled={true}
                />
              </div>

              <div className="mb-4">
                <InputWithSpeech
                  placeholder="Product Id Required."
                  label="Product ID"
                  inputValue={product._id}
                  setInput={() => {}}
                  name="productId"
                  disabled={true}
                />
              </div>

              <div className="mb-4">
                <InputWithSpeech
                  placeholder="Category Required."
                  label="Category"
                  inputValue={product.category}
                  setInput={() => {}}
                  name="category"
                  disabled={true}
                />
              </div>

              <div className="mb-4 flex">
                <div className="mr-2 flex-1">
                  <label
                    htmlFor="quantity"
                    className="block font-bold text-[#000000]"
                  >
                    Quantity
                  </label>
                  <input
                    type="number"
                    id="quantity"
                    name="quantity"
                    placeholder="Quantity Required."
                    className="border border-grey-300 shadow p-1 w-full rounded"
                    value={product.quantity}
                    disabled
                  />
                </div>

                <div className="mr-2 flex-1">
                  <label
                    htmlFor="price"
                    className="block font-bold text-[#000000]"
                  >
                    Price
                  </label>
                  <input
                    type="number"
                    id="price"
                    name="price"
                    placeholder="Price Required."
                    className="border border-grey-300 shadow p-1 w-full rounded"
                    value={product.price}
                    disabled
                  />
                </div>
              </div>

              <div className="mb-4">
                <label
                  htmlFor="expiryDate"
                  className="block font-bold text-[#000000]"
                >
                  Manufacturing Date
                </label>
                <input
                  type="text"
                  id="manufacturingDate"
                  name="manufacturingDate"
                  placeholder="Manufacturing Date Required."
                  className="border border-gray-300 shadow p-1 w-full rounded"
                  value={product.manufacturingDate}
                  disabled
                />
              </div>

              <div className="mb-4">
                <label
                  htmlFor="expiryDate"
                  className="block font-bold text-[#000000]"
                >
                  Expiry Date
                </label>
                <input
                  type="text"
                  id="expiryDate"
                  name="expiryDate"
                  placeholder="Manufacturing / Expiry Date Required."
                  className="border border-gray-300 shadow p-1 w-full rounded"
                  value={product.expiryDate}
                  disabled
                />
              </div>

              <div className="flex gap-4 mt-4">
                <button
                  type="button"
                  className="bg-[#FEFBFF] w-1/2 items-center justify-center px-2 py-2 font-medium rounded-md cursor-pointer border border-violet-600"
                  onClick={() => handleToggleModal()}
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="bg-[#623FC4] w-1/2 items-center justify-center font-medium rounded-md cursor-pointer text-white"
                >
                  Done
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <div className="w-2/3 bg-white p-8">
        <div className="flex flex-row flex-wrap overflow-y-auto h-2/3 border p-5 rounded-md border-[#623FC4]">
          {uploadedImages.map((imageSrc, index) => (
            <div key={index} className= {`relative border-2 rounded m-2 p-2 ${selectedImage === imageSrc ? 'border-4 border-blue-500' : ''}`} onClick={() => handleImageClick(imageSrc)}>
              <div className='w-[200px] h-[200px]'> 
                <img src={imageSrc} alt={`Image ${index}`} className='w-full h-full'/>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UploadAdditionalImage;
