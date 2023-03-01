import { AppBar, Box, Container, Typography, Button, Toolbar } from "@mui/material";
import {Link, useNavigate} from "react-router-dom";

export default function Navbar () {

    const navigate = useNavigate()

    return (/*
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static" color="transparent">
            <Container>
                <Toolbar>
                    <Typography variant="h6" sx={{ flexGrow: 1 }}>
                        <Link to ="/" style={{textDecoration:'none', color:'white'}}>Pagina Inicial</Link>
                    </Typography>

                    <Button variant='contained' color='primary' onClick={()=>navigate('/materiales/nuevo')}>
                            Nuevo Material
                    </Button>

                    <Button variant='contained' color='primary' onClick={()=>navigate('/trabajosrealizados/nuevo')}>
                            Nuevo Trabajo
                    </Button>
                    
                </Toolbar>
            </Container>
        </AppBar>
      </Box>
    )*/
    <></>)
  }
