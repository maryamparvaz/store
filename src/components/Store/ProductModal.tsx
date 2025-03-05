
import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogTitle,
  Button,
  Typography,
  IconButton,
  Grid,
  Divider
} from '@mui/material';
import { Close as CloseIcon, ShoppingCart as ShoppingCartIcon } from '@mui/icons-material';
import { useDispatch } from 'react-redux';
import { Product } from '../../types';
import { addToCart } from '../../redux/cartSlice';
import { toast } from 'sonner';

interface ProductModalProps {
  product: Product;
  open: boolean;
  onClose: () => void;
}

const ProductModal: React.FC<ProductModalProps> = ({ product, open, onClose }) => {
  const dispatch = useDispatch();

  const handleAddToCart = () => {
    dispatch(addToCart(product));
    toast.success(`${product.name} added to cart!`);
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle className="flex justify-between items-center">
        <Typography variant="h5">{product.name}</Typography>
        <IconButton edge="end" color="inherit" onClick={onClose} aria-label="close">
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <img
              src={product.image}
              alt={product.name}
              className="w-full rounded-lg object-cover"
              style={{ maxHeight: '400px' }}
            />
          </Grid>
          <Grid item xs={12} md={6} className="flex flex-col justify-between flex-wrap">
            <div className='w-full'>
              <Typography variant="h6" color="primary" className="mb-4">
                ${product.price.toFixed(2)}
              </Typography>

              <Typography variant="body1" className="mb-4">
                {product.description}
              </Typography>

              <Divider className="my-4" />

              <Typography variant="subtitle2" className="mb-1">
                Category: {product.category}
              </Typography>

              {/* <Typography variant="subtitle2" className="mb-4">
                In Stock: {product.quantity}
              </Typography> */}
            </div>

            <Button
              variant="contained"
              color="primary"
              size="small"
              startIcon={<ShoppingCartIcon />}
              onClick={handleAddToCart}
            >
              Add to Cart
            </Button>
          </Grid>
        </Grid>
      </DialogContent>
    </Dialog>
  );
};

export default ProductModal;
