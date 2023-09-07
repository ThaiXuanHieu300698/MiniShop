import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchBrands, selectBrands } from "../../store/brand-slice";
import { Nav } from "react-bootstrap";
const Brand = () => {
  const brands = useSelector(selectBrands);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchBrands());
  }, [dispatch]);

  return (
    <>
      {brands.map((item) => (
        <Nav.Link href="/" key={item.id}>
          {item.name}
        </Nav.Link>
      ))}
    </>
  );
};

export default Brand;
