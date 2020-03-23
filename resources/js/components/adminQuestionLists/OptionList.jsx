import React, { Component } from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';

class OptionList extends Component {
    render() {

        if(this.props.options != undefined && this.props.options[0] != undefined){
            return ( 
                <List>
                    <ListItem key={1} dense button className="py-3">
                        1: {this.props.options[0].content}
                    </ListItem>
                    <Divider/>
                    <ListItem key={2} dense button className="py-3">
                        2: {this.props.options[1].content}
                    </ListItem>
                    <Divider/>
                    <ListItem key={3} dense button className="py-3">
                        3: {this.props.options[2].content}
                    </ListItem>
                </List>
            );
        } else {
            return <div></div>;
        }
    }
}
 
export default OptionList;