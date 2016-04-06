/*eslint-disable react/no-multi-comp */
import { Component } from 'react';
import { Float } from '../src/react-masker.jsx'
import {
  createRenderer,
  Simulate,
  renderIntoDocument,
  findRenderedDOMComponentWithTag
} from 'react-addons-test-utils';

describe('ReactMasker', () => {
  describe('Float', () => {
    it('renders an input', () => {
      const renderer = createRenderer();
      renderer.render(<Float value={0} />);
      const result = renderer.getRenderOutput();
      expect(result.type).toEqual('input');
    });

    it('renders 0,00 when value is 0', () => {
      const renderer = createRenderer();
      renderer.render(<Float value={0} />);
      const result = renderer.getRenderOutput();

      expect(result.props.value).toEqual('0,00');
    });

    it('renders 1,00 when value is 1', () => {
      const renderer = createRenderer();
      renderer.render(<Float value={1} />);
      const result = renderer.getRenderOutput();

      expect(result.props.value).toEqual('1,00');
    });

    it('renders 1,000 when value is 1 and precision is 3', () => {
      const renderer = createRenderer();
      renderer.render(<Float value={1} precision={3} />);
      const result = renderer.getRenderOutput();

      expect(result.props.value).toEqual('1,000');
    });

    it('renders 1,10 when value is 1.10', () => {
      const renderer = createRenderer();
      renderer.render(<Float value={1.10} />);
      const result = renderer.getRenderOutput();

      expect(result.props.value).toEqual('1,10');
    });

    it('should call onChange callback with a number', () => {
      class SomeComponent extends Component {
        render() {
          return<Float value={1} onChange={handler} />;
        }
      }

      const handler = jasmine.createSpy('handler');
      const component = renderIntoDocument(<SomeComponent />);

      const node = findRenderedDOMComponentWithTag(component, 'input')

      Simulate.change(node, { target: { value: 'R$ 2,20' } });

      expect(handler).toHaveBeenCalledWith(2.2);
    })
  });

  describe('Money', () => {
    it('renders an input', () => {
      const renderer = createRenderer();
      renderer.render(<Float value={0} />);
      const result = renderer.getRenderOutput();
      expect(result.type).toEqual('input');
    });
  });
});

/*eslint-enable react/no-multi-comp */
