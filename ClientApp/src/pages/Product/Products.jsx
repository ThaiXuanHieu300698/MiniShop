import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { makeStyles, createStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import CircularProgress from "@material-ui/core/CircularProgress";
import Product from "../Product/Product";
import {
  fetchProducts,
  selectProducts,
  selectLoading,
} from "../../store/product-slice";
import { Layout } from "../../components/shared/Layout";

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
  })
);

const Products = () => {
  const dispatch = useDispatch();
  const products = useSelector(selectProducts);
  const loading = useSelector(selectLoading);
  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const classes = useStyles();

  if (loading) {
    return (
      <div className="text-center mt-5">
        <CircularProgress />
      </div>
    );
  }
  return (
    <Layout title="Home" description="Home">
      <div className={classes.root}>
        <Grid container spacing={3}>
          {products.map((product) => (
            <Grid item xs={3} key={product.id}>
              <Product product={product} />
            </Grid>
          ))}
        </Grid>
      </div>
    </Layout>
  );
};

export default Products;
