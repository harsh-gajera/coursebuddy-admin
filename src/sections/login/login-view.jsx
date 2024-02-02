import axios from 'axios';
import React, { useRef, useState } from 'react';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import PropTypes from 'prop-types';
import IconButton from '@mui/material/IconButton';
import { alpha, useTheme } from '@mui/material/styles';
import InputAdornment from '@mui/material/InputAdornment';
import { useRouter } from 'src/routes/hooks';
import { bgGradient } from 'src/theme/css';
import Logo from 'src/components/logo';
import Iconify from 'src/components/iconify';
import { toast } from 'react-toastify';
import { Button } from '@mui/material';
import serverURL from 'src/config/Config';
import { WebMethods } from 'src/config/Method';
// ----------------------------------------------------------------------


const OtpInput = ({ value, onChange, onFocus, onBlur, ref }) => 
  (
    <TextField
      type="number"
      variant="outlined"
      value={value}
      onChange={onChange}
      onFocus={onFocus}
      onBlur={onBlur}
      inputProps={{ style: { textAlign: 'center', fontSize: '24px' } }}
      fullWidth
      inputRef={ref}
    />
  );

  OtpInput.propTypes = {
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    onFocus: PropTypes.func.isRequired,
    onBlur: PropTypes.func.isRequired,
    ref: PropTypes.object.isRequired,
  };

export default function LoginView() {
  const theme = useTheme();

  const [formData,setFromData] = useState({})

  const [showPassword, setShowPassword] = useState(false);
  const [disabledbutton,setDisabledbutton] = useState(false)

  const [page, setPage] = useState(0) // 0 - login, 1 - email, 2 - otp verify

  const handleSubmit = async (e) => {
    // e.preventDefault();
    try {
      setDisabledbutton(true)
      // Send POST request using Axios
      const response = await axios.post( `${serverURL}adminlogin`, formData);

      // WebMethods.SetLocalStorage('token', response.data.token)
      // WebMethods.SetLocalStorage('logindata', WebMethods.ConvertJsonString(response.data.data))
      WebMethods.SetSessionStorage('token', response.data.token, 120)
      WebMethods.SetSessionStorage('logindata', response.data.data, 120)
      toast.success(response.data.message)
      window.location.reload();
      setDisabledbutton(false)
    } catch (error) {
      console.error('Error submitting form:', error.response.data.message);
      toast.error(error.response.data.message)
      setDisabledbutton(false)
    }
  };

  const handleFormData = (e) => {
    setFromData({...formData,[e.target.name]: e.target.value })
  }

  const handlePasswordClick = (e) => {
    if(e.target.value.length && e.key === 'Enter'){
      handleSubmit()
    }
  }


  const [otp, setOtp] = useState(['', '', '', '']);
  const inputRefs = [useRef(), useRef(), useRef(), useRef()];


  const handleInputChange = (index, value) => {
    const newOtp = [...otp];
    newOtp[index] = value;

    // Move to the next input field if a digit is entered
    if (value.length === 1 && index < inputRefs.length - 1) {
      // console.log('wddw', inputRefs[index + 1].current)
      inputRefs[index + 1].current?.focus();
      // inputRefs[index + 1].current?.select();

      // setTimeout(() => {
      //   inputRefs[index + 1].current?.focus();
      // }, 10);
    }

    setOtp(newOtp);
  };

  const handleKeyDown = (index, event) => {
    // Move to the previous input field on backspace if the current field is empty
    if (event.key === 'Backspace' && index > 0 && event.currentTarget.value === '') {
      inputRefs[index - 1].current?.focus();
    }
  };
 

  const renderForm = (
    <>
    {
            page === 1 ?
            <>
              <Typography variant="h3" align='center' sx={{ mb: 4 }}>Log in</Typography>

              <Stack spacing={3}>
                <TextField name="email" label="Email address" onChange={handleFormData}/>

                <TextField
                  name="password"
                  label="Password"
                  type={showPassword ? 'text' : 'password'}
                  onChange={handleFormData}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                          <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              </Stack>

              <Stack direction="row" alignItems="center" justifyContent="flex-end" sx={{ my: 3 }}>
                <Link variant="subtitle2" underline="hover" onClick={()=> setPage(1)}>
                  Forgot password?
                </Link>
              </Stack>

              <Button
                fullWidth
                size="large"
                type="submit"
                variant="contained"
                color="inherit"
                onClick={handleSubmit}
              >
                Login
              </Button>
            </>
            :
            page === 2 ?
            <>
              <Typography variant="h3" align='center' sx={{ mb: 4 }}>Forgot Password</Typography>

              <Stack spacing={3}>
                <TextField name="email" label="Email address" onChange={()=>{}}/>
              </Stack>

              <Stack direction="row" alignItems="center" justifyContent="flex-end" sx={{ my: 3 }}>
                <Link variant="subtitle2" underline="hover" onClick={()=> setPage(0)}>
                  Log In
                </Link>
              </Stack>

              <Button
                fullWidth
                size="large"
                type="submit"
                variant="contained"
                color="inherit"
                // onClick={handleSubmit}
                onClick={()=> setPage(2)}
              >
                Send OTP
              </Button>
            </>
            :
            page === 3 ?
            <>
              <Typography variant="h3" align='center' sx={{ mb: 4 }}>OTP</Typography>

              <Stack direction="row" spacing={1} justifyContent="space-between" marginBottom={2}>
                {inputRefs.map((ref, index) => (
                  <TextField
                    key={index}
                    variant="outlined"
                    type="text"
                    inputProps={{ maxLength: 1, style: { textAlign: 'center' } }}
                    fullWidth
                    ref={ref}
                    value={otp[index]}
                    onChange={(e) => handleInputChange(index, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(index, e)}
                  />
                ))}
              </Stack>

              <Button
                fullWidth
                size="large"
                type="submit"
                variant="contained"
                color="inherit"
                // onClick={handleSubmit}
                style={{marginTop :'8px'}}
              >
                Verify OTP
              </Button>
            </>
            :
            <>
              <Typography variant="h3" align='center' sx={{ mb: 4 }}>Log in</Typography>

              <Stack spacing={3}>
                <TextField name="email" label="Email address" onChange={handleFormData}/>

                <TextField
                  name="password"
                  label="Password"
                  type={showPassword ? 'text' : 'password'}
                  onChange={handleFormData}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                          <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              </Stack>

              <Stack direction="row" alignItems="center" justifyContent="flex-end" sx={{ my: 3 }}>
                <Link variant="subtitle2" underline="hover" onClick={()=> setPage(1)}>
                  Forgot password?
                </Link>
              </Stack>

              <Button
                fullWidth
                size="large"
                type="submit"
                variant="contained"
                color="inherit"
                // onClick={handleSubmit}
              >
                Login
              </Button>
            </>
          }

      

      

      
      
{/* 
      <Typography variant="h3" align='center' sx={{ mb: 4 }}>Forgot Password</Typography>

      


      <Stack direction="row" alignItems="center" justifyContent="flex-end" sx={{ my: 3 }}>
        <Link variant="subtitle2" underline="hover">
          Log In
        </Link>
      </Stack> */}

      

     
    </>
  );

  return (
    <Box
      sx={{
        ...bgGradient({
          color: alpha(theme.palette.background.default, 0.9),
          imgUrl: '/assets/background/overlay_4.jpg',
        }),
        height: 1,
      }}
    >
      <Logo
        sx={{
          position: 'fixed',
          top: { xs: 16, md: 24 },
          left: { xs: 16, md: 24 },
        }}
      />

      <Stack alignItems="center" justifyContent="center" sx={{ height: 1 }}>
        <Card
          sx={{
            p: 5,
            width: 1,
            maxWidth: 420,
          }}
        >

        <Typography variant="h3" align='center' sx={{ mb: 4 }}>Log in</Typography>

        <Stack spacing={3}>
          <TextField name="email" label="Email address" onChange={handleFormData}/>

          <TextField
            name="password"
            label="Password"
            type={showPassword ? 'text' : 'password'}
            onChange={handleFormData}
            onKeyDown={handlePasswordClick}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                    <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </Stack>

        {/* <Stack direction="row" alignItems="center" justifyContent="flex-end" sx={{ my: 3 }}>
          <Link variant="subtitle2" underline="hover" onClick={()=> setPage(1)}>
            Forgot password?
          </Link>
        </Stack> */}

        <Button
          fullWidth
          size="large"
          type="submit"
          variant="contained"
          color="inherit"
          onClick={Object.keys(formData).length > 1 ? handleSubmit : () => toast.error('Please fill email and password fields.')}
          style={{marginTop : '24px'}}
          disabled={disabledbutton}
        >
          Login
        </Button>
          {/* {
            page === 1 ?
              <Typography variant="h3" align='center' sx={{ mb: 4 }}>Forgot Password</Typography> 
            :
            page === 2 ?
              <Typography variant="h3" align='center' sx={{ mb: 4 }}>OTP</Typography>
            :
              <Typography variant="h3" align='center' sx={{ mb: 4 }}>Log in</Typography>
          } */}

          {/* <Typography variant="body2" sx={{ mt: 2, mb: 5 }}>
            Don’t have an account?
            <Link variant="subtitle2" sx={{ ml: 0.5 }}>
              Get started
            </Link>
          </Typography>

          <Stack direction="row" spacing={2}>
            <Button
              fullWidth
              size="large"
              color="inherit"
              variant="outlined"
              sx={{ borderColor: alpha(theme.palette.grey[500], 0.16) }}
            >
              <Iconify icon="eva:google-fill" color="#DF3E30" />
            </Button>

            <Button
              fullWidth
              size="large"
              color="inherit"
              variant="outlined"
              sx={{ borderColor: alpha(theme.palette.grey[500], 0.16) }}
            >
              <Iconify icon="eva:facebook-fill" color="#1877F2" />
            </Button>

            <Button
              fullWidth
              size="large"
              color="inherit"
              variant="outlined"
              sx={{ borderColor: alpha(theme.palette.grey[500], 0.16) }}
            >
              <Iconify icon="eva:twitter-fill" color="#1C9CEA" />
            </Button>
          </Stack>

          <Divider sx={{ my: 3 }}>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              OR
            </Typography>
          </Divider> */}

          {/* {renderForm} */}
        </Card>
      </Stack>
    </Box>
  );
}
