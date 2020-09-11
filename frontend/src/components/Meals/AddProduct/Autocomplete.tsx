import React, {useState} from 'react';
import {useFindProductsLazyQuery} from 'generated/graphql';
import {useApolloClient} from '@apollo/client';
import Message from 'components/Shared/Message/Message';
import Loading from 'components/Shared/Loading/Loading';
import IProduct from 'interfaces/IProduct';
import AddProductAutocompleteItem from './AutocompleteItem';

interface IProps {
  onProductSelect: (id: number, name: string) => void;
}

function AddProductAutocomplete(props: IProps) {
  const [value, setValue] = useState<string>('');
  const [list, setList] = useState<IProduct[] | null>(null);

  const [findProducts, {error, loading}] = useFindProductsLazyQuery({
    client: useApolloClient(),
    onCompleted: (res) => {
      if (res.findProducts) {
        setList(res.findProducts);
      }
    },
  });

  const onKeyUp = () => {
    if (value) {
      findProducts({variables: {name: value}});
    } else {
      setList([]);
    }
  };

  const onProductSelect = (id: number, name: string) => {
    props.onProductSelect(id, name);
    setList([]);
    setValue(name);
  };

  return (
    <>
      <input
        onKeyUp={onKeyUp}
        name='productId'
        className='productId'
        defaultValue=''
        placeholder='Search for products'
        autoComplete='off'
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <div>
        {loading && <Loading />}
        {error && <Message type='error' title='Cannot fetch products.' />}
        {list &&
          list.map((product: IProduct) => {
            return (
              <AddProductAutocompleteItem
                onProductSelect={onProductSelect}
                product={product}
                key={`find-product-${product.id}`}
              />
            );
          })}
      </div>
    </>
  );
}

export default AddProductAutocomplete;
