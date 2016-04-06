/*eslint-disable react/no-multi-comp */
import { Component } from 'react';
import { NumberMasker } from '../src/react-masker.jsx'
import {
  createRenderer,
  Simulate,
  renderIntoDocument,
  findRenderedDOMComponentWithTag
} from 'react-addons-test-utils';

describe('ReactMasker', () => {
  describe('NumberMasker', () => {
    it('renders an input', () => {
      const renderer = createRenderer();
      renderer.render(<NumberMasker value={0} />);
      const result = renderer.getRenderOutput();
      expect(result.type).toEqual('input');
    });

    it('memoizes correctly', () => {
      const r1 = NumberMasker({ value: 1 });
      const r2 = NumberMasker({ value: 2 });

      expect(r1).not.toEqual(r2);
    });

    it('renders 0,00 when value is 0', () => {
      const renderer = createRenderer();
      renderer.render(<NumberMasker value={0} />);
      const result = renderer.getRenderOutput();

      expect(result.props.value).toEqual('0,00');
    });

    it('renders 1,00 when value is 1', () => {
      const renderer = createRenderer();
      renderer.render(<NumberMasker value={1} />);
      const result = renderer.getRenderOutput();

      expect(result.props.value).toEqual('1,00');
    });

    it('renders 1,000 when value is 1 and precision is 3', () => {
      const renderer = createRenderer();
      renderer.render(<NumberMasker value={1} precision={3} />);
      const result = renderer.getRenderOutput();

      expect(result.props.value).toEqual('1,000');
    });

    it('renders 1,10 when value is 1.10', () => {
      const renderer = createRenderer();
      renderer.render(<NumberMasker value={1.10} />);
      const result = renderer.getRenderOutput();

      expect(result.props.value).toEqual('1,10');
    });

    it('renders 0,003999 when value is 0.003999', () => {
      const renderer = createRenderer();
      renderer.render(<NumberMasker value={0.003999} precision={6} />);
      const result = renderer.getRenderOutput();

      expect(result.props.value).toEqual('0,003999');
    });


    it('should call onChange callback with a number', () => {
      class SomeComponent extends Component {
        render() {
          return<NumberMasker value={1} onChange={handler} />;
        }
      }

      const handler = jasmine.createSpy('handler');
      const component = renderIntoDocument(<SomeComponent />);

      const node = findRenderedDOMComponentWithTag(component, 'input')

      Simulate.change(node, { target: { value: 'R$ 2,22' } });

      expect(handler).toHaveBeenCalledWith(2.22);
    });

    it('when input value is out of precision shift values', () => {
      class SomeComponent extends Component {
        render() {
          return<NumberMasker value={0} onChange={handler} />;
        }
      }

      const handler = jasmine.createSpy('handler');
      const component = renderIntoDocument(<SomeComponent />);

      const node = findRenderedDOMComponentWithTag(component, 'input')

      Simulate.change(node, { target: { value: 'R$ 0,0012' } });

      expect(handler).toHaveBeenCalledWith(0.12);
    });

    it('when user delets last digit, unshift', () => {
      class SomeComponent extends Component {
        render() {
          return<NumberMasker value={99.99} onChange={handler} />;
        }
      }

      const handler = jasmine.createSpy('handler');
      const component = renderIntoDocument(<SomeComponent />);

      const node = findRenderedDOMComponentWithTag(component, 'input')

      Simulate.change(node, { target: { value: '99,9' } });

      expect(handler).toHaveBeenCalledWith(9.99);
    });

    it('shift even if first number is 0', () => {
      class SomeComponent extends Component {
        render() {
          return<NumberMasker value={99.99} onChange={handler} />;
        }
      }

      const handler = jasmine.createSpy('handler');
      const component = renderIntoDocument(<SomeComponent />);

      const node = findRenderedDOMComponentWithTag(component, 'input')

      Simulate.change(node, { target: { value: '99,990' } });

      expect(handler).toHaveBeenCalledWith(999.9);
    });

    it('has a lot of decimals', () => {
      class SomeComponent extends Component {
        render() {
          return<NumberMasker value={0.000999} precision={6} onChange={handler} />;
        }
      }

      const handler = jasmine.createSpy('handler');
      const component = renderIntoDocument(<SomeComponent />);

      const node = findRenderedDOMComponentWithTag(component, 'input')

      Simulate.change(node, { target: { value: '0,0009993' } });

      expect(handler).toHaveBeenCalledWith(0.009993);
    });
  });

  describe('Money', () => {
    it('renders an input', () => {
      const renderer = createRenderer();
      renderer.render(<NumberMasker value={0} />);
      const result = renderer.getRenderOutput();
      expect(result.type).toEqual('input');
    });
  });
});

/*eslint-enable react/no-multi-comp */
