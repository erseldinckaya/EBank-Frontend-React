import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import Grid from '@mui/material/Grid';

function Creditcard(props) {
  

  return (
    <ThemeProvider>
      <Card onClick={() => {props.setAccountId(props.id)}}  style={{background: 'linear-gradient(to right top, #000000, #3d303f, #59678d, #41aad7, #00f3ff)', color: "white"}}>
        <CardActionArea>
          <CardContent>
            {/* <Typography variant="subtitle">
              Current Balance
            </Typography> */}

            <Typography sx={{ mt: 1 }} variant="h4">
              {"$ " + props.balance}
            </Typography>

            <Typography style={{flex:1, fontWeight:"bold"}} sx={{ mt: 5 }} variant="p">
              {props.firstname + " " + props.lastname}
            </Typography>


            <Grid container xs={12} sx={{ mt: 8 }}>
              <Grid container xs={12} justifyContent="space-between">
                <Typography inline>
                  {' '}
                  <svg height="24" viewBox="0 0 36 24" width="36" xmlns="http://www.w3.org/2000/svg">
                    <g fill="none" transform="translate(.5 1)">
                      <path d="m12.069 2.27h10.21v16.68h-10.21z" fill="#f26122" />
                      <path
                        d="m13.1686965 10.6101654c-.0168648-3.24646572 1.4577071-6.32094812 4-8.34000002-4.3497486-3.42070515-10.59805198-2.92397993-14.35270599 1.1410059-3.75465401 4.06498583-3.75465401 10.33300232 0 14.39798822 3.75465401 4.0649858 10.00295739 4.561711 14.35270599 1.1410059-2.5422929-2.0190519-4.0168648-5.0935343-4-8.34z"
                        fill="#ea1d25"
                      />
                      <path
                        d="m34.3286965 10.6101654c-.0026131 4.0593442-2.321149 7.7613981-5.9721329 9.5358273s-7.9944021 1.3101783-11.1878671-1.1958273c4.600057-3.6220434 5.3966531-10.28570388 1.78-14.89000002-.5184495-.66672993-1.116185-1.26782352-1.78-1.79 3.193465-2.50600559 7.5368832-2.97025656 11.1878671-1.19582732s5.9695198 5.47648307 5.9721329 9.53582734z"
                        fill="#f69e1e"
                      />
                    </g>
                  </svg>
                </Typography>
                <Typography inline align="right">
                  {props.number}
                </Typography>
              </Grid>
            </Grid>
          </CardContent>
        </CardActionArea>
      </Card>
    </ThemeProvider>
  );
}

export default Creditcard;
