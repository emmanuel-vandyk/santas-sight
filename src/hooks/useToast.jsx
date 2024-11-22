import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ChristmasSanta} from '@/components/global/iconsChristmas';

export const christmasTheme = {
  success: {
    icon: ChristmasSanta,
    style: 'bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg border border-green-200 text-green-700',
  },
  error: {
    icon: ChristmasSanta,
    style: 'bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg border border-red-200 text-red-700',
  },
  info: {
    icon: ChristmasSanta,
    style: 'bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg border border-blue-200 text-blue-700',
  },
  warning: {
    icon: ChristmasSanta,
    style: 'bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg border border-yellow-200 text-yellow-700',
  },
};

export const useToast = () => {
  const createToast = (type, message) => {
    const { icon: Icon, style } = christmasTheme[type];
    const options = {
      className: `${style} rounded-lg shadow-lg`,
      bodyClassName: 'text-sm font-medium',
      progressClassName: `bg-${type === 'error' ? 'red' : 'green'}-500`,
      icon: <Icon className="w-8 h-8" />,
    };

    toast[type](message, options);
  };

  return {
    success: (message) => createToast('success', message),
    error: (message) => createToast('error', message),
    info: (message) => createToast('info', message),
    warning: (message) => createToast('warning', message),
  };
};
