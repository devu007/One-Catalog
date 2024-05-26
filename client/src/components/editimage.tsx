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
      },
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
          const upscaleResponse = await imageUpscale(
            processedImage,
            expectedWidth,
            expectedHeight,
          );
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

    setUploadedImages(prevUploadedImages => {
      const updatedImages = [...prevUploadedImages, editedImage];

      const updatedProduct: ProductData = {
        ...product,
        uploadedImages: updatedImages,
      };

      productApi.updateProduct(
        productId!,
        updatedProduct,
        (data: any) => {
          toast.success('Product updated successfully');
          setProduct(updatedProduct); // Update local product state
        },
        (error: any) => {
          toast.error('Error updating product');
        },
      );

      return updatedImages;
    });

    setEditedImageStatus(false);
  };

  const handleSelect = (title: string) => {
    setSelectedOption(title);
    console.log(title);
  };

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

    const updatedProduct: ProductData = {
      ...product,
      uploadedImages: updatedImages,
    };

    // Make API call to update the product
    productApi.updateProduct(
      productId!,
      { updatedProduct: updatedProduct, sendNew: true },
      (data: any) => {
        toast.success('Image deleted successfully');
        setProduct(updatedProduct); // Update local product state
      },
      (error: any) => {
        toast.error('Error deleting image');
        // Revert UI update on error
        setUploadedImages(product!.uploadedImages);
      },
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
          className="flex flex-row flex-wrap overflow-y-auto h-2/3 border p-5 rounded-md border-[#623FC4]"
          style={{
            gridTemplateColumns: getGridTemplateColumns(4),
          }}
        >
          {uploadedImages.map((imageSrc, index) => (
            <div
              key={index}
              className={`relative flex flex-col justify-content-between image-container border-2 rounded m-2 p-2 ${selectedImage === imageSrc ? 'border-4 border-blue-500' : ''}`}
            >
              <div className='w-[200px] h-[200px]'>
              <img
                src={imageSrc}
                alt={`Image ${index}`}
                onClick={() => handleImageClick(imageSrc)}
                className="w-full h-full object-cover cursor-pointer"
              />
              </div>
              <div className="w-2/3 rounded absolute bottom-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 delete-btn text-center" style={{background:'purple'}}>
                <button onClick={() => handleDeleteButton(imageSrc)}>
                <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="25" height="25" viewBox="0 0 100 100">
<path d="M 46 13 C 44.35503 13 43 14.35503 43 16 L 43 18 L 32.265625 18 C 30.510922 18 28.879517 18.922811 27.976562 20.427734 L 26.433594 23 L 23 23 C 20.802666 23 19 24.802666 19 27 C 19 29.197334 20.802666 31 23 31 L 24.074219 31 L 27.648438 77.458984 C 27.88773 80.575775 30.504529 83 33.630859 83 L 66.369141 83 C 69.495471 83 72.11227 80.575775 72.351562 77.458984 L 75.925781 31 L 77 31 C 79.197334 31 81 29.197334 81 27 C 81 24.802666 79.197334 23 77 23 L 73.566406 23 L 72.023438 20.427734 C 71.120481 18.922811 69.489078 18 67.734375 18 L 57 18 L 57 16 C 57 14.35503 55.64497 13 54 13 L 46 13 z M 46 15 L 54 15 C 54.56503 15 55 15.43497 55 16 L 55 18 L 45 18 L 45 16 C 45 15.43497 45.43497 15 46 15 z M 32.265625 20 L 43.832031 20 A 1.0001 1.0001 0 0 0 44.158203 20 L 55.832031 20 A 1.0001 1.0001 0 0 0 56.158203 20 L 67.734375 20 C 68.789672 20 69.763595 20.551955 70.306641 21.457031 L 71.833984 24 L 68.5 24 A 0.50005 0.50005 0 1 0 68.5 25 L 73.5 25 L 77 25 C 78.116666 25 79 25.883334 79 27 C 79 28.116666 78.116666 29 77 29 L 23 29 C 21.883334 29 21 28.116666 21 27 C 21 25.883334 21.883334 25 23 25 L 27 25 L 61.5 25 A 0.50005 0.50005 0 1 0 61.5 24 L 28.166016 24 L 29.693359 21.457031 C 30.236405 20.551955 31.210328 20 32.265625 20 z M 64.5 24 A 0.50005 0.50005 0 1 0 64.5 25 L 66.5 25 A 0.50005 0.50005 0 1 0 66.5 24 L 64.5 24 z M 26.078125 31 L 73.921875 31 L 70.357422 77.306641 C 70.196715 79.39985 68.46881 81 66.369141 81 L 33.630859 81 C 31.53119 81 29.803285 79.39985 29.642578 77.306641 L 26.078125 31 z M 38 35 C 36.348906 35 35 36.348906 35 38 L 35 73 C 35 74.651094 36.348906 76 38 76 C 39.651094 76 41 74.651094 41 73 L 41 38 C 41 36.348906 39.651094 35 38 35 z M 50 35 C 48.348906 35 47 36.348906 47 38 L 47 73 C 47 74.651094 48.348906 76 50 76 C 51.651094 76 53 74.651094 53 73 L 53 69.5 A 0.50005 0.50005 0 1 0 52 69.5 L 52 73 C 52 74.110906 51.110906 75 50 75 C 48.889094 75 48 74.110906 48 73 L 48 38 C 48 36.889094 48.889094 36 50 36 C 51.110906 36 52 36.889094 52 38 L 52 63.5 A 0.50005 0.50005 0 1 0 53 63.5 L 53 38 C 53 36.348906 51.651094 35 50 35 z M 62 35 C 60.348906 35 59 36.348906 59 38 L 59 39.5 A 0.50005 0.50005 0 1 0 60 39.5 L 60 38 C 60 36.889094 60.889094 36 62 36 C 63.110906 36 64 36.889094 64 38 L 64 73 C 64 74.110906 63.110906 75 62 75 C 60.889094 75 60 74.110906 60 73 L 60 47.5 A 0.50005 0.50005 0 1 0 59 47.5 L 59 73 C 59 74.651094 60.348906 76 62 76 C 63.651094 76 65 74.651094 65 73 L 65 38 C 65 36.348906 63.651094 35 62 35 z M 38 36 C 39.110906 36 40 36.889094 40 38 L 40 73 C 40 74.110906 39.110906 75 38 75 C 36.889094 75 36 74.110906 36 73 L 36 38 C 36 36.889094 36.889094 36 38 36 z M 59.492188 41.992188 A 0.50005 0.50005 0 0 0 59 42.5 L 59 44.5 A 0.50005 0.50005 0 1 0 60 44.5 L 60 42.5 A 0.50005 0.50005 0 0 0 59.492188 41.992188 z"></path>
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
