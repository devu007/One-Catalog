// import React from 'react';
import { amazon, flipkart } from '@/assets/logo';
import { Switch } from '@/components/ui/switch';
import UploadButton from './uploadbtn';
export default function UploadImage() {
  return (
    <div className="flex flex-row mt-0 h-screen bg-[#E2E8F0]">
      <div className="flex-1 flex">
        <div className="w-1/3 bg-white  border-[#D4D4D4]">
          <div className="h-[350px] bg-white p-4 rounded-b-lg">
            <h1 className="font-bold text-[#000000] mx-2 text-xl">
              Add New Product
            </h1>
            <div className="mt-4 mx-2">
              <div className="mx-0">
                <UploadButton />
              </div>
              <form className="mt-4" action="">
                <div className="mb-4">
                  <label
                    htmlFor="productId"
                    className="block font-bold text-[#000000]"
                  >
                    Product ID
                  </label>
                  <input
                    type="text"
                    id="productId"
                    name="productId"
                    placeholder="Product Id Required."
                    className="border border-gray-300 shadow p-1 w-full rounded"
                  />
                </div>

                <div className="mb-4">
                  <label
                    htmlFor="category"
                    className="block font-bold text-[#000000]"
                  >
                    Category
                  </label>
                  <input
                    type="text"
                    id="category"
                    name="category"
                    placeholder="Category Required."
                    className="border border-grey-300 shadow p-1 w-full rounded"
                  />
                </div>
                <div className="flex  gap-4 items-center mb-4">
                  <div className="flex items-center">
                    <img
                      src={amazon}
                      alt="Toggle 1"
                      className="w-6 h-6 mr-2 border rounded-xl"
                    />
                    <Switch />
                  </div>
                  <div className="flex items-center">
                    <img
                      src={flipkart}
                      alt="Toggle 2"
                      className="w-6 h-6 mr-2 border rounded-xl"
                    />
                    <Switch />
                  </div>
                </div>

                <div className="flex gap-4">
                  <button
                    className="bg-[#FEFBFF] font-medium px-4 py-2 rounded-md cursor-pointer border border-violet-600"
                    disabled
                  >
                    Cancel
                  </button>

                  <button className="bg-[#623FC4] font-medium px-4 py-2 rounded-md cursor-pointer text-white">
                    Done
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
        <div className="w-2/3 bg-white p-8">
          <div className="w-full border h-[350px] rounded-md border-[#623FC4]"></div>
        </div>
      </div>
    </div>
  );
}
