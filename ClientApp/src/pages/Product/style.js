import styled from "styled-components";

export const Wrapper = styled.div`
  display: flex;
`;

export const Col = styled.div`
  flex: 1 1 0;
  width: 0;
  padding: 10px;
`;

export const ImageDefault = styled.div``;
export const ThumbnailImages = styled.div`
  display: flex;
  justify-content: center;
`;
export const ThumbnailImageItem = styled.div`
  width: 100px;
  height: 100px;
  margin: 10px;
  cursor: pointer;
`;

export const Info = styled.div`
  border: 1px solid rgba(0, 0, 0, 0.1);
  padding: 20px;
`;

export const Name = styled.h3`
  color: #161a21;
`;

export const Price = styled.h5`
  font-weight: 700;
  margin: 0 15px 0 0;
`;

export const Button = styled.button`
  text-align: center;
  padding: 20px;
  margin: 10px 0px;
  width: 100%;
  text-transform: uppercase;
  outline: none;
  font-weight: 700;
`;

export const ButtonBuy = styled(Button)`
  background: #53c66e;
  color: white;
  border: none;
`;

export const ButtonAddToCart = styled(Button)`
  background: transparent;
  border: 1px solid rgba(0,0,0,.1);
  color: black;
`;
