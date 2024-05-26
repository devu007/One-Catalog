// import React from 'react'

// import Feature from './reusableFeatures';
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

import template1  from '../assets/images/template1.png';
import template2 from '../assets/images/template2.png';
import Text2_Template1 from './text2_template1';
import Text2_Template2 from './text2_template2';


export default function Text2() {

  const [prompt, setPrompt] = useState<string>("");
  const [description,setDescription] = useState<string>("");
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);
  
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

  const handleTemplateClick = (template: string) => {
    setSelectedTemplate(template);
    console.log(template);
    
  };
  
  
  const handleGenerateClick = async () => {
    try {
      console.log("clicked");
      // setDescription("Loading!!!")
      setPrompt(`Given the following product description: ${product!.brand}, ${product!.description}. Create 4 points having heading and description. Export heading and description as JSON format.`);
      
        try {
          const response = await axios.post('http://localhost:3002/user/get-text-description', {
            prompt: prompt
          });
    
          if (response.data && response.data.message) {
            setDescription(response.data.message);
            // console.log(response);
            
            console.log(description);
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
          Describe about the product
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
          <h1 className="text-[#000000] mt-9 text-base font-semibold">
            Templates
          </h1>
            <br />
            <div className="flex">
              <img
                src={template1}
                alt="Template 1"
                className={`w-48 h-48 mr-10 ${selectedTemplate === 'template1' ? 'border-2 bg-purple-500' : ''}`}
                onClick={() => handleTemplateClick('template1')}
              />
              <img
                src={template2}
                alt="Template 2"
                className={`w-48 h-48 ${selectedTemplate === 'template2' ? 'border-2 bg-purple-500' : ''}`}
                onClick={() => handleTemplateClick('template2')}
              />
           </div>
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
        <div className="w-full h-[500px] rounded-md border border-[#623FC4] p-4 overflow-auto">
          {
            selectedTemplate?
            selectedTemplate === 'template1'?
            <Text2_Template1 />:<Text2_Template2 />
            :
            <></>
          }
        </div>
      </div>
    </div>
    // <div>Hi</div>
  );
}
