import PropTypes from 'prop-types';

import Tooltip from '@mui/material/Tooltip';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import Iconify from 'src/components/iconify/iconify';
import { WebMethods } from 'src/config/Method';
import { setData } from 'src/redux/store';

// ----------------------------------------------------------------------

export default function SearchView({ handleSearch }) {

  const dispatch = WebMethods.GetReduxDispatch()
  const { searchText } = WebMethods.GetReduxStore()

  return (
        <OutlinedInput
          // value={searchText}
          onChange={({target}) => dispatch(setData({searchText : target.value}))}
          onKeyDown={handleSearch}
          placeholder="Search ..."
          style={{margin : '20px'}}
          startAdornment={
            <InputAdornment position="start">
              <Iconify
                icon="eva:search-fill"
                sx={{ color: 'text.disabled', width: 20, height: 20 }}
              />
            </InputAdornment>
          }
        />
  );
}

SearchView.propTypes = {
  handleSearch: PropTypes.func,
};
