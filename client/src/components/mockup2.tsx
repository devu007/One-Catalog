import React, { useState, useEffect } from 'react';
import { Form, Input, Button, Select } from 'antd';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import { Card, CardContent } from '@/components/ui/card';
import Navbar from './navbar2';
import template1 from '../assets/images/mockup_template1.png';
import template2 from '../assets/images/mockup_template2.png';
import template3 from '../assets/images/mockup_template3.png';
import getChatGPTResponse from '@/api/chatGPTResponse';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import EmptyCard from './EmptyCard';

const { Option } = Select;

const Mockup2: React.FC = () => {
  const { userId, productId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const [prompt, setPrompt] = useState<string>('');
  const [description, setDescription] = useState<string>(
    'Please wait..Loading!!!!!!',
  );
  const [placement, setPlacement] = useState<string>('on');
  const [placementInput, setPlacementInput] = useState<string>('');
  const [backgroundInput, setBackgroundInput] = useState<string>(''); // New state for background input
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);
  const [uploadedImages, setUploadedImages] = useState<string[]>([]); // State to store uploaded images
  const [selectedImage, setSelectedImage] = useState<string | null>(null); // State to store selected image

  useEffect(() => {
    // Fetch uploaded images from location state or localStorage
    const images =
      location.state?.uploadedImages ||
      JSON.parse(localStorage.getItem('uploadedImages') || '[]');
    setUploadedImages(images);
  }, [location.state]);

  const handleTemplateClick = (template: string) => {
    setSelectedTemplate(template);
  };

  const handleBackButtonClick = () => {
    navigate(`/genvision/${userId}/${productId}/mockup/1`);
  };

  const handleGenerateClick = async () => {
    try {
      setPrompt(
        `Generate a digital catalog for my shop that includes detailed information about each item, such as product names, descriptions, prices, and any special offers. The catalog should be visually appealing and easy to share with customers. Ensure that the information is accurate and up-to-date. Thank you! in 400 words ${prompt}`,
      );
      const response = await getChatGPTResponse(prompt);
      setDescription(response);
    } catch (error) {
      console.error('Error generating response:', error);
    }
  };

  const handleImageClick = (image: string) => {
    setSelectedImage(image);
  };

  return (
    <div className="font-poppins">
      <Navbar productName={productId} />
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
        <div className="flex">
          <div className="w-1/3 bg-white p-4">
            <div className="h-[350px] bg-white p-4 rounded-b-lg">
              <div className="mt-4 mx-2">
                <Form layout="vertical" onFinish={handleGenerateClick}>
                  <Form.Item label="Prompt">
                    <Input.TextArea
                      rows={5}
                      placeholder="Type your message here"
                      value={prompt}
                      onChange={e => setPrompt(e.target.value)}
                    />
                  </Form.Item>
                  <Form.Item label="Placement">
                    <div className="flex space-x-2">
                      <Select
                        value={placement}
                        onChange={value => setPlacement(value)}
                        style={{ width: '120px' }}
                      >
                        <Option value="on">On</Option>
                        <Option value="below">Below</Option>
                        <Option value="of">Of</Option>
                      </Select>
                      <Input
                        placeholder="Enter title"
                        value={placementInput}
                        onChange={e => setPlacementInput(e.target.value)}
                      />
                    </div>
                  </Form.Item>
                  <Form.Item label="Background">
                    {' '}
                    {/* New input field for background */}
                    <Input
                      placeholder="Enter background details"
                      value={backgroundInput}
                      onChange={e => setBackgroundInput(e.target.value)}
                    />
                  </Form.Item>
                  <h1 className="text-[#000000] mt-9 text-base font-semibold">
                    Templates
                  </h1>
                  <div className="flex mt-2 space-x-2">
                    <img
                      src={template1}
                      alt="Template 1"
                      className={`w-24 h-24 ${
                        selectedTemplate === 'template1'
                          ? 'border-2 bg-purple-500'
                          : ''
                      }`}
                      onClick={() => handleTemplateClick('template1')}
                    />
                    <img
                      src={template2}
                      alt="Template 2"
                      className={`w-24 h-24 ${
                        selectedTemplate === 'template2'
                          ? 'border-2 bg-purple-500'
                          : ''
                      }`}
                      onClick={() => handleTemplateClick('template2')}
                    />
                    <img
                      src={template3}
                      alt="Template 3"
                      className={`w-24 h-24 ${
                        selectedTemplate === 'template3'
                          ? 'border-2 bg-purple-500'
                          : ''
                      }`}
                      onClick={() => handleTemplateClick('template3')}
                    />
                  </div>
                  <Button
                    className="w-full mt-4"
                    type="primary"
                    htmlType="submit"
                    style={{
                      backgroundColor: '#623FC4',
                      borderColor: '#623FC4',
                    }}
                  >
                    Generate
                  </Button>
                </Form>
              </div>
            </div>
          </div>

          <div className="w-2/3 ml-4">
            <div className="bg-white border-2 p-4 " style={{ height: '370px' }}>
              <div className="h-[200px]">
                <Carousel>
                  <CarouselContent>
                    <CarouselPrevious>
                      <LeftOutlined />
                    </CarouselPrevious>
                    {selectedImage && (
                      <CarouselItem>
                        <EmptyCard imageUrl={selectedImage} />
                      </CarouselItem>
                    )}
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
                <button className="py-2 px-3 underline text-[#623FC4] font-normal rounded duration-300">
                  Uploaded Images
                </button>
              </div>
              <div className="h-[160px]">
                <Carousel>
                  <CarouselContent className="flex space-x-2 ml-2">
                    {uploadedImages.map((image, index) => (
                      <CarouselItem
                        key={index}
                        className="flex-shrink-0 w-1/4 p-1"
                        style={{ maxWidth: '110px' }}
                      >
                        <Card>
                          <CardContent className="flex aspect-square items-center justify-center p-1">
                            <img
                              src={image}
                              alt={`Uploaded image ${index + 1}`}
                              onClick={() => handleImageClick(image)}
                              className={`${
                                selectedImage === image
                                  ? 'border-4 border-blue-500'
                                  : ''
                              } cursor-pointer`}
                              style={{
                                width: '100%',
                                height: '100%',
                                objectFit: 'cover',
                              }}
                            />
                          </CardContent>
                        </Card>
                      </CarouselItem>
                    ))}
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

export default Mockup2;
