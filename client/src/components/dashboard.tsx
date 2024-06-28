import React, { ChangeEvent, useState } from 'react';
import {
  PlusOutlined,
  DeleteOutlined,
  SearchOutlined,
} from '@ant-design/icons';
import { Button, Card, Input, List, Typography, Tooltip } from 'antd';
import { useNavigate, useParams } from 'react-router-dom';
import Navbar from './navbar2';

interface ProductData {
  _id: string;
  category: string;
  uploadedImages: string;
  brand?: string;
  productName?: string;
  quantity?: number;
  price?: number;
  manufacturingDate?: string;
  expiryDate?: string;
}

const Dashboard: React.FC = () => {
  const [products, setProducts] = useState<ProductData[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<ProductData[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [newProduct, setNewProduct] = useState<ProductData | null>(null);
  const navigate = useNavigate();
  const { userId } = useParams();

  const handleAddNewProductClick = () => {
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = 'image/*';
    fileInput.onchange = (e: any) => {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onload = (event: any) => {
        const newProductData: ProductData = {
          _id: Date.now().toString(),
          category: 'Architecture', // Default category name
          uploadedImages: event.target.result,
          productName: 'New Product',
        };
        setNewProduct(newProductData);
        setProducts([...products, newProductData]);
        setFilteredProducts([...products, newProductData]);
      };
      reader.readAsDataURL(file);
    };
    fileInput.click();
  };

  const handleSearch = (event: ChangeEvent<HTMLInputElement>): void => {
    const query = event.target.value.toLowerCase();
    setSearchQuery(query);
    const filtered = products.filter(
      product => product.productName?.toLowerCase().includes(query),
    );
    setFilteredProducts(filtered);
  };

  const handleDeleteProduct = (productId: string, e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent event propagation
    const updatedProducts = products.filter(
      product => product._id !== productId,
    );
    setProducts(updatedProducts);
    setFilteredProducts(updatedProducts);
  };

  return (
    <>
      <Navbar />
      <div className="container mx-auto p-4 mt-4">
        <div className="flex items-center justify-between mb-4">
          <Typography.Title
            level={3}
            className="font-poppins"
            style={{ width: 160, height: 20, margin: 0, color: '#101828' }} // Updated text color
          >
            Your Projects
          </Typography.Title>
          <div className="flex items-center">
            <Input
              type="text"
              placeholder="Search by product name"
              value={searchQuery}
              onChange={handleSearch}
              prefix={<SearchOutlined style={{ color: '#ccc' }} />}
              style={{ width: 200, marginRight: 8 }}
            />
            <Button
              type="primary"
              icon={<PlusOutlined />}
              onClick={handleAddNewProductClick}
              style={{ backgroundColor: '#623FC4', borderColor: '#623FC4' }} // Changed color to purple
            >
              Add new product
            </Button>
          </div>
        </div>
        <List
          grid={{ gutter: 8, column: 5 }} // Reduced gutter and increased columns
          dataSource={filteredProducts}
          renderItem={item => (
            <List.Item>
              <Card
                hoverable
                cover={
                  <img
                    alt={item.productName}
                    src={item.uploadedImages}
                    style={{ height: 180, objectFit: 'cover' }} // Adjusted height of image
                  />
                }
                onClick={() =>
                  navigate(`/genvision/${userId}/${item._id}/profile`)
                }
                style={{
                  width: 280,
                  height: 267,
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  padding: '8px', // Adjusted padding to reduce whitespace
                }}
              >
                <div
                  className="flex justify-between items-center mt-auto"
                  style={{ marginBottom: '4px' }}
                >
                  <div style={{ textAlign: 'left', width: '100%' }}>
                    <Typography.Title
                      level={5}
                      style={{ margin: 0, fontSize: '14px', color: '#101828' }} // Updated text color and font size
                    >
                      {item.productName}
                    </Typography.Title>
                    <Typography.Text
                      style={{ fontSize: '12px', color: '#6941C6' }}
                    >
                      {item.category}
                    </Typography.Text>
                  </div>
                  <Tooltip title="Delete">
                    <DeleteOutlined
                      style={{ cursor: 'pointer', fontSize: '16px' }} // Adjusted font size
                      onClick={e => handleDeleteProduct(item._id, e)}
                    />
                  </Tooltip>
                </div>
              </Card>
            </List.Item>
          )}
        />
      </div>
    </>
  );
};

export default Dashboard;
