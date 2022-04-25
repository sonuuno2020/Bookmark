import { useCallback, useEffect, useState } from 'react';

const useContextMenu = (id) => {
  const [state, setState] = useState({
    xPos: '0px',
    yPos: '0px',
    showMenu: false,
  })
  const { xPos, yPos, showMenu } = state;

  const handleContextMenu = useCallback((e) => {
    // console.log(e)
    e.preventDefault();
    setState({
      xPos: `${e.clientX}px`,
      yPos: `${e.clientY}px`,
      showMenu: true,
    })
  }, []);

  const handleClick = useCallback((e) => {
    // console.log(e)
    showMenu && setState(s => {
      return { ...s, showMenu: false }
    });
  }, [showMenu]);

  useEffect(() => {
    const element = document.getElementById(id);
    element.addEventListener("contextmenu", handleContextMenu);
    return () => {
      element.removeEventListener("contextmenu", handleContextMenu);
    };
  }, [handleContextMenu, id]);

  useEffect(() => {
    document.addEventListener("click", handleClick);
    document.addEventListener("contextmenu", handleClick);
    return () => {
      document.removeEventListener("click", handleClick);
      document.removeEventListener("contextmenu", handleClick);
    };
  }, [handleClick]);

  useEffect(() => {
    // console.log(showMenu)
    let flag = true;
    const handleScroll = () => {
      flag = showMenu && flag ? true : false;
      if (flag) {
        setState(s => ({ ...s, showMenu: false }));
        flag = false;
      }
    }
    document.addEventListener("scroll", handleScroll);
    return () => {
      document.removeEventListener("scoll", handleScroll);
    };
  }, [showMenu]);

  return { xPos, yPos, showMenu };
};

export default useContextMenu;