import React from 'react';
import { Container, Card, Avatar, TextField, CardActions, CardContent, Button } from '@material-ui/core';
import { Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles((theme) => ({
  root: {
    margin: 15,
    width: '100%'
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    margin: 7
  },
  container: {
    display: 'flex',
    alignItems: 'center',
  },
  titleField: {
    margin: 5,
    paddingLeft: 8,
    paddingTop: 5,
    paddingBottom: 5
  },
  bodyField: {
    marginTop: 5,
    marginBottom: 5,
    marginRight: 22,
    marginLeft: 5,
    padding: 5
  },
  sharePost: {
    width: '100%'
  },
  postButton: {
    marginLeft: '80%',
    marginBottom: 15
  },
  buttonGrid: {
    padding: 0
  }
}));

export const Share = () => {
  const classes = useStyles();

  return (
    <Container maxWidth="sm">
      <Grid
       container 
       spacing={20} 
       direction="column"
       alignItems="center"
       justify="center"
      >
        <Card className={classes.root}>
          <CardContent>
            <Grid container>
              <Grid item sm={1} className={classes.avatar}>
                <Avatar aria-label="recipe" className={classes.avatar}>
                  R
                </Avatar>
              </Grid>
              <Grid item sm={10} className={classes.titleField}>
                <TextField
                id="outlined-basic" 
                label="Title" 
                variant="outlined" 
                fullWidth="true"
                />
              </Grid>
              <Grid item sm={12} className={classes.bodyField}>
                <TextField
                id="outlined-multiline-static"
                label="Body"
                multiline
                rows={5}
                variant="outlined"
                fullWidth="true"
              />
              </Grid>
            </Grid>
          </CardContent>
          <CardActions disableSpacing className={classes.buttonGrid}>
            <Button
            variant="contained"
            color="primary"
            size="small"
            className={classes.postButton}
            >
              Post
            </Button>
          </CardActions>

          
          
          
          
          
        </Card>
      </Grid>
    </Container>
  )
  
}