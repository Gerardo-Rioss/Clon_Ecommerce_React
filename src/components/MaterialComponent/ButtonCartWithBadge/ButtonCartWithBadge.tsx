import { styled } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import Badge, { badgeClasses } from '@mui/material/Badge';
import { useCart } from '../../../context/CartContext';
import { Link } from "react-router";
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';

const CartBadge = styled(Badge)`
  & .${badgeClasses.badge} {
    top: -12px;
    right: -6px;
  }
`;

function ButtonCartWithBadge() {
  const { cart } = useCart();
  // Total de productos sumando cantidades, no items distintos
  const totalItems = cart.reduce((sum, item) => sum + (item.quantity || 0), 0);
  return (
    <Link to="/cart" aria-label={`Carrito con ${totalItems} productos`}>
      <IconButton aria-label="carrito">
        <ShoppingCartOutlinedIcon fontSize="small" />
        <CartBadge badgeContent={totalItems} color="primary" overlap="circular" />
      </IconButton>
    </Link>
  );
}

export default ButtonCartWithBadge;
