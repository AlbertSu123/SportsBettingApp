import React from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {
  faHome,
  faCog,
  faSearch,
  faClock,
  faUserCircle,
  faExchangeAlt
} from '@fortawesome/free-solid-svg-icons';

const icons = {
  Home: faHome,
  Search: faSearch,
  Play: faExchangeAlt,
  Planning: faClock,
  User: faUserCircle,
};

const Icon = ({name, color}) => {
  return (
    <FontAwesomeIcon icon={icons[name]} style={{color: color}} size={20} />
  );
};

export default Icon;