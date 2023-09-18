// import React from 'react';
import { amazon, flipkart } from '@/assets/logo';
import { Switch } from '@/components/ui/switch';
import UploadButton from './uploadbtn';
import { FormEvent } from 'react';
export default function UploadImage() {
  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const formElement = e.target as HTMLFormElement;

    const formData = new FormData(formElement);

    const data = Object.fromEntries(formData.entries());
    console.log(data);

    formElement.reset();
  }
  // bg-[#E2E8F0]
  return (
    <div className="flex flex-row mt-0 h-screen">
      <div className="flex-1 mx-7 my-7 flex">
        <div className="w-1/3">
          <div className="h-[350px] p-4 rounded-b-lg">
            <h1 className="font-bold mx-2 text-xl">Add New Product</h1>
            <div className="mt-4 mx-2">
              <div className="mx-0">
                <UploadButton />
              </div>
              <form className="mt-4" action="" onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label htmlFor="productId" className="block font-bold">
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
                  <label htmlFor="category" className="block font-bold">
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
                    <Switch name="amazon" />
                  </div>
                  <div className="flex items-center">
                    <img
                      src={flipkart}
                      alt="Toggle 2"
                      className="w-6 h-6 mr-2 border rounded-xl"
                    />
                    <Switch name="flipkart" />
                  </div>
                </div>

                <div className="flex gap-4 mt-4">
                  <button
                    className=" w-1/2 items-center justify-center px-2 py-2 font-medium  rounded-md cursor-pointer border border-violet-600"
                    disabled
                  >
                    Cancel
                  </button>

                  <button className="bg-[#623FC4] w-1/2 items-center justify-center font-medium  rounded-md cursor-pointer text-white">
                    Done
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
        <div className="w-2/3 p-8">
          <div className="w-full border h-[350px] rounded-md border-[#623FC4] dark:border-slate-600"></div>
        </div>
      </div>
    </div>
  );
}
