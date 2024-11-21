import {useState} from 'react'

const UseSideBar = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const handleClick = (index) => {
    setActiveIndex(index);
  };
  return { 
    activeIndex,
    handleClick,
    }
}

export default UseSideBar;