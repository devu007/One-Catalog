import React, { useState, useEffect } from 'react';
import { Form, Input, Select, Button } from 'antd';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import UploadButton from './uploadbtn';
import { useNavigate, useParams } from 'react-router-dom';
import Navbar from './navbar2';
import { productApi } from '../services/productApi';
import { toast } from 'react-toastify';
import axios from 'axios';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import EmptyCard from './EmptyCard';

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

const { Option } = Select;

const UploadImage = () => {
  const [productId, setProductId] = useState<string>('');
  const [category, setCategory] = useState<string>('');
  const [uploadedImages, setUploadedImages] = useState<string[]>([]);
  const [brand, setBrand] = useState<string | undefined>(undefined);
  const [productName, setProductName] = useState<string | undefined>(undefined);
  const [quantity, setQuantity] = useState<number | undefined>(undefined);
  const [price, setPrice] = useState<number | undefined>(undefined);
  const [expiryDate, setExpiryDate] = useState<string | undefined>(undefined);
  const [manufacturingDate, setManufacturingDate] = useState<
    string | undefined
  >(undefined);
  const [description, setDescription] = useState<string | undefined>(undefined);
  const [selectedSection, setSelectedSection] = useState<string>('upload'); // State to track selected section
  const [selectedImage, setSelectedImage] = useState<string | null>(null); // State to track selected image
  const [initialImages, setInitialImages] = useState<string[]>([]);
  const [carouselSection, setCarouselSection] = useState<string>('uploaded'); // State to track carousel section
  const navigate = useNavigate();
  const { userId, id } = useParams();

  useEffect(() => {
    if (id) {
      // Fetch existing product data if id is provided
      productApi.getProduct(
        id,
        (data: ProductData) => {
          setProductId(data.productId);
          setCategory(data.category);
          setUploadedImages(data.uploadedImages);
          setBrand(data.brand);
          setProductName(data.productName);
          setQuantity(data.quantity);
          setPrice(data.price);
          setExpiryDate(data.expiryDate);
          setManufacturingDate(data.manufacturingDate);
          setDescription(data.description);
        },
        (error: any) => {
          console.error('Error fetching product data:', error);
        },
      );
    }
  }, [id]);

  const handleImageChange = async (imageFile: File) => {
    const formData = new FormData();
    formData.append('image', imageFile);

    try {
      const response = await fetch('http://3.94.127.121/image/upload-image', {
        method: 'POST',
        body: formData,
      });
      const data = await response.json();
      if (response.ok) {
        console.log(data.data);
        setInitialImages(prevImages => [...prevImages, data.data.imageUrl]);
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

  const handleImageUpdate = async (imageFile: File, imageUrl: string) => {
    const formData = new FormData();
    formData.append('image', imageFile);

    try {
      const response = await fetch(
        `http://3.94.127.121/image/update-image/${imageUrl}`,
        {
          method: 'PUT',
          body: formData,
        },
      );
      const data = await response.json();
      if (response.ok) {
        console.log(data.data);
        setUploadedImages(prevUploadedImages =>
          prevUploadedImages.map(img =>
            img === imageUrl ? data.data.imageUrl : img,
          ),
        );
        toast.success('Image updated successfully');
      } else {
        toast.error('Error updating image');
        console.error('Error updating image:', data.message);
      }
    } catch (error) {
      toast.error('Error updating image');
      console.error('Error updating image:', error);
    }
  };

  const handleCancelButton = () => {
    navigate(`/genvision/${userId}`);
  };

  const handleGetDescription = async (imageSrc: string) => {
    const prompt =
      'Use the following details to write a short description about the product. Details are ';

    try {
      const response = await axios.post(
        'http://localhost:3002/image/analysis',
        {
          imageUrl: imageSrc,
          prompt: prompt,
        },
      );

      if (response.data && response.data.message) {
        setDescription(response.data.message);
      } else {
        console.error('Unexpected response format:', response);
      }
    } catch (error) {
      console.error('Error fetching description:', error);
    }
  };

  const handleSubmit = (values: any) => {
    const productData: ProductData = {
      productId,
      category,
      uploadedImages,
      brand,
      productName: values.productName,
      quantity: values.quantity,
      price: values.price,
      expiryDate: values.expiryDate,
      manufacturingDate: values.manufacturingDate,
      description,
    };

    const onSuccess = (data: any) => {
      console.log('Product created/updated successfully:', data);
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
    };

    const onError = (error: any) => {
      console.error('Error creating/updating product:', error);
    };

    if (id) {
      productApi.updateProduct(id, productData, onSuccess, onError);
    } else {
      productApi.createProduct(productData, onSuccess, onError);
    }
  };

  const handleImageClick = (image: string) => {
    setUploadedImages(prevImages => [...prevImages, image]);
    setInitialImages(prevImages => prevImages.filter(img => img !== image));
  };

  return (
    <div className="font-poppins">
      <Navbar />
      <div className="bg-white mx-7 my-7">
        <div className="bg-white p-4 flex space-x-1 items-center">
          <button className="py-2 px-3 bg-white text-black font-normal rounded hover:bg-[#623FC4] hover:text-white transition-colors duration-300">
            Edit Image
          </button>
          <button className="py-2 px-3 bg-white text-black font-normal rounded hover:bg-[#623FC4] hover:text-white transition-colors duration-300">
            Mock up
          </button>
          <button className="py-2 px-3 bg-white text-black font-normal rounded hover:bg-[#623FC4] hover:text-white transition-colors duration-300">
            Text
          </button>
        </div>
        <div className="h-px bg-gray-300 mt-1"></div>
        <div className="bg-white p-4 flex space-x-1 items-center mt-4">
          <button
            className={`py-2 px-3 ${
              selectedSection === 'upload'
                ? 'underline text-[#623FC4]'
                : 'bg-white text-black'
            } font-normal rounded hover:underline hover:text-[#623FC4] duration-300`}
            onClick={() => setSelectedSection('upload')}
          >
            Upload Image
          </button>
          <button
            className={`py-2 px-3 ${
              selectedSection === 'edit'
                ? 'underline text-[#623FC4]'
                : 'bg-white text-black'
            } font-normal rounded hover:underline hover:text-[#623FC4] duration-300`}
            onClick={() => setSelectedSection('edit')}
          >
            Edit Image
          </button>
        </div>
        <div className="flex">
          <div className="w-1/3 bg-white p-4">
            {selectedSection === 'upload' ? (
              <div className="h-[350px] bg-white p-4 rounded-b-lg">
                <div className="mt-4 mx-2">
                  <Form layout="vertical" onFinish={handleSubmit}>
                    <Form.Item
                      label="Name"
                      name="productName"
                      rules={[
                        {
                          required: true,
                          message: 'Please enter the product name',
                        },
                      ]}
                    >
                      <Input placeholder="Product Name" />
                    </Form.Item>
                    <Form.Item
                      label="Category"
                      name="category"
                      rules={[
                        { required: true, message: 'Please select a category' },
                      ]}
                    >
                      <Select placeholder="Select Category">
                        <Option value="Architecture">Architecture</Option>
                        <Option value="Nature">Nature</Option>
                        <Option value="Technology">Technology</Option>
                      </Select>
                    </Form.Item>
                    <UploadButton onImageChange={handleImageChange} />
                    <Button
                      className="w-full mt-2"
                      type="default"
                      onClick={() => setSelectedSection('edit')}
                    >
                      Edit Image
                    </Button>
                  </Form>
                </div>
              </div>
            ) : (
              <div className="h-[350px] bg-white p-4 rounded-b-lg">
                <h1 className="font-bold text-[#000000] mx-2 text-xl">
                  Edit Image
                </h1>
                <div className="mt-4 mx-2">
                  {/* Add content for editing images */}
                </div>
              </div>
            )}
          </div>

          <div className="w-2/3 ml-4">
            <div className="bg-white border-2 p-4 " style={{ height: '370px' }}>
              <div className="h-[200px]">
                <Carousel>
                  <CarouselContent>
                    <CarouselPrevious>
                      <LeftOutlined />
                    </CarouselPrevious>
                    {initialImages.length === 0 && (
                      <CarouselItem>
                        <EmptyCard />
                      </CarouselItem>
                    )}
                    {initialImages.map((image, index) => (
                      <CarouselItem key={index}>
                        <img
                          src={image}
                          alt={`uploaded ${index}`}
                          className="w-full h-full object-cover cursor-pointer"
                          onClick={() => handleImageClick(image)}
                        />
                      </CarouselItem>
                    ))}
                    <CarouselNext>
                      <RightOutlined />
                    </CarouselNext>
                  </CarouselContent>
                </Carousel>
              </div>
            </div>
            <div
              className="bg-white border-2 mt-4 p-4"
              style={{ height: '220px' }} // Adjusted height
            >
              <div className="bg-white p-4 flex space-x-1 items-center mb-2">
                <button
                  className={`py-2 px-3 ${
                    carouselSection === 'uploaded'
                      ? 'underline text-[#623FC4]'
                      : 'bg-white text-black'
                  } font-normal rounded hover:underline hover:text-[#623FC4] duration-300 `}
                  onClick={() => setCarouselSection('uploaded')}
                >
                  Uploaded
                </button>
                <button
                  className={`py-2 px-3 ${
                    carouselSection === 'mockup'
                      ? 'underline text-[#623FC4]'
                      : 'bg-white text-black'
                  } font-normal rounded hover:underline hover:text-[#623FC4] duration-300`}
                  onClick={() => setCarouselSection('mockup')}
                >
                  Mockup
                </button>
              </div>
              <div className="h-[160px]">
                {' '}
                {/* Adjusted height */}
                <Carousel>
                  <CarouselContent>
                    {carouselSection === 'uploaded' ? (
                      uploadedImages.length > 0 ? (
                        uploadedImages.map((image, index) => (
                          <CarouselItem key={index} className="basis-1/3">
                            <img
                              src={image}
                              alt={`Uploaded ${index}`}
                              className="w-full h-auto"
                            />
                          </CarouselItem>
                        ))
                      ) : (
                        <CarouselItem className="basis-1/3">
                          <div className="flex justify-center items-center h-full">
                            No image to be shown
                          </div>
                        </CarouselItem>
                      )
                    ) : (
                      <CarouselItem className="basis-1/3">
                        {/* Add mockup images here */}
                        <div className="flex justify-center items-center h-full">
                          No mockup images
                        </div>
                      </CarouselItem>
                    )}
                  </CarouselContent>
                  <CarouselPrevious className="text-black">
                    <LeftOutlined />
                  </CarouselPrevious>
                  <CarouselNext className="text-black">
                    <RightOutlined />
                  </CarouselNext>
                </Carousel>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UploadImage;
