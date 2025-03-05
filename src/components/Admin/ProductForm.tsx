
import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Button, TextField, Typography, Paper, Grid } from '@mui/material';
import { Product } from '../../types';
import ImageUploader from '../common/helper/ImageUploader';

interface ProductFormProps {
  initialProduct?: Product;
  onSubmit: (product: Omit<Product, 'id'> & { id?: string }) => void;
}

const productSchema = Yup.object({
  name: Yup.string()
    .required('Product name is required')
    .min(2, 'Name must be at least 2 characters'),
  price: Yup.number()
    .required('Price is required')
    .positive('Price must be positive')
    .typeError('Price must be a number'),
  description: Yup.string()
    .required('Description is required')
    .min(10, 'Description must be at least 10 characters'),
  category: Yup.string()
    .required('Category is required'),
  quantity: Yup.number()
    .required('Quantity is required')
    .integer('Quantity must be an integer')
    .min(0, 'Quantity cannot be negative')
    .typeError('Quantity must be a number'),
  image: Yup.string()
    .required('Product image is required')
});

const ProductForm: React.FC<ProductFormProps> = ({ initialProduct, onSubmit }) => {
  const formik = useFormik({
    initialValues: initialProduct || {
      name: '',
      price: 0,
      description: '',
      category: '',
      quantity: 0,
      image: ''
    },
    validationSchema: productSchema,
    onSubmit: (values) => {
      onSubmit(initialProduct ? { ...values, id: initialProduct.id } : values);
    }
  });

  const handleImageUploaded = (base64Image: string) => {
    formik.setFieldValue('image', base64Image);
  };

  return (
    <Paper elevation={3} className="p-6">
      <Typography variant="h6" className="mb-4">
        {initialProduct ? 'Edit Product' : 'Add New Product'}
      </Typography>
      
      <form onSubmit={formik.handleSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={8}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  id="name"
                  name="name"
                  label="Product Name"
                  value={formik.values.name}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.name && Boolean(formik.errors.name)}
                  helperText={formik.touched.name && formik.errors.name}
                />
              </Grid>
              
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  id="price"
                  name="price"
                  label="Price ($)"
                  type="number"
                  value={formik.values.price}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.price && Boolean(formik.errors.price)}
                  helperText={formik.touched.price && formik.errors.price}
                />
              </Grid>
              
              {/* <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  id="quantity"
                  name="quantity"
                  label="Quantity in Stock"
                  type="number"
                  value={formik.values.quantity}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.quantity && Boolean(formik.errors.quantity)}
                  helperText={formik.touched.quantity && formik.errors.quantity}
                />
              </Grid> */}
              
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  id="category"
                  name="category"
                  label="Category"
                  value={formik.values.category}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.category && Boolean(formik.errors.category)}
                  helperText={formik.touched.category && formik.errors.category}
                />
              </Grid>
              
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  id="description"
                  name="description"
                  label="Description"
                  multiline
                  rows={4}
                  value={formik.values.description}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.description && Boolean(formik.errors.description)}
                  helperText={formik.touched.description && formik.errors.description}
                />
              </Grid>
            </Grid>
          </Grid>
          
          <Grid item xs={12} md={4}>
            <div className="flex flex-col items-center">
              <Typography variant="subtitle1" className="mb-2">
                Product Image
              </Typography>
              <ImageUploader 
                onImageUploaded={handleImageUploaded}
                initialImage={formik.values.image}
              />
              {formik.touched.image && formik.errors.image && (
                <Typography color="error" variant="caption" className="mt-2">
                  {formik.errors.image}
                </Typography>
              )}
            </div>
          </Grid>
          
          <Grid item xs={12} className="flex justify-end">
            <Button 
              variant="contained" 
              color="primary" 
              type="submit"
              disabled={formik.isSubmitting}
            >
              {initialProduct ? 'Update Product' : 'Add Product'}
            </Button>
          </Grid>
        </Grid>
      </form>
    </Paper>
  );
};

export default ProductForm;
