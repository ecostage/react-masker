# React-number

A stateless component for masks based on VanillaMasker.

# Install

`npm install react-masker --save`

# Using

```js
import { NumberMasker } from 'react-masker';

function SomeComponent(props) {
  return (
    <NumberMasker
      value={1234}
      onChange={(n) => n}
      precision={2}
      separator=","
      delimiter="."
      unit="R$"
      suffixUnit="R$"
      zeroCents={true}
    />
  );
}

```

# Contributing

`npm install`
`npm test`
`npm run watch`
`npm run compile`
