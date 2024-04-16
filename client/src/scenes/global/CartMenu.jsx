import { Box, Button, Divider, IconButton, Typography } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import CloseIcon from "@mui/icons-material/Close";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import styled from "@emotion/styled";
import { shades } from "../../theme";
import {
    decreaseCount,
    increaseCount,
    removeFromCart,
    setIsCartOpen,
} from "../../state";
import { useNavigate } from "react-router-dom";

//reuse css 
const FlexBox = styled(Box)`
display: flex;
align-items: center;
justify-content: space-between;
`;

function CartMenu() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const cart = useSelector((state) => state.cart.cart)
    const isCartOpen = useSelector((state) => state.cart.isCartOpen)

    const totalPrice = cart.reduce((acc, curr) => {
        return acc + curr.attributes.price * curr.count
    }, 0)

    return (
        <Box display={isCartOpen ? "flex" : "none"}
            backgroundColor='rgba(0,0,0,0.4)'
            position='fixed'
            top='0' left='0'
            width='100%'
            height='100%'
            zIndex='10'
            overflow='auto'
        >
            {/* {modal} */}
            <Box width='max(300px, 30%)' height='100%' backgroundColor='white' position='fixed' bottom='0' right='0'>
                <Box overflow='auto' height='100%' padding='30px'>
                    {/* {header} */}
                    <FlexBox mb="15px">
                        <Typography variant="h3">Shopping Bag ({cart.length})</Typography>
                        <IconButton onClick={() => dispatch(setIsCartOpen({}))}>
                            <CloseIcon />
                        </IconButton>
                    </FlexBox>
                    {/* {cart list} */}
                    <Box>
                        {cart.map((item) => {
                            <Box key={`${item.attributes.name}-${item.id}`}>
                                <FlexBox p='15px 0'>
                                    <Box flex='1 1 40%'>
                                        <img
                                            alt={item?.name}
                                            width="123px"
                                            height="164px"
                                            src={`http://localhost:2000${item?.attributes?.image?.data?.attributes?.formats?.medium?.url}`}
                                        />
                                    </Box>
                                    <Box flex='1 1 60%'>
                                        <FlexBox mb="5px">
                                            <Typography fontWeight='bold'>
                                                {item.attributes.name}
                                            </Typography>
                                            <IconButton onClick={() => dispatch(removeFromCart({ id: item.id }))}>
                                                <CloseIcon />
                                            </IconButton>
                                        </FlexBox>
                                        {/* <Typography>{item.attributes.shortDescription}</Typography> */}

                                        <div>
                                            {item?.attributes?.shortDescription && item.attributes.shortDescription.map((desc, index) => (
                                                <div key={index}>{desc.children[0].text}</div>
                                            ))}
                                        </div>

                                        <FlexBox m="15px 0">
                                            <Box
                                                display="flex"
                                                alignItems="center"
                                                border={`1.5px solid ${shades.neutral[500]}`}
                                            >
                                                <IconButton
                                                    onClick={() =>
                                                        dispatch(decreaseCount({ id: item.id }))
                                                    }
                                                >
                                                    <RemoveIcon />
                                                </IconButton>
                                                <Typography>{item.count}</Typography>
                                                <IconButton
                                                    onClick={() =>
                                                        dispatch(increaseCount({ id: item.id }))
                                                    }
                                                >
                                                    <AddIcon />
                                                </IconButton>
                                            </Box>
                                            <Typography fontWeight="bold">
                                                ${item.attributes.price}
                                            </Typography>
                                        </FlexBox>
                                    </Box>
                                </FlexBox>
                                <Divider />
                            </Box>
                        })}
                    </Box>
                    {/* ACTIONS */}
                    <Box m="20px 0">
                        <FlexBox m="20px 0">
                            <Typography fontWeight="bold">SUBTOTAL</Typography>
                            <Typography fontWeight="bold">${totalPrice}</Typography>
                        </FlexBox>
                        <Button
                            sx={{
                                backgroundColor: shades.primary[400],
                                color: "white",
                                borderRadius: 0,
                                minWidth: "100%",
                                padding: "20px 40px",
                                m: "20px 0",
                            }}
                            onClick={() => {
                                navigate("/checkout");
                                dispatch(setIsCartOpen({}));
                            }}
                        >
                            CHECKOUT
                        </Button>
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}

export default CartMenu