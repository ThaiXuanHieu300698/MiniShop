import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchProduct, selectProduct } from "../../store/product-slice";
import * as P from "./style";
import CircularProgress from "@material-ui/core/CircularProgress";
import Rating from "@material-ui/lab/Rating";
import { formatCurrency } from "../../utils/formatCurrency";
import { showAlert } from "../../store/app-slice";
import { Layout } from "../../components/shared/Layout";
import { addItem } from "../../store/cart-slice";

const Detail = (props) => {
  let { id } = useParams();
  const [defaultImage, setDefaultImage] = useState("");
  const dispatch = useDispatch();
  const product = useSelector(selectProduct);

  useEffect(() => {
    dispatch(fetchProduct(id));
  }, [id, dispatch]);

  useEffect(() => {
    if (product.id !== 0) {
      setDefaultImage(
        `https://localhost:5001${product.productImages[0].imageUrl}`
      );
    }
  }, [product.id, product.productImages]);

  if (!!product && product.id === 0) {
    return (
      <div className="text-center mt-5">
        <CircularProgress />
      </div>
    );
  }

  const handleAddToCart = () => {
    dispatch(
      showAlert({ open: true, message: "Added to cart", level: "success" })
    );

    dispatch(addItem({ product, quantity: 1 }));
  };

  const handleChangeImage = (e) => {
    setDefaultImage(e.target.src);
  };

  return (
    <Layout title={product.name} description={product.name}>
      <P.Wrapper>
        <P.Col>
          <P.ImageDefault>
            <img src={defaultImage} alt="" width="100%" />
          </P.ImageDefault>
          <P.ThumbnailImages>
            {product.productImages.map((item) => (
              <P.ThumbnailImageItem key={item.id}>
                <img
                  src={`https://localhost:5001${item.imageUrl}`}
                  alt=""
                  width="100%"
                  onClick={(e) => handleChangeImage(e)}
                />
              </P.ThumbnailImageItem>
            ))}
          </P.ThumbnailImages>
        </P.Col>
        <P.Col>
          <P.Info>
            <P.Name>{product.name}</P.Name>
            <div className="d-flex">
              <P.Price>{formatCurrency(product.price)} ₫</P.Price>
              <Rating name="read-only" value={2} readOnly />
            </div>
            <hr />
            <P.ButtonBuy>Buy now</P.ButtonBuy>
            <P.ButtonAddToCart onClick={handleAddToCart}>
              Add to cart
            </P.ButtonAddToCart>
          </P.Info>
        </P.Col>
      </P.Wrapper>
    </Layout>
  );
};

export default Detail;
