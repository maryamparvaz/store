
import React from 'react';
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  CardActions
} from '@mui/material';
import { useDispatch } from 'react-redux';
import { ShoppingCart as ShoppingCartIcon } from '@mui/icons-material';
import { Product } from '../../types';
import { addToCart } from '../../redux/cartSlice';
import { selectProduct } from '../../redux/productsSlice';
import { toast } from 'sonner';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const dispatch = useDispatch();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    dispatch(addToCart(product));
    toast.success(`${product.name} added to cart!`);
  };

  const handleProductClick = () => {
    dispatch(selectProduct(product.id));
  };

  return (
    <Card
      className="h-full flex flex-col cursor-pointer hover:shadow-lg transition-shadow"
      onClick={handleProductClick}
    >
      <CardMedia
        component="img"
        height="140"
        image={product.image}
        alt={product.name}
        className="h-48 object-cover"
      />
      <CardContent className="flex-grow">
        <Typography gutterBottom variant="h5" component="div">
          {product.name}
        </Typography>
        <Typography variant="body2" color="text.secondary" className="mb-2">
          {product.description}
        </Typography>
        <Typography variant="h6" color="primary">
          ${product.price.toFixed(2)}
        </Typography>
      </CardContent>
      <CardActions>
        <Button
          variant="contained"
          color="primary"
          startIcon={<ShoppingCartIcon />}
          onClick={handleAddToCart}
          size="small"
          fullWidth
        >
          Add to Cart
        </Button>
      </CardActions>
    </Card>
  );
};

export default ProductCard;
