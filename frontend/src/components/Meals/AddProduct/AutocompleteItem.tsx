import IProduct from 'interfaces/IProduct';
import React from 'react';

interface IProps {
  onProductSelect: (id: number, name: string) => void;
  product: IProduct;
}

function AddProductAutocompleteItem(props: IProps) {
  const {onProductSelect, product} = props;
  const onClick = () => {
    onProductSelect(product.id, product.name);
  };

  return <div onClick={onClick}>{product.name}</div>;
}

export default AddProductAutocompleteItem;
