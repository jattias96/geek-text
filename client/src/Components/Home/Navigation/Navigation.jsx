import React from 'react'
import ShoppingCartOutlinedIcon from '@material-ui/icons/ShoppingCartOutlined';
import Logo from '../../../Assets/geek-text-logo.png'
import './Navigation.css'
import { Link } from 'react-router-dom'

export const Navigation = () => {
    return (
        <div className="nav">

            <div className=".nav-left">
                <Link to="/" className="Router_Link">
                    <img class="resize" src={Logo} alt="logo" />
                    <h1 className="inlineheader">Geek-Text</h1>
                </Link>
            </div>

            <div className="nav-right">
            <Link to="/" className="Router_Link">
                <div className="nav-right-booklist nav-link">
                <Link to ="/browse" className = "Router_Link">
                    <h4 className="links">View Books</h4>
                    </Link>
                </div>

                </Link>
                <div className="nav-right-auth nav-link">
                    <Link to="/auth" className="Router_Link">
                        <h4 className="links">Sign-up/Sign-in</h4>
                    </Link>
                </div>

                <div className="nav-right-addBook nav-link">
                    <h4 className="links">Add New Book</h4>
                </div>

                <div className="nav-right-cart nav-link">
                    <Link to="/cart" className="Router_Link">
                        <ShoppingCartOutlinedIcon fontSize="small" />
                    </Link>
                </div>
            </div>
        </div>
    )
}