import {useState} from 'react'

const UseSideBar = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };


  const handleClick = (index) => {
    setActiveIndex(index);
    
    if (window.innerWidth <= 768) {
      toggleSidebar();
    }
  };
  return { 
    activeIndex,
    handleClick,
    isSidebarOpen,
    setIsSidebarOpen,
    toggleSidebar

    }
}

export default UseSideBar;