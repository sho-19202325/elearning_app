import React, { Component } from 'react'
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import DeleteIcon from '@material-ui/icons/Delete';

class DeleteConfirmation extends Component {
    constructor(props) {
        super(props)
        this.handleOpen = this.handleOpen.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.state = {
            open : false,
        }
    }

    handleOpen() {
        this.setState({open: !this.state.open})
    }

    handleDelete() {
        this.props.deleteMethod(this.props.deleteTarget.id);
        this.setState({open: false});
    }

    render() { 
        const target = [];
        if(this.props.deleteTarget !== undefined) {
            for(let i=0;i<this.props.confirmationContent.length;i++){
                target.push(
                    <DialogContentText key={i}>{this.props.confirmationContent[i]}: {this.props.deleteTarget[this.props.confirmationContent[i]]}</DialogContentText>
                );
            }
        }
        return ( 
            <div className="col-md-4">
                <IconButton color="inherit" onClick={this.handleOpen}>
                    <DeleteIcon />
                </IconButton>
                <Dialog
                    open={this.state.open}
                    onClose={this.handleOpen}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">{"Are you sure to delete this question list?"}</DialogTitle>
                    <DialogContent>
                        {target}
                    </DialogContent>
                    <DialogActions>
                    <Button onClick={this.handleOpen} color="primary">
                        Disagree
                    </Button>
                    <Button onClick={this.handleDelete} color="primary" autoFocus>
                        Agree
                    </Button>
                    </DialogActions>
                </Dialog>
            </div>            
         );
    }
}
 
export default DeleteConfirmation;