import React, { useEffect } from 'react';
import { Container, Button } from '@material-ui/core';
import { Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import "./post.css";

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
    backgroundColor: red[500],
  },
  container: {
    display: 'flex',
    alignItems: 'center',
  },
  tipButton: {
    marginRight: 0,
    
  }
}));

export const Post = ({ tipPost, posts, setPosts }) => {
  const classes = useStyles();
  useEffect(() => {
    setPosts(posts.sort((a,b) => b.tipAmount - a.tipAmount))
  }, [posts, setPosts])
  return (
    <Container maxWidth="sm">
      <Grid
       container 
       spacing={20} 
       direction="column"
       alignItems="center"
       justify="center"
      >
        {posts.map((post, key) => {
          return (
            <Card className={classes.root} key={key}>
              <CardHeader
                avatar={
                  <Avatar aria-label="recipe" className={classes.avatar}>
                    {post.author.slice(0,3)}
                  </Avatar>
                }
                action={
                  <IconButton aria-label="settings">
                    <MoreVertIcon />
                  </IconButton>
                }
                title={post.title}
              />
              <CardContent>
                <Typography variant="body2" color="textSecondary" component="p">
                  {post.body}
                </Typography>
              </CardContent>
              <CardActions disableSpacing>
                <Grid container>
                  <Grid item xs={9}>
                    <Typography variant="body2" color="textSecondary" component="p">
                      TIPS: {window.web3.utils.fromWei(post.tipAmount.toString(), 'Ether')} ETH
                    </Typography>
                  </Grid>
                  <Grid item xs={3}>
                    <Button 
                      className={classes.tipButton}
                      variant="contained" 
                      color="primary" 
                      onClick={(e) => {
                        let tipAmount = window.web3.utils.toWei('0.1', 'Ether');
                        console.log(post.id);
                        tipPost(post.id, tipAmount);
                      }}
                    >
                      TIP: 0.1 ETH
                    </Button>
                  </Grid>
                </Grid>
              </CardActions>
            </Card>
          )
        })}
        
      </Grid>
    </Container>
  )
  
}