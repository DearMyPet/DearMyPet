import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import Paper from '@mui/material/Paper';
import menu1 from '../../img/menu1.svg';
import menu2 from '../../img/menu2.svg';
import menu3 from '../../img/menu3.svg';
import menu4 from '../../img/menu4.svg';

const NavBottomBar = () => {
  const navigate = useNavigate();
  const [value, setValue] = React.useState(0);

  const handleNavigation = (path, index) => {
    setValue(index);
    navigate(path);
  };

  return (
    <Box sx={{ pb: 7 }}>
      <CssBaseline />
      <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} elevation={3}>
        <BottomNavigation
          showLabels
          value={value}
          onChange={(event, newValue) => {
            setValue(newValue);
          }}
          sx={{
            '& .Mui-selected': {
              color: 'black',
            },
          }}
        >
          <BottomNavigationAction
            label="진단"
            icon={<img src={menu1} />}
            // onClick={() => handleNavigation('/main', 0)}
          />
          <BottomNavigationAction
            label="일지"
            icon={<img src={menu2} />}
            onClick={() => handleNavigation('/logs', 1)}
          />
          <BottomNavigationAction
            label="마켓"
            icon={<img src={menu3} />}
            onClick={() => handleNavigation('/shop', 2)}
          />
          <BottomNavigationAction
            label="더보기"
            icon={<img src={menu4} />}
            onClick={() => handleNavigation('/mypage', 3)}
          />
        </BottomNavigation>
      </Paper>
    </Box>
  );
};

export default NavBottomBar;
