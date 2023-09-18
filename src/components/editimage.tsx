import { Separator } from '@/components/ui/separator';
import NavBar from './navbar';
import { Checkbox } from '@/components/ui/checkbox';

export default function EditImage() {
  return (
    <div className="flex flex-col ">
      <div className="mx-4">
        <NavBar />
      </div>
      <Separator className="" />
      <div className="flex-1 flex mx-5">
        <div className="w-1/3 bg-white  border-[#D4D4D4]">
          <div className="h-[350px] bg-white p-4 rounded-b-lg">
            <h1 className=" text-[#000000] mx-1 my-1 text-base font-medium ">
              Select images to edit
            </h1>
            <div className="my-4">
              <div className=" flex items-center gap-3">
                <Checkbox />
                <h2 className="text-sm font-semibold  mr-2">
                  Remove Background
                </h2>
              </div>
              <p className="ml-7 text-[#64748B]">
                Remove the background of the image
              </p>
            </div>

            <div className="my-4">
              <div className=" flex items-center gap-3">
                <Checkbox />
                <h2 className="text-sm font-semibold mr-2">Upscale</h2>
              </div>
              <p className="ml-7 text-[#64748B]">Upscale image upto 4X</p>
            </div>

            <div className="my-4">
              <div className=" flex items-center gap-3">
                <Checkbox />
                <h2 className="text-sm font-semibold mr-2">Auto Enhance</h2>
              </div>
              <p className="ml-7 text-[#64748B]">Enhance image with AI</p>
            </div>

            <div>
              <div className=" flex flex-col border  rounded border-[#623FC4] px-4 py-2 ">
                <h2 className="text-sm font-semibold mr-2">Magic Inpainting</h2>
                <p className="text-[#64748B]">
                  Re-usable components built using {'\n'} Radix UI and Tailwind
                  CSS
                </p>
              </div>
              <div className=" flex flex-col border  rounded border-[#623FC4] px-4 py-2 my-4 ">
                <h2 className="text-sm font-semibold mr-2">Magic Inpainting</h2>
                <p className="text-[#64748B]">
                  Re-usable components built using {'\n'} Radix UI and Tailwind
                  CSS
                </p>
              </div>
              <div className=" flex flex-col border  rounded border-[#623FC4] px-4 py-2 ">
                <h2 className="text-sm font-semibold mr-2">
                  Effects & Adjust{' '}
                </h2>
                <p className="text-[#64748B]">
                  Re-usable components built using Radix UI and Tailwind CSS
                </p>
              </div>
              <div className="flex gap-4 my-16">
                <button
                  className="bg-[#FEFBFF] w-1/2 items-center justify-center px-2 py-2 font-medium  rounded-md cursor-pointer border border-violet-600"
                  disabled
                >
                  Next
                </button>

                <button className="bg-[#623FC4] w-1/2 items-center justify-center font-medium  rounded-md cursor-pointer text-white">
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
