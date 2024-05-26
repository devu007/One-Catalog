import { useEffect, useState } from 'react';
import { TrashIcon, BarsArrowUpIcon, ArrowUpOnSquareStackIcon, PlusIcon } from "@heroicons/react/24/outline";
import { Card, CardHeader, Typography, CardBody, Avatar, Button, Input } from "@material-tailwind/react";
import { useNavigate, useParams } from "react-router-dom";
import BulkUpload from "./bulk-upload";
import Navbar from './navbar2';
import { productApi } from '../services/productApi';
import { toast } from 'react-toastify';

interface TableRow {
  no: number;
  img: string;
  product_id: string;
  brand: string;
  product_name: string;
  product_category: string;
  price: string;
  stock_units: number;
  manufacturing_date: string;
  expiry_date: string;
}

interface ProductData {
  _id: string;
  category: string;
  uploadedImages: string;
  brand?: string | undefined;
  productName?: string | undefined;
  quantity?: number | undefined;
  price?: number | undefined;
  manufacturingDate?: string | undefined;
  expiryDate?: string | undefined;
}

const TABLE_HEAD = ["", "No", "Image", "Product ID", "Brand", "Product Name", "Product Category", "Price", "Stock units", "Manufacturing Date", "Expiry Date"];

const PAGE_SIZE = 10;

export default function Dashboard() {
  const [selectedRows, setSelectedRows] = useState<string[]>([]);
  const [TABLE_ROWS, setTableRows] = useState<TableRow[]>([]);
  const [filtered_data, setFilteredData] = useState<TableRow[]>([]);
  const [mapUploadedData, setMapUploadedData] = useState<Map<string, string>>();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const navigate = useNavigate();
  const {userId} = useParams();

  const [currentPage, setCurrentPage] = useState(1);
  const totalItems = filtered_data.length;
  const totalPages = Math.ceil(totalItems / PAGE_SIZE);

  const startIndex = (currentPage - 1) * PAGE_SIZE;
  const endIndex = Math.min(startIndex + PAGE_SIZE, totalItems);

  const visibleRows = filtered_data.slice(startIndex, endIndex);

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  useEffect(() => {
    getData()
  }, []);

  const getData = () =>  {
    productApi.getProducts((data:any) => {  
    var transformedRows: TableRow[] = data.products.map((product:ProductData, index:number) => {
      mapUploadedData?.set(product._id,product.uploadedImages);
      return({
      no: index + 1,
      img: product.uploadedImages[0],
      product_id: product._id,
      brand: product.brand || '',
      product_name: product.productName || '',
      product_category: product.category || '',
      price: product.price ? `Rs. ${product.price}` : '',
      stock_units: product.quantity || 0,
      manufacturing_date: product.manufacturingDate || '',
      expiry_date: product.expiryDate || '',
    })});

    setTableRows(transformedRows);
    setFilteredData(transformedRows);
    console.log("inside getData");
    
    },(error:any) => {
        // Handle error (e.g., show error message)
        console.error('Error creating product:', error);
    });
  }
  const handleAddNewProductClick = () => {
    navigate(`/genvision/${userId}/upload`);
  };

  const changeModalState = () => {
    setIsModalOpen(!isModalOpen);
    // After processing, trigger a page refresh
    if (isModalOpen) window.location.reload();
  };

  const handleDeleteButton = () => {
    selectedRows.forEach(id=>{
      productApi.deleteProduct(id,(resp:any)=>{
        toast.success(id +" "+resp.message);
      },(err:any)=>toast.error(err.message))
    })
    getData();
  }

  const handleExportAsZip = () => {
    if(selectedRows.length<=0) toast.warning("No Rows Selected");
    // Convert product data to CSV format
    let selectedRowData = filtered_data
    .filter(data =>(selectedRows.indexOf(data.product_id) !== -1))
    .map(data => {
        let res : ProductData = {
          _id: data.product_id,
          category: data.product_category,
          uploadedImages: mapUploadedData?.get(data.product_id)!,
          productName:data.product_name,
          brand:data.brand,
          quantity:data.stock_units,
          manufacturingDate:data.manufacturing_date
        }
        return res;
      });
    const csvData = convertToCSV(selectedRowData);
  
    // Create a Blob object with the CSV data
    const blob = new Blob([csvData], { type: 'text/csv' });
  
    // Create a temporary anchor element
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.download = 'product_data.csv';
  
    // Trigger download
    link.click();
  };
  
  const convertToCSV = (data: ProductData[]): string => {
    const header = Object.keys(data[0]).join(',');
    const rows = data.map(product =>
      Object.values(product)
        .map(value => `"${value}"`)
        .join(',')
    );
    return `${header}\n${rows.join('\n')}`;
  };
  

  function handleSearch(event: ChangeEvent<HTMLInputElement>): void {
    if (event.target.value) {
      var data = TABLE_ROWS.filter((row: TableRow) => row.product_name.toLowerCase().includes((event.target.value).toLowerCase()));
      setFilteredData(data);
    } else {
      setFilteredData(TABLE_ROWS);
    }
  }

  return (
    <>
    <Navbar />


      <Card placeholder="a" style={{ zIndex:'1'}}>
        <CardHeader placeholder="a" floated={true} shadow={false} className="rounded-none">
          <div className="mb-8 flex items-center justify-between gap-8">
          </div>
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row p-2">

            <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
              <Button className="text-white bg-[#623FC4] fs-2 flex items-center gap-2" placeholder="a" variant='outlined' onClick={handleAddNewProductClick}>
                <PlusIcon strokeWidth={2} className="h-5 w-5" /> Add new product
              </Button>
              <Button className="text-[#623FC4] border-[#623FC4] fs-2 flex items-center gap-2" placeholder='a' variant="outlined" size="sm" onClick={changeModalState}>
                Bulk upload
                <ArrowUpOnSquareStackIcon strokeWidth={2} className="h-10 w-10" />
              </Button>

              {
        isModalOpen && (
          <div 
            style={{ 
              position: 'fixed', 
              top: 0, // Adjust based on the height and margin of the dropdown div
              left: 0, 
              width: '100vw', 
              height: '100vh', // Adjust to account for the height of the dropdown div
              backgroundColor: 'rgba(0, 0, 0, 0.5)', 
              zIndex: 1000,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'flex-start',
              paddingTop: '10px' // Optional padding to space the modal content
            }}
            onClick={() => setIsModalOpen(!isModalOpen)} // Close modal when clicking outside content
          >
            <div 
              style={{ 
                position: 'relative', 
                width: '80vw', 
                height: '95vh', 
                backgroundColor: 'white', 
                padding: '20px',
                zIndex: 1001,
                overflow: 'auto' 
              }}
              onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside content
            >
            <BulkUpload/>
            </div>
          </div>
        )
}

            </div>

            <div className="flex items-center space-x-2">
              <Button placeholder='a' className="text-gray  flex items-center gap-2 border shadow-[none]" disabled>
                <BarsArrowUpIcon strokeWidth={2} className="h-8 w-8" /> Scan
              </Button>
              <Input
                crossOrigin='a'
                type="text"
                placeholder="Search"
                onChange={handleSearch}
                className="outline-none border-gray-500 rounded-md focus:outline-none focus:border-blue-500"
              />
              <Button className=" border-[gray] w-full" placeholder='a' variant="outlined" onClick={handleExportAsZip}>
                <div className='text-nowrap'>Export as CSV</div>
              </Button>
              <div className=' border'>
                <button  className="text-gray shadow-[none]" onClick={handleDeleteButton}>
                  <TrashIcon strokeWidth={2} className="h-8 w-8" />
                </button>
              </div>
            </div>
          </div>
        </CardHeader>
        <CardBody placeholder="a" className="overflow-scroll px-0">
        {/* <div className="max-w-screen-md mx-auto"> */}
          <table className="mt-4 w-full min-w-max table-auto text-left">
            <thead>
              <tr>
                {TABLE_HEAD.map((head) => (
                  <th
                    key={head}
                    // style={{ width:'10vw'}} 
                    className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4"
                  >
                    <Typography
                      placeholder="a"
                      variant="small"
                      color="blue-gray"
                      className="font-normal leading-none opacity-70"
                    >
                      {head}
                    </Typography>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {visibleRows.map(
                ({ no, img, product_id, brand, product_name, product_category, price, stock_units, manufacturing_date,expiry_date }, index) => {
                  const isLast = index === visibleRows.length - 1;
                  const classes = isLast
                    ? "p-4"
                    : "p-4 border-b border-blue-gray-50";

                  return (
                    <tr key={no} onClick={() => navigate(`/genvision/${userId}/${product_id}/profile`)} style={{ cursor: 'pointer' }}>
                      <td className={classes}>
                      <div
                        onClick={(e) => {
                          e.stopPropagation();
                          const newSelectedRows = selectedRows.includes(product_id)
                            ? selectedRows.filter((row) => row !== product_id)
                            : [...selectedRows,product_id];
                          setSelectedRows(newSelectedRows);
                        }}
                      >
                        <input
                          type="checkbox"
                          checked={selectedRows.includes(product_id)}
                          onChange={() => {}}
                        />
                      </div>
                      </td>
                      <td className={classes}>
                        <Typography
                          placeholder="a"
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {no}
                        </Typography>
                      </td>
                      <td className={classes}>
                        <Avatar src={img} alt={brand} size="sm" placeholder="avatar" />
                      </td>
                      <td className={classes}>
                        <Typography
                          placeholder="a"
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {product_id}
                        </Typography>
                      </td>
                      <td className={classes}>
                        <Typography
                          placeholder="a"
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {brand}
                        </Typography>
                      </td>
                      <td className={classes}>
                        <Typography
                          placeholder="a"
                          variant="small"
                          color="blue-gray"
                          className="font-normal opacity-70"
                        >
                          {product_name}
                        </Typography>
                      </td>
                      <td className={classes}>
                        <Typography
                          placeholder="a"
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {product_category}
                        </Typography>
                      </td>
                      <td className={classes}>
                        <Typography
                          placeholder="a"
                          variant="small"
                          color="blue-gray"
                          className="font-normal opacity-70"
                        >
                          {price}
                        </Typography>
                      </td>
                      <td className={classes}>
                        <Typography
                          placeholder="a"
                          variant="small"
                          color="blue-gray"
                          className="font-normal opacity-70"
                        >
                          {stock_units}
                        </Typography>
                      </td>
                      <td className={classes}>
                        <Typography
                          placeholder="a"
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {manufacturing_date}
                        </Typography>
                      </td>
                      <td className={classes}>
                        <Typography
                          placeholder="a"
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {expiry_date}
                        </Typography>
                      </td>
                    </tr>
                  );
                },
              )}
            </tbody>
          </table>
          {/* </div> */}

          {/* Pagination controls */}
          <div className="flex justify-center mt-4">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="mr-2 px-4 py-2 bg-blue-500 text-white rounded"
            >
              Previous
            </button>
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="px-4 py-2 bg-blue-500 text-white rounded"
            >
              Next
            </button>
          </div>

        </CardBody>
    </Card>
    </>
  );
}
