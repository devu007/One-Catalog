// import React from 'react'

// import Feature from './reusableFeatures';
import InfoBox from './reusableInfobox';
import { Separator } from './ui/separator';
import { useEffect, useState } from 'react';
import { productApi } from '@/services/productApi';
import { toast } from 'react-toastify';
import { useParams } from 'react-router-dom';
import axios from 'axios';

interface ProductData {
  _id: string;
  category: string;
  uploadedImages: string[];
  brand?: string;
  productName?: string;
  quantity?: number;
  price?: number;
  expiryDate?: string;
  manufacturingDate?: string;
  description: string;
}


export default function Text1() {

  const [prompt, setPrompt] = useState<string>("");
  const [description,setDescription] = useState<string>("");
  const [selectedOption, setSelectedOption] = useState<string>('');

  const [product, setProduct] = useState<ProductData | null>(null);
  const { userId, productId } = useParams<{ userId: string; productId: string }>();

  useEffect(() => {
    productApi.getProduct(
      productId!,
      (data: any) => {
        setProduct(data.product);
      },
      (error: any) => {
        toast.error('Error fetching product data');
        console.error('Error fetching product data:', error);
      }
    );
  });
  
  const handleSelect = (title: string) => {
    setSelectedOption(title);
    console.log(title);
    
  };
  
  const handleGenerateClick = async () => {
  try {
    console.log("clicked");
    if(selectedOption === "E-commerce") setPrompt(`Given the following product description: ${product!.brand}, ${product!.description}. Create text content for E-commerce Listing. Export heading, description and key features as JSON format only`);
    if(selectedOption === "Social Media") setPrompt(`Given the following product description: ${product!.brand}, ${product!.description}. Create text content for E-commerce Listing. Create text content for social media. Export caption, and hashtag as JSON format only`);
    if(selectedOption === "Advertisement") setPrompt(`Given the following product description: ${product!.brand}, ${product!.description}.Create text content for Ad campaign. Export headline, body, and keywords as JSON format only`)
    
      try {
        const response = await axios.post('http://localhost:3002/user/get-text-description', {
          prompt: prompt
        });
  
        if (response.data && response.data.message) {
          
          setDescription(response.data.message);
          console.log(response.data.message);
          // console.log(JSON.parse(response.data.message));
          
        } else {
          console.error('Unexpected response format:', response);
        }
      } catch (error) {
        console.error('Error fetching description:', error);
      }

    // Handle the response as needed (e.g., update state in a React component)
    // For example, using React state:
    // setGeneratedResponse(response);
  } catch (error) {
    console.error('Error generating response:', error);
    // Handle errors as needed
  }
};

  return (
    <div className="flex ">
      <div className="w-1/3 flex flex-col  h-full border-[#D4D4D4] rounded-b-lg mt-4 ">
        {/* <h1 className="text-[#000000] mb-5 text-base font-semibold">
          Describe about background
        </h1>
        <div className="mb-9">
          <label
            htmlFor="description"
            className="block text-sm font-medium text-gray-700 "
          ></label>
          <textarea
            id="description"
            name="description"
            rows={5}
            className="mt-1 p-2 block w-full border border-gray-300 rounded-md focus:ring focus:ring-indigo-200 focus:outline-none focus:border-indigo-400 sm:text-sm"
            placeholder="Type your message here"
            onChange={(e:any)=>{
              setPrompt(e.target.value)
            }}
          />
        </div>
        <Separator /> */}

        <div>
      <h1 className="text-[#000000] mt-9 text-base font-semibold">Templates</h1>
      <br />
      <InfoBox
        title="E-commerce"
        description="Create heading, key points & descriptions"
        isSelected={selectedOption === 'E-commerce'}
        handleSelect={handleSelect}
      />
      <br />
      <InfoBox
        title="Social Media"
        description="Create content for social media post"
        isSelected={selectedOption === 'Social Media'}
        handleSelect={handleSelect}
      />
      <br />
      <InfoBox
        title="Advertisement"
        description="Create content optimized for Ad campaigns"
        isSelected={selectedOption === 'Advertisement'}
        handleSelect={handleSelect}
      />
      <br />
    </div>
        <div className="flex gap-4 mt-1 bottom-0">
          <button
            className="bg-[#FEFBFF] w-1/2 items-center justify-center px-2 py-2 font-semibold rounded-md cursor-pointer border border-[#623FC4]"
            disabled
          >
            Next
          </button>
          <button className="bg-[#623FC4] w-1/2 items-center justify-center font-semibold rounded-md cursor-pointer text-white" onClick={handleGenerateClick}>
            Generate
          </button>
        </div>
      </div>
      <Separator orientation="vertical" className="" />
      <div className="w-2/3 bg-white p-8">
        <div className="w-full h-[350px] rounded-md border border-[#623FC4] p-4 overflow-auto">{description}</div>
      </div>
    </div>
  );
}
