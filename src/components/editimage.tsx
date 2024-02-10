import { Separator } from '@/components/ui/separator';
import InfoBox from './reusableInfobox';
import Feature from './reusableFeatures';
import { useEffect, useRef, useState } from 'react';


interface ProductData {
  id: string;
  category: string;
  uploadedImages: string;
  brand?: string | undefined;
  productName?: string | undefined;
  quantity?: number | undefined;
  price?: number | undefined;
  expiryDate?: string | undefined;
}

export default function EditImage() {
  const containerRef = useRef<HTMLDivElement | null>(null);

  const [uploadedImages, setUploadedImages] = useState<string[]>([]);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([]);
  const [generateButtonPressed, setGenerateButtonPressed] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [expectedWidht, setExpectedWidht] = useState<number>();
  const [expectedHeight, setExpectedHeight] = useState<number>();

  // Assume product is an array of ProductData objects
  const product: ProductData[] = JSON.parse(localStorage.getItem('product') || '[]');

    // Flatten all uploadedImages arrays into a single array
    useEffect(() => {
      if (generateButtonPressed) {
        // Call API and replace uploaded images
        setUploadedImages([]);
      }
      else{
      const allImages = product.reduce<string[]>((images, productItem) => {
        return [...images, ...productItem.uploadedImages];
      }, []);
      setUploadedImages(allImages);
      }
    }, [generateButtonPressed]);

  const handleImageClick = (imageSrc: string) => {
    // Toggle the selection state
    console.log(imageSrc);
    
    if(selectedImage===imageSrc) setSelectedImage(null);
    else setSelectedImage(imageSrc);
    console.log(selectedImage);
    
  };

  const getGridTemplateColumns = (numberOfColumns: number) => {
    return `repeat(${numberOfColumns}, minmax(0, 1fr))`;
  };

  
  const handleGenerateButtonClick = () => {
    // Set the button pressed state to trigger the effect
    setGenerateButtonPressed(true);
  };

  const handleFeatureSelect = (feature: string, selected: boolean) => {
    setSelectedFeatures((prevSelectedFeatures) => {
      // console.log(selectedFeatures);
      if (selected) {
        // Add to selected features array
        if(feature==='Upscale') setModalOpen(true);
        return [...prevSelectedFeatures, feature];
      } else {
        // Remove from selected features array
        if(feature==='Upscale'){
          setExpectedWidht(0);
          setExpectedHeight(0);
        }
        return prevSelectedFeatures.filter((item) => item !== feature);
      }
      
    });
  };

  return (
    <div className="flex" ref={containerRef}>
      <div className="w-1/3  border-[#D4D4D4] rounded-b-lg mt-4">
        <h1 className="text-[#000000] mb-5 text-base font-semibold">
          Select images to edit
        </h1>
        <Feature
          title="Remove Background"
          description="Remove the background of the image"
          onSelect={(selected) => handleFeatureSelect('Remove Background', selected)}
        />
        <Feature 
          title="Upscale" 
          description="Upscale image up to 4X"
          onSelect={(selected) => handleFeatureSelect('Upscale', selected)}
          />
        <Feature 
          title="Auto Enhance" 
          description="Enhance image with AI" 
        onSelect={(selected) => handleFeatureSelect('Auto Enhance', selected)}
          />

        <InfoBox
          title="Magic Inpainting"
          description="Re-usable components built using Radix UI and Tailwind CSS"
        />
        <InfoBox
          title="Magic Inpainting"
          description="Re-usable components built using Radix UI and Tailwind CSS"
        />
        <InfoBox
          title="Effects & Adjust"
          description="Re-usable components built using Radix UI and Tailwind CSS"
        />

        <div className="flex gap-4 mt-1">
          <button
            className="bg-[#FEFBFF] w-1/2 items-center justify-center px-2 py-2 font-semibold rounded-md cursor-pointer border border-violet-600"
            disabled
          >
            Next
          </button>

          <button className="bg-[#623FC4] w-1/2 items-center justify-center font-semibold rounded-md cursor-pointer text-white" onClick={handleGenerateButtonClick}>
            Generate
          </button>
        </div>
      </div>
      <Separator orientation="vertical" className="" />
      
      <div className="w-2/3 bg-white p-8">
      <div
        className="grid gap-4 w-full border h-[350px] rounded-md border-[#623FC4]"
        style={{
          gridTemplateColumns: getGridTemplateColumns(4), // Adjust the number of columns as needed
        }}
      >
        {uploadedImages.map((imageSrc, index) => (
          <div
            key={index}
            className={`relative flex w-[200px] h-[200px] ${
              selectedImage === imageSrc ? 'border-4 border-blue-500' : ''
            }`}
          >
            <img
              src={imageSrc}
              alt={`Image ${index}`}
              onClick={() => handleImageClick(imageSrc)}
              className="w-full h-full object-cover cursor-pointer"
            />
            {selectedImage === imageSrc && (
              <div className="absolute top-2 right-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-blue-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>

    </div>
  );
}
