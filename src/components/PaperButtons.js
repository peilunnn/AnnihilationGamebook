import React from 'react';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';

class PaperButtons extends React.Component {
  render() {
    return (
      <div>
        <ButtonGroup
          orientation="vertical"
          fullWidth="true"
          color="primary"
          aria-label="vertical outlined primary button group"
        >
          {this.props.choices.map((c) => <Button
            onClick={((e) => this.props.handler(e))}>{`${c.text} → ${c.link}`}
          </Button>)}
        </ButtonGroup>
      </div>
    );
  }
}


export default PaperButtons