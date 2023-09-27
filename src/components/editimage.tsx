import { Separator } from '@/components/ui/separator';
import NavBar from './navbar';
import InfoBox from './reusableInfobox';
import Feature from './reusableFeatures';
import Dropdown from './dropdown';
import { useRef } from 'react';
import Mockup from './mockup';
export default function EditImage() {
  const containerRef = useRef<HTMLDivElement | null>(null);

  return (
    <div className="flex flex-col" ref={containerRef}>
      <div className="flex-1 flex mx-5">
        <div className="w-1/3 bg-white  border-[#D4D4D4]">
          <div className="h-[350px] bg-white py-4 rounded-b-lg">
            <h1 className=" text-[#000000]  mb-5 text-base font-semibold">
              Select images to edit
            </h1>
            <Feature
              title="Remove Background"
              description="Remove the background of the image"
            />
            <Feature title="Upscale" description="Upscale image up to 4X" />
            <Feature title="Auto Enhance" description="Enhance image with AI" />

            <div>
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
              <div className="flex gap-4 my-16">
                <button
                  className="bg-[#FEFBFF] w-1/2 items-center justify-center px-2 py-2 font-semibold  rounded-md cursor-pointer border border-violet-600"
                  disabled
                >
                  Next
                </button>

                <button className="bg-[#623FC4] w-1/2 items-center justify-center font-semibold  rounded-md cursor-pointer text-white">
                  Generate
                </button>
              </div>
            </div>
          </div>
        </div>
        <Separator orientation="vertical" className="" />
        <div className="w-2/3 bg-white p-8">
          <div className="w-full border h-[350px] rounded-md border-[#623FC4]"></div>
        </div>
      </div>
    </div>
  );
}
