import React from 'react';
import VpnKeyIcon from '@material-ui/icons/VpnKey';
import PersonPinIcon from '@material-ui/icons/PersonPin';
import CreditCardIcon from '@material-ui/icons/CreditCard';
import LocalShippingIcon from '@material-ui/icons/LocalShipping';
import {SideBarLayOut} from './SideBarLayOut';
import './SideBar.css';
export const SideBar = () => {
    return (
        <div className = "sidebar">
            <SideBarLayOut Icon = {PersonPinIcon} text = {`Manage Personal Information`}/>{/* We give the key(Icon) and the value(PersonPin..) + text with the text that will be showed  */}
            <SideBarLayOut Icon = {VpnKeyIcon} text = {`Manage Logging Details`}/>
            <SideBarLayOut  Icon = {CreditCardIcon} text = {`Manage Credit Card Information`}/>
            <SideBarLayOut Icon = {LocalShippingIcon} text = {`Manage Shipping Addresses`}/>
        </div>
    )
}