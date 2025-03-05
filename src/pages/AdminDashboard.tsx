
import React, { useState, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { RootState } from '../redux';
import { logout } from '../redux/authSlice';
import { selectProducts, addProduct, updateProduct, deleteProduct } from '../redux/productsSlice';
import { useFormik } from 'formik';
import * as yup from 'yup';
import {
  Container,
  Typography,
  Grid,
  Paper,
  TextField,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  FormHelperText,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Box,
  AppBar,
  Toolbar,
  Snackbar,
  Alert
} from '@mui/material';
import {
  Delete as DeleteIcon,
  Edit as EditIcon,
  Save as SaveIcon,
  Cancel as CancelIcon,
  Add as AddIcon,
  Home as HomeIcon,
  Logout as LogoutIcon
} from '@mui/icons-material';
import { v4 as uuidv4 } from 'uuid';

const validationSchema = yup.object({
  name: yup.string().required('Product name is required'),
  price: yup
    .number()
    .positive('Price must be positive')
    .required('Price is required'),
  description: yup.string().required('Description is required'),
  category: yup.string().required('Category is required'),
  quantity: yup
    .number()
    .integer('Quantity must be an integer')
    .min(0, 'Quantity must be at least 0')
    .required('Quantity is required'),
});

const AdminDashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const products = useSelector(selectProducts);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState<string | null>(null);
  const [editMode, setEditMode] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' as 'success' | 'error' });

  const formik = useFormik({
    initialValues: {
      id: '',
      name: '',
      price: '',
      description: '',
      category: '',
      quantity: '',
      image: '',
    },
    validationSchema,
    onSubmit: (values) => {
      const productData = {
        ...values,
        id: editMode ? values.id : uuidv4(),
        price: Number(values.price),
        quantity: Number(values.quantity),
      };

      if (editMode) {
        dispatch(updateProduct(productData));
        setSnackbar({ open: true, message: 'Product updated successfully!', severity: 'success' });
      } else {
        dispatch(addProduct(productData));
        setSnackbar({ open: true, message: 'Product added successfully!', severity: 'success' });
      }

      resetForm();
    },
  });

  const resetForm = () => {
    formik.resetForm();
    setEditMode(false);
  };

  const handleEdit = (product: any) => {
    formik.setValues({
      id: product.id,
      name: product.name,
      price: String(product.price),
      description: product.description,
      category: product.category,
      quantity: String(product.quantity),
      image: product.image,
    });
    setEditMode(true);
  };

  const handleDeleteClick = (id: string) => {
    setProductToDelete(id);
    setIsDialogOpen(true);
  };

  const handleConfirmDelete = () => {
    if (productToDelete) {
      dispatch(deleteProduct(productToDelete));
      setSnackbar({ open: true, message: 'Product deleted successfully!', severity: 'success' });
    }
    setIsDialogOpen(false);
    setProductToDelete(null);
  };

  const handleDialogClose = () => {
    setIsDialogOpen(false);
    setProductToDelete(null);
  };

  const handleSnackbarClose = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  const handleImageUpload = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
          formik.setFieldValue('image', reader.result);
        };
        reader.readAsDataURL(file);
      }
    },
    [formik]
  );

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  return (
    <>
      <AppBar position="static" color="primary">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Admin Dashboard
          </Typography>
          <Button 
            color="inherit" 
            startIcon={<HomeIcon />} 
            onClick={() => navigate('/')}
            sx={{ mr: 2 }}
          >
            Store
          </Button>
          <Button 
            color="inherit" 
            startIcon={<LogoutIcon />} 
            onClick={handleLogout}
          >
            Logout
          </Button>
        </Toolbar>
      </AppBar>

      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <Paper sx={{ p: 3, boxShadow: 3 }}>
              <Typography variant="h5" component="h2" gutterBottom>
                {editMode ? 'Edit Product' : 'Add New Product'}
              </Typography>
              <Box component="form" onSubmit={formik.handleSubmit} noValidate>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="name"
                  label="Product Name"
                  name="name"
                  autoFocus
                  value={formik.values.name}
                  onChange={formik.handleChange}
                  error={formik.touched.name && Boolean(formik.errors.name)}
                  helperText={formik.touched.name && formik.errors.name}
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="price"
                  label="Price"
                  name="price"
                  type="number"
                  inputProps={{ step: 'any' }}
                  value={formik.values.price}
                  onChange={formik.handleChange}
                  error={formik.touched.price && Boolean(formik.errors.price)}
                  helperText={formik.touched.price && formik.errors.price}
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="description"
                  label="Description"
                  name="description"
                  multiline
                  rows={4}
                  value={formik.values.description}
                  onChange={formik.handleChange}
                  error={formik.touched.description && Boolean(formik.errors.description)}
                  helperText={formik.touched.description && formik.errors.description}
                />
                <FormControl 
                  fullWidth 
                  margin="normal"
                  error={formik.touched.category && Boolean(formik.errors.category)}
                >
                  <InputLabel id="category-label">Category</InputLabel>
                  <Select
                    labelId="category-label"
                    id="category"
                    name="category"
                    value={formik.values.category}
                    onChange={formik.handleChange}
                    label="Category"
                  >
                    <MenuItem value="Electronics">Electronics</MenuItem>
                    <MenuItem value="Clothing">Clothing</MenuItem>
                    <MenuItem value="Books">Books</MenuItem>
                    <MenuItem value="Home & Kitchen">Home & Kitchen</MenuItem>
                    <MenuItem value="Other">Other</MenuItem>
                  </Select>
                  {formik.touched.category && formik.errors.category && (
                    <FormHelperText>{formik.errors.category}</FormHelperText>
                  )}
                </FormControl>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="quantity"
                  label="Quantity"
                  name="quantity"
                  type="number"
                  value={formik.values.quantity}
                  onChange={formik.handleChange}
                  error={formik.touched.quantity && Boolean(formik.errors.quantity)}
                  helperText={formik.touched.quantity && formik.errors.quantity}
                />
                <Box sx={{ mt: 2, mb: 2 }}>
                  <input
                    accept="image/*"
                    style={{ display: 'none' }}
                    id="image-upload"
                    type="file"
                    onChange={handleImageUpload}
                  />
                  <label htmlFor="image-upload">
                    <Button
                      variant="outlined"
                      component="span"
                      fullWidth
                    >
                      {formik.values.image ? 'Change Image' : 'Upload Image'}
                    </Button>
                  </label>
                  {formik.values.image && (
                    <Box sx={{ mt: 2, textAlign: 'center' }}>
                      <img
                        src={formik.values.image}
                        alt="Product Preview"
                        style={{ maxWidth: '100%', maxHeight: '150px', objectFit: 'contain' }}
                      />
                    </Box>
                  )}
                </Box>
                <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    startIcon={editMode ? <SaveIcon /> : <AddIcon />}
                  >
                    {editMode ? 'Update Product' : 'Add Product'}
                  </Button>
                  {editMode && (
                    <Button
                      fullWidth
                      variant="outlined"
                      color="secondary"
                      onClick={resetForm}
                      startIcon={<CancelIcon />}
                    >
                      Cancel
                    </Button>
                  )}
                </Box>
              </Box>
            </Paper>
          </Grid>
          <Grid item xs={12} md={8}>
            <Paper sx={{ p: 3, boxShadow: 3 }}>
              <Typography variant="h5" component="h2" gutterBottom>
                Product List
              </Typography>
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Image</TableCell>
                      <TableCell>Name</TableCell>
                      <TableCell>Price</TableCell>
                      <TableCell>Category</TableCell>
                      <TableCell>Quantity</TableCell>
                      <TableCell>Actions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {products && products.length > 0 ? (
                      products.map((product) => (
                        <TableRow key={product.id}>
                          <TableCell>
                            <img
                              src={product.image}
                              alt={product.name}
                              style={{ width: '50px', height: '50px', objectFit: 'contain' }}
                            />
                          </TableCell>
                          <TableCell>{product.name}</TableCell>
                          <TableCell>${product.price.toFixed(2)}</TableCell>
                          <TableCell>{product.category}</TableCell>
                          <TableCell>{product.quantity}</TableCell>
                          <TableCell>
                            <IconButton
                              color="primary"
                              onClick={() => handleEdit(product)}
                            >
                              <EditIcon />
                            </IconButton>
                            <IconButton
                              color="error"
                              onClick={() => handleDeleteClick(product.id)}
                            >
                              <DeleteIcon />
                            </IconButton>
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={6} align="center">
                          No products available
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </TableContainer>
            </Paper>
          </Grid>
        </Grid>
      </Container>

      <Dialog
        open={isDialogOpen}
        onClose={handleDialogClose}
      >
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this product? This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleConfirmDelete} color="error">
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar 
        open={snackbar.open} 
        autoHideDuration={3000} 
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert onClose={handleSnackbarClose} severity={snackbar.severity} sx={{ width: '100%' }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </>
  );
};

export default AdminDashboard;
