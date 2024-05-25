import { Separator } from '@/components/ui/separator';
import InfoBox from './reusableInfobox';
import Feature from './reusableFeatures';
import { useEffect, useRef, useState } from 'react';
import removeBackground from '@/api/removeBackground';
import imageUpscale from '@/api/imageUpscale';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { productApi } from '../services/productApi';

interface ProductData {
  id?: string | undefined;
  category?: string | undefined;
  uploadedImages: string[];
  brand?: string;
  productName?: string;
  quantity?: number;
  price?: number;
  expiryDate?: string;
}

export default function EditImage() {
  const containerRef = useRef<HTMLDivElement | null>(null);

  const [uploadedImages, setUploadedImages] = useState<string[]>([]);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [expectedWidth, setExpectedWidth] = useState<number>(10);
  const [expectedHeight, setExpectedHeight] = useState<number>(10);
  const [editedImage, setEditedImage] = useState<string>();
  const [editedImageStatus, setEditedImageStatus] = useState(false);
  const [selectedOption, setSelectedOption] = useState<string>('');
  const [product, setProduct] = useState<ProductData>();

  const { productId } = useParams();

  useEffect(() => {
    productApi.getProduct(
      productId!,
      (data: any) => {
        setProduct(data.product);
      },
      (error: any) => {
        toast.error(error);
      }
    );
  }, [productId]);

  useEffect(() => {
    if (product) {
      const allImages: string[] = product.uploadedImages;
      setUploadedImages(allImages);
    }
  }, [product]);

  const handleImageClick = (imageSrc: string) => {
    if (selectedImage === imageSrc) setSelectedImage(null);
    else setSelectedImage(imageSrc);
  };

  const getGridTemplateColumns = (numberOfColumns: number) => {
    return `repeat(${numberOfColumns}, minmax(0, 1fr))`;
  };

  const handleGenerateButtonClick = async () => {
    try {
      if (!selectedImage) {
        toast.error('Please select a picture and generate again');
        return;
      }
      if (!selectedFeatures.length) {
        toast.error('Please select a feature and generate again');
        return;
      }

      let processedImage = selectedImage;

      if (selectedFeatures.includes('Remove Background')) {
        try {
          const removeBgResponse = await removeBackground(selectedImage);
          processedImage = URL.createObjectURL(removeBgResponse);
        } catch (error) {
          console.error('Error removing background:', error);
          return;
        }
      }

      if (selectedFeatures.includes('Upscale')) {
        try {
          const upscaleResponse = await imageUpscale(processedImage, expectedWidth, expectedHeight);
          processedImage = URL.createObjectURL(upscaleResponse);
        } catch (error) {
          console.error('Error upscaling image:', error);
          return;
        }
      }

      setEditedImage(processedImage);
    } catch (error) {
      console.error('Error processing image:', error);
    }
    setEditedImageStatus(true);
  };

  const handleSaveButton = () => {
    if (!editedImage) return;

    setUploadedImages((prevUploadedImages) => {
      const updatedImages = [...prevUploadedImages, editedImage];

      const updatedProduct: ProductData = { ...product, uploadedImages: updatedImages };

      productApi.updateProduct(
        productId!,
        updatedProduct,
        (data: any) => {
          toast.success('Product updated successfully');
          setProduct(updatedProduct);  // Update local product state
        },
        (error: any) => {
          toast.error('Error updating product');
        }
      );

      return updatedImages;
    });

    setEditedImageStatus(false);
  };

  const handleSelect = (title: string) => {
    setSelectedOption(title);
    console.log(title);
  }

  const handleFeatureSelect = (feature: string, selected: boolean) => {
    setSelectedFeatures(prevSelectedFeatures => {
      if (selected) {
        if (feature === 'Upscale') setModalOpen(true);
        return [...prevSelectedFeatures, feature];
      } else {
        if (feature === 'Upscale') {
          setExpectedWidth(0);
          setExpectedHeight(0);
          setModalOpen(false);
        }
        return prevSelectedFeatures.filter(item => item !== feature);
      }
    });
  };

  const handleModalSubmit = () => {
    setModalOpen(false);
  };
  
  const handleDeleteButton = (imageSrc: string) => {
    // Optimistically update the UI
    const updatedImages = uploadedImages.filter(image => image !== imageSrc);
    setUploadedImages(updatedImages);
  
    const updatedProduct: ProductData = { ...product, uploadedImages: updatedImages };
  
    // Make API call to update the product
    productApi.updateProduct(
      productId!,
      updatedProduct,
      (data: any) => {
        toast.success('Image deleted successfully');
        setProduct(updatedProduct);  // Update local product state
      },
      (error: any) => {
        toast.error('Error deleting image');
        // Revert UI update on error
        setUploadedImages(product!.uploadedImages);
      }
    );
  };

  return (
    <div className="flex" ref={containerRef}>
      <style>
        {`
          .image-container:hover .delete-btn {
            display: block;
          }
          .delete-btn {
            display: none;
          }
          .delete-btn svg {
            transition: all 0.3s;
          }
          .image-container:hover .delete-btn svg {
            stroke: #ffffff;
            stroke-width: 3;
          }
        `}
      </style>
      <div className="w-1/3 border-[#D4D4D4] rounded-b-lg mt-4">
        <h1 className="text-[#000000] mb-5 text-base font-semibold">
          Select images to edit
        </h1>
        <Feature
          title="Remove Background"
          description="Remove the background of the image"
          onSelect={selected =>
            handleFeatureSelect('Remove Background', selected)
          }
        />
        <Feature
          title="Upscale"
          description="Upscale image up to 4X"
          onSelect={selected => handleFeatureSelect('Upscale', selected)}
        />

        {modalOpen && (
          <div className="modal">
            <div className="modal-content">
              <h2>
                <b>Enter Expected Dimensions</b>
              </h2>
              <label>
                Width:
                <input
                  type="number"
                  className="border border-gray-300 shadow p-1 w-full rounded"
                  value={expectedWidth || ''}
                  onChange={e => setExpectedWidth(Number(e.target.value))}
                />
              </label>
              <label>
                Height:
                <input
                  type="number"
                  className="border border-gray-300 shadow p-1 w-full rounded mb-2"
                  value={expectedHeight || ''}
                  onChange={e => setExpectedHeight(Number(e.target.value))}
                />
              </label>
              <button
                className="bg-[#623FC4] w-1/2 items-center justify-center font-semibold rounded-md cursor-pointer text-white"
                onClick={handleModalSubmit}
              >
                Submit
              </button>
            </div>
          </div>
        )}

        <Feature
          title="Auto Enhance"
          description="Enhance image with AI"
          onSelect={selected => handleFeatureSelect('Auto Enhance', selected)}
          
        />

        <div>
          <br />
          <InfoBox
            title="Magic Inpainting"
            description="Re-usable components built using Radix UI and Tailwind CSS"
            isSelected={selectedOption === 'Magic Inpainting'}
            handleSelect={handleSelect}
            
          />
          <br />
          <InfoBox
            title="Effects & Adjust"
            description="Re-usable components built using Radix UI and Tailwind CSS"
            isSelected={selectedOption === 'Effects & Adjust'}
            handleSelect={handleSelect}
          />
          <br />
        </div>

        <div className="flex gap-4 mt-1">
          <button
            className="bg-[#FEFBFF] w-1/2 items-center justify-center px-2 py-2 font-semibold rounded-md cursor-pointer border border-violet-600"
            disabled
          >
            Next
          </button>

          <button
            className="bg-[#623FC4] w-1/2 items-center justify-center font-semibold rounded-md cursor-pointer text-white"
            onClick={handleGenerateButtonClick}
          >
            Generate
          </button>
        </div>
      </div>

      <Separator orientation="vertical" className="" />

      {editedImageStatus ? (
        <div className="w-1/2 bg-white m-10 p-4 border border-violet-500">
          <div className="flex justify-between mb-4">
            <button
              className="bg-[#623FC4] p-2 font-semibold rounded-md cursor-pointer text-white"
              onClick={handleSaveButton}
            >
              Save
            </button>
          </div>
          <div className="flex justify-center items-center">
            <img
              src={editedImage!}
              alt="Edited"
              className="max-w-full max-h-[60vh] object-cover cursor-pointer"
            />
          </div>
        </div>
      ) : (
        <div className="w-2/3 bg-white p-8">
          <div
            className="grid grid-cols-3 gap-4 border p-5 rounded-md border-[#623FC4]"
            style={{
              gridTemplateColumns: getGridTemplateColumns(4),
            }}
          >
            {uploadedImages.map((imageSrc, index) => (
              <div
                key={index}
                className={`relative flex w-[200px] h-[200px] image-container ${selectedImage === imageSrc ? 'border-4 border-blue-500' : ''}`}
              >
                <img
                  src={imageSrc}
                  alt={`Image ${index}`}
                  onClick={() => handleImageClick(imageSrc)}
                  className="w-full h-full object-cover cursor-pointer"
                />
                <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 delete-btn width-full" style={{background:'purple'}}>
                  <button onClick={() => handleDeleteButton(imageSrc)}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      viewBox="0 0 24 24"
                      stroke="#623FC4"
                      fill="none"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M3 6h18M9 6v12m6-12v12m-9 0h12a2 2 0 002-2V6H4a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
