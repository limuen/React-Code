import { REACT_ELEMENT_TYPE } from 'shared/ReactSymbols';
import {
  Type,
  Key,
  Ref,
  Props,
  ReactElementType,
  ElementType,
} from 'shared/ReactTypes';

/**
 * ReactElement构造函数
 */
const ReactElement = (
  type: Type,
  key: Key,
  ref: Ref,
  props: Props
): ReactElementType => {
  const element = {
    $$typeof: REACT_ELEMENT_TYPE,
    type,
    key,
    ref,
    props,
    __mark: 'AiYang',
  };
  return element;
};

/**
 * 实现JSX方法
 */
export const jsx = (type: ElementType, config: any, ...maybeChildren: any) => {
  let key: Key = null;
  const props: Props = {};
  let ref: Ref = null;

  // 1.先处理config，去遍历config，把config的每一例赋值给prop对象
  for (const prop in config) {
    const val = config[prop];
    if (prop === 'key') {
      if (val !== undefined) {
        key = '' + val;
      }
      continue;
    }
    if (prop === 'ref') {
      if (val !== undefined) {
        ref = val;
      }
      continue;
    }
    // 如果是自己的props就赋值，是原型的就不
    if ({}.hasOwnProperty.call(config, prop)) {
      props[prop] = val;
    }
  }

  // 2.接下来处理maybeChildren
  const maybeChildrenLength = maybeChildren.length;
  if (maybeChildrenLength) {
    // props.childdren有两种情况
    // 如果childLength = 1 child,
    // 如果childLength > 1 [child, child, child]
    if (maybeChildrenLength === 1) {
      props.childdren = maybeChildren[0];
    } else {
      props.childdren = maybeChildren;
    }
  }

  return ReactElement(type, key, ref, props);
};

export const jsxDEV = (type: ElementType, config: any) => {
  let key: Key = null;
  const props: Props = {};
  let ref: Ref = null;

  // 1.先处理config，去遍历config，把config的每一例赋值给prop对象
  for (const prop in config) {
    const val = config[prop];
    if (prop === 'key') {
      if (val !== undefined) {
        key = '' + val;
      }
      continue;
    }
    if (prop === 'ref') {
      if (val !== undefined) {
        ref = val;
      }
      continue;
    }
    // 如果是自己的props就赋值，是原型的就不
    if ({}.hasOwnProperty.call(config, prop)) {
      props[prop] = val;
    }
  }

  return ReactElement(type, key, ref, props);
};
