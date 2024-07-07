import { useEffect, useState } from 'react';
import {
  Navbar,
  Collapse,
  Typography,
  IconButton,
} from '@material-tailwind/react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBars,
  faRightFromBracket,
  faXmark,
} from '@fortawesome/free-solid-svg-icons';
import ModalSettings from '../Settings/ModalSettings';

const NavList = () => {
  return (
    <ul className="my-2 flex items-end flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
      <Typography
        as="li"
        className="p-1 font-medium"
        color="blue-gray"
        variant="small"
      >
        <ModalSettings />
      </Typography>
      <Typography
        as="li"
        className="p-1 font-medium"
        color="blue-gray"
        variant="small"
      >
        <Link
          className="flex items-center hover:text-blue-500 transition-colors"
          to="/account"
        >
          <FontAwesomeIcon icon={faRightFromBracket} />
        </Link>
      </Typography>
    </ul>
  );
};

export const NavbarSimple = () => {
  const [openNav, setOpenNav] = useState(false);

  const handleWindowResize = () =>
    window.innerWidth >= 960 && setOpenNav(false);

  useEffect(() => {
    window.addEventListener('resize', handleWindowResize);

    return () => {
      window.removeEventListener('resize', handleWindowResize);
    };
  }, []);

  return (
    <Navbar className="mx-auto max-w-screen-xl px-6 py-3 mb-4">
      <div className="flex items-center justify-between text-blue-gray-900">
        <div className="flex">
          <Typography
            as={Link}
            className="mr-4 cursor-pointer py-1.5"
            to="/"
            variant="h6"
          >
            MyFree
          </Typography>
          <Typography className="border-black border-l-2 px-4 cursor-pointer py-1.5">
            Joe Doe
          </Typography>
        </div>
        <div className="hidden lg:block">
          <NavList />
        </div>
        <IconButton
          className="ml-auto h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
          onClick={() => setOpenNav(!openNav)}
          variant="text"
        >
          {openNav ? (
            <FontAwesomeIcon icon={faXmark} />
          ) : (
            <FontAwesomeIcon icon={faBars} />
          )}
        </IconButton>
      </div>
      <Collapse open={openNav}>
        <NavList />
      </Collapse>
    </Navbar>
  );
};
