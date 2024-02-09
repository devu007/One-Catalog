import { TrashIcon, BarsArrowUpIcon, ArrowUpOnSquareStackIcon, PlusIcon} from "@heroicons/react/24/outline";
import {
  Card,
  CardHeader,
  Typography,
  CardBody,
  Avatar,
  Button,
  Input,
} from "@material-tailwind/react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
 
interface TableRow {
    no: number;
    img: string;
    brand: string;
    product_name: string;
    product_category: string;
    price: string;
    stock_units: number;
    expiry_date: string;
  }
 
const TABLE_HEAD = [ "","No", "Image","Brand","Product Name","Product Category","Price","Stock units", "Expiry Date"];
 
const DEMO_ROWS : TableRow[] = [
  {
    no: 1,
    img: "https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/team-3.jpg",
    brand: "John Michael",
    product_name: "john@creative-tim.com",
    product_category: "Manager",
    price: "Rs. 122",
    stock_units: 2,
    expiry_date: "23/04/18",
  },
  {
    no: 2,
    img: "https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/team-3.jpg",
    brand: "John Michael",
    product_name: "john@creative-tim.com",
    product_category: "Manager",
    price: "Rs. 122",
    stock_units: 2,
    expiry_date: "23/04/18",
  },
  {
    no: 3,
    img: "https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/team-3.jpg",
    brand: "John Michael",
    product_name: "john@creative-tim.com",
    product_category: "Manager",
    price: "Rs. 122",
    stock_units: 2,
    expiry_date: "23/04/18",
  },
  {
    no: 4,
    img: "https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/team-3.jpg",
    brand: "John Michael",
    product_name: "john@creative-tim.com",
    product_category: "Manager",
    price: "Rs. 122",
    stock_units: 2,
    expiry_date: "23/04/18",
  },
];
 
export default function Dashboard() {

    const [selectedRows, setSelectedRows] = useState<number[]>([]);;
    const [TABLE_ROWS, setTableRows] = useState<TableRow[]>([]);
    const navigate = useNavigate();


    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await fetch('your-api-endpoint');
            const data = await response.json();
            setTableRows(data || DEMO_ROWS);
          } catch (error) {
            console.error('Error fetching data:', error);
            setTableRows(DEMO_ROWS);
          }
        };
    
        fetchData();
      }, []);

      const handleAddNewProductClick = () => {
        navigate("/genvision/upload");
      }


  return (
    <Card placeholder="a"  style={{marginTop:'50px'}}>
      <CardHeader placeholder="a" floated={true} shadow={false} className="rounded-none">
        <div className="mb-8 flex items-center justify-between gap-8">
        </div>
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row p-2">
        
        <div className="flex shrink-0 flex-col gap-2 sm:flex-row">    
          <Button className="text-white bg-[#623FC4] fs-2" placeholder="a" variant='outlined' onClick={handleAddNewProductClick}>
            <PlusIcon strokeWidth={2} className="h-5 w-5" /> Add new product
          </Button>
          <Button className="text-[#623FC4] border-[#623FC4]" placeholder='a' variant="outlined" size="sm">
              Bulk upload
              <ArrowUpOnSquareStackIcon strokeWidth={2} className="h-10 w-10" />
            </Button>
          </div>

          <div className="flex items-center space-x-2">
              <Button placeholder='a' className="text-gray">
              <BarsArrowUpIcon strokeWidth={2} className="h-8 w-8" /> Scan
            </Button>
            <Input
                crossOrigin='a'
                type="text"
                placeholder="Search"
                // size='sm'
                className="outline-none border-gray-500 rounded-md focus:outline-none focus:border-blue-500"
            />
            <Button className=" border-[gray]" placeholder='a' variant="outlined" size="sm">
                Export as ZIP
              </Button>
              <Button placeholder='a' className="text-gray">
              <TrashIcon strokeWidth={2} className="h-10 w-10" />
            </Button>
           </div>

        </div>
      </CardHeader>
      <CardBody placeholder="a" className="overflow-scroll px-0">
        <table className="mt-4 w-full min-w-max table-auto text-left">
          <thead>
            <tr>
              {TABLE_HEAD.map((head) => (
                <th
                  key={head}
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
            {TABLE_ROWS.map(
              ({ no,img,brand,product_name,product_category,price,stock_units,expiry_date}, index) => {
                const isLast = index === TABLE_ROWS.length - 1;
                const classes = isLast
                  ? "p-4"
                  : "p-4 border-b border-blue-gray-50";
 
                return (
                  <tr key={no}>
                    <td className={classes}>
                  <input
                    type="checkbox"
                    checked={selectedRows.includes(no)}
                    onChange={() => {
                      const newSelectedRows = selectedRows.includes(no)
                        ? selectedRows.filter((row) => row !== no)
                        : [...selectedRows, no];
                      setSelectedRows(newSelectedRows);
                      
                    }}
                  />
                </td>
                    <td className={classes}>
                      {/* <div className="flex items-center gap-3"> */}
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
                        <Avatar src={img} alt={brand} size="sm" placeholder="avatar"/>
                        </td>
                        {/* <div className="flex flex-col"> */}
                        
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
                        {/* </div> */}
                      {/* </div> */}
                    {/* </td> */}
                    <td className={classes}>
                      {/* <div className="flex flex-col"> */}
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
                      {/* </div> */}
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
                        {expiry_date}
                      </Typography>
                    </td>
                    
                  </tr>
                );
              },
            )}
          </tbody>
        </table>
      </CardBody>
      {/* <CardFooter placeholder="a" className="flex items-center justify-between border-t border-blue-gray-50 p-4">
        <Typography placeholder="a" variant="small" color="blue-gray" className="font-normal">
          Page 1 of 10
        </Typography>
        <div className="flex gap-2">
          <Button placeholder="a" variant="outlined" size="sm">
            Previous
          </Button>
          <Button placeholder="a" variant="outlined" size="sm">
            Next
          </Button>
        </div>
      </CardFooter> */}
    </Card>
  );
}