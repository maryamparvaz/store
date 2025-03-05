import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { addToCart } from '../redux/cartSlice';
import { selectProducts } from '../redux/productsSlice';
import { RootState } from '../redux';
import { 
  AppBar, 
  Toolbar, 
  Typography, 
  Container, 
  Grid, 
  Card, 
  CardMedia, 
  CardContent, 
  CardActions, 
  Button, 
  Badge, 
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Box,
  Snackbar,
  Alert
} from '@mui/material';
import { 
  ShoppingCart as ShoppingCartIcon, 
  AdminPanelSettings as AdminIcon,
  Info as InfoIcon
} from '@mui/icons-material';

const Store = () => {
  const products = useSelector(selectProducts);
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const dispatch = useDispatch();
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [open, setOpen] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const handleProductClick = (product: any) => {
    setSelectedProduct(product);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleAddToCart = (product: any) => {
    dispatch(addToCart({ ...product, quantity: 1 }));
    setSnackbarOpen(true);
    if (open) setOpen(false);
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const cartItemsCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <>
      <AppBar position="static" color="primary">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Online Store
          </Typography>
          <Button 
            component={Link} 
            to="/admin" 
            color="inherit" 
            startIcon={<AdminIcon />}
            sx={{ mr: 2 }}
          >
            Admin
          </Button>
          <IconButton 
            component={Link} 
            to="/cart" 
            color="inherit"
          >
            <Badge badgeContent={cartItemsCount} color="secondary">
              <ShoppingCartIcon />
            </Badge>
          </IconButton>
        </Toolbar>
      </AppBar>

      <Container sx={{ py: 8 }}>
        <Typography variant="h4" component="h1" gutterBottom align="center">
          Our Products
        </Typography>
        
        <Grid container spacing={4} sx={{ mt: 2 }}>
          {products && products.map((product) => (
            <Grid item key={product.id} xs={12} sm={6} md={4}>
              <Card 
                sx={{ 
                  height: '100%', 
                  display: 'flex', 
                  flexDirection: 'column',
                  boxShadow: 3,
                  transition: 'transform 0.2s',
                  '&:hover': {
                    transform: 'scale(1.03)',
                  }
                }}
              >
                <CardMedia
                  component="img"
                  sx={{ 
                    height: 200,
                    objectFit: 'contain',
                    padding: 2,
                    backgroundColor: '#f5f5f5'
                  }}
                  image={product.image}
                  alt={product.name}
                />
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography gutterBottom variant="h5" component="h2">
                    {product.name}
                  </Typography>
                  <Typography variant="h6" color="primary">
                    ${product.price.toFixed(2)}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                    {product.description.substring(0, 100)}
                    {product.description.length > 100 ? '...' : ''}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button 
                    size="small" 
                    color="primary" 
                    startIcon={<InfoIcon />}
                    onClick={() => handleProductClick(product)}
                  >
                    Details
                  </Button>
                  <Button 
                    size="small" 
                    variant="contained" 
                    color="primary"
                    onClick={() => handleAddToCart(product)}
                  >
                    Add to Cart
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>

        {products && products.length === 0 && (
          <Box sx={{ textAlign: 'center', mt: 8 }}>
            <Typography variant="h6" color="text.secondary">
              No products available yet. Please check back later.
            </Typography>
          </Box>
        )}

        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="product-dialog-title"
          aria-describedby="product-dialog-description"
          maxWidth="md"
        >
          {selectedProduct && (
            <>
              <DialogTitle id="product-dialog-title">
                {selectedProduct.name}
              </DialogTitle>
              <DialogContent>
                <Grid container spacing={2}>
                  <Grid item xs={12} md={6}>
                    <img 
                      src={selectedProduct.image} 
                      alt={selectedProduct.name} 
                      style={{ 
                        width: '100%', 
                        objectFit: 'contain',
                        maxHeight: '300px'
                      }} 
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Typography variant="h5" color="primary" gutterBottom>
                      ${selectedProduct.price.toFixed(2)}
                    </Typography>
                    <Typography variant="body1" paragraph>
                      Category: {selectedProduct.category}
                    </Typography>
                    <Typography variant="body1" paragraph>
                      Stock: {selectedProduct.quantity} units
                    </Typography>
                    <DialogContentText id="product-dialog-description">
                      {selectedProduct.description}
                    </DialogContentText>
                  </Grid>
                </Grid>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleClose} color="primary">
                  Close
                </Button>
                <Button 
                  onClick={() => handleAddToCart(selectedProduct)} 
                  color="primary" 
                  variant="contained"
                >
                  Add to Cart
                </Button>
              </DialogActions>
            </>
          )}
        </Dialog>

        <Snackbar 
          open={snackbarOpen} 
          autoHideDuration={3000} 
          onClose={handleSnackbarClose}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        >
          <Alert onClose={handleSnackbarClose} severity="success" sx={{ width: '100%' }}>
            Product added to cart!
          </Alert>
        </Snackbar>
      </Container>
    </>
  );
};

export default Store;
