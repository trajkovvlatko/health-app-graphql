import '@testing-library/jest-dom/extend-expect';
import {configure} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import 'mutationobserver-shim';
global.MutationObserver = window.MutationObserver;
configure({adapter: new Adapter()});
