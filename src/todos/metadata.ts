import { FC } from 'react';
import NodeJsLogo from '../logos/node.svg?react';
import DjangoLogo from '../logos/django.svg?react';
import RailsLogo from '../logos/rails.svg?react';
import GoLogo from '../logos/go.svg?react';
import { Meta } from '../types';

const NoOp = () => null;

const getMetaData = (meta: Meta) => {
  let frameworkName = '';
  let appVersion = meta.version;
  let stack = meta.stack;
  let cloudDependencies = meta.cloud_dependencies;
  let logo: FC = NoOp;

  switch (meta.framework) {
    case 'node':
      frameworkName = 'Node.JS';
      logo = NodeJsLogo;
      break;

    case 'django':
      frameworkName = 'Django';
      logo = DjangoLogo;
      break;

    case 'rails':
      frameworkName = 'Rails';
      logo = RailsLogo;
      break;

    case 'go':
      frameworkName = 'Go';
      logo = GoLogo;
      break;

    default:
      break;
  }

  return {
    framewrok: meta.framework,
    frameworkName,
    appVersion,
    stack,
    cloudDependencies,
    logo,
  };
};

export default getMetaData;
