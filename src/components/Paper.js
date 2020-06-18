import React from 'react';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import "./Paper.css"

class Paper extends React.Component {
  render() {
    return (
      <Card>
        <CardActionArea>
          <CardContent>
            <Typography variant="h4" align="center" display="block">{`Page ${this.props.page.number}`}</Typography>
            <br />
            <Typography variant="h6" align="center" display="block">{this.props.page.heading}</Typography>
            <br />
            <br />
            <Typography className='paper-content' variant="body1" align="justify" display="block">
              {this.props.page.content}
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions />
      </Card>
    );
  }
}

export default Paper