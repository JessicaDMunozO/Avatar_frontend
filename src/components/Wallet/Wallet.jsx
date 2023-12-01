import React from 'react'

import axios from 'axios'

import '../../components/Wallet/Wallet.css'
import '../../App.css'

import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

/**
 * Renders information about the user obtained from MS Graph
 * @param props 
 */
const Wallet = (props) => {
    const email = props.graphData.userPrincipalName
    const baseURL = "https://navi-cryptos.azurewebsites.net/db/user/" + email + "/balance"
    let data = ""

    // Stored request response
    const [post, setPost] = React.useState(null)

    // GET request
    React.useEffect(() => {
        let user = JSON.parse(sessionStorage.getItem('msal.token.keys.493fd410-634b-4cce-a120-fc0b5b5a0ff5'));
        let idTokenP=JSON.parse(sessionStorage.getItem(user.idToken));
        const token=idTokenP.secret
        axios.get(baseURL,{ headers: {"Authorization" : `Bearer ${token}`} }).then((response) => {
            data = response.data
            setPost(data)
        })
    }, [])

    if (!post) return null

    const cryptos = post[0].wallet.map((coin) => (
        <div className="cardCrypto">
        <p className="price">
          {coin.crypto}
        </p>
        <ul className="lists">
          <li className="list" key={coin.crypto+coin.unitPrice+'wallet'}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><g strokeWidth="0" id="SVGRepo_bgCarrier"></g><g strokeLinejoin="round" strokeLinecap="round" id="SVGRepo_tracerCarrier"></g><g id="SVGRepo_iconCarrier"> <path fill="#ffffff" d="M21.5821 5.54289C21.9726 5.93342 21.9726 6.56658 21.5821 6.95711L10.2526 18.2867C9.86452 18.6747 9.23627 18.6775 8.84475 18.293L2.29929 11.8644C1.90527 11.4774 1.89956 10.8443 2.28655 10.4503C2.67354 10.0562 3.30668 10.0505 3.70071 10.4375L9.53911 16.1717L20.1679 5.54289C20.5584 5.15237 21.1916 5.15237 21.5821 5.54289Z" clipRule="evenodd" fillRule="evenodd"></path> </g></svg>
              <span> <strong >Unit Price:</strong> {coin.unitPrice} </span>
          </li>
          <li className="list" key={coin.crypto+coin.amount+'walletAmount'}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><g strokeWidth="0" id="SVGRepo_bgCarrier"></g><g strokeLinejoin="round" strokeLinecap="round" id="SVGRepo_tracerCarrier"></g><g id="SVGRepo_iconCarrier"> <path fill="#ffffff" d="M21.5821 5.54289C21.9726 5.93342 21.9726 6.56658 21.5821 6.95711L10.2526 18.2867C9.86452 18.6747 9.23627 18.6775 8.84475 18.293L2.29929 11.8644C1.90527 11.4774 1.89956 10.8443 2.28655 10.4503C2.67354 10.0562 3.30668 10.0505 3.70071 10.4375L9.53911 16.1717L20.1679 5.54289C20.5584 5.15237 21.1916 5.15237 21.5821 5.54289Z" clipRule="evenodd" fillRule="evenodd"></path> </g></svg>
            <span> <strong>Amount:</strong> {coin.amount} </span>
          </li>
          <li className="list" key={coin.crypto+coin.value+'walletTotal'}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><g strokeWidth="0" id="SVGRepo_bgCarrier"></g><g strokeLinejoin="round" strokeLinecap="round" id="SVGRepo_tracerCarrier"></g><g id="SVGRepo_iconCarrier"> <path fill="#ffffff" d="M21.5821 5.54289C21.9726 5.93342 21.9726 6.56658 21.5821 6.95711L10.2526 18.2867C9.86452 18.6747 9.23627 18.6775 8.84475 18.293L2.29929 11.8644C1.90527 11.4774 1.89956 10.8443 2.28655 10.4503C2.67354 10.0562 3.30668 10.0505 3.70071 10.4375L9.53911 16.1717L20.1679 5.54289C20.5584 5.15237 21.1916 5.15237 21.5821 5.54289Z" clipRule="evenodd" fillRule="evenodd"></path> </g></svg>
            <span> <strong>Total crypto:</strong> {coin.value} </span>
          </li>
        </ul>
      </div>
    ))
    let resultCryptos=""
    if(cryptos.length>0){
       resultCryptos=<div >
        <div className='filter'>
        <div className="cardTotal">
                    <div className="titleWallet">
                        <span>
                            <svg width="20" fill="currentColor" height="20" viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg">
                                <path d="M1362 1185q0 153-99.5 263.5t-258.5 136.5v175q0 14-9 23t-23 9h-135q-13 0-22.5-9.5t-9.5-22.5v-175q-66-9-127.5-31t-101.5-44.5-74-48-46.5-37.5-17.5-18q-17-21-2-41l103-135q7-10 23-12 15-2 24 9l2 2q113 99 243 125 37 8 74 8 81 0 142.5-43t61.5-122q0-28-15-53t-33.5-42-58.5-37.5-66-32-80-32.5q-39-16-61.5-25t-61.5-26.5-62.5-31-56.5-35.5-53.5-42.5-43.5-49-35.5-58-21-66.5-8.5-78q0-138 98-242t255-134v-180q0-13 9.5-22.5t22.5-9.5h135q14 0 23 9t9 23v176q57 6 110.5 23t87 33.5 63.5 37.5 39 29 15 14q17 18 5 38l-81 146q-8 15-23 16-14 3-27-7-3-3-14.5-12t-39-26.5-58.5-32-74.5-26-85.5-11.5q-95 0-155 43t-60 111q0 26 8.5 48t29.5 41.5 39.5 33 56 31 60.5 27 70 27.5q53 20 81 31.5t76 35 75.5 42.5 62 50 53 63.5 31.5 76.5 13 94z">
                                </path>
                            </svg>
                        </span>
                        <p className="titleText">
                            Total
                        </p>
                    </div>
                    <div className="data">
                        <p>
                            {post[0].balance}
                        </p>
                        <div className="range">
                            <div className="fill">
                            </div>
                        </div>
                    </div>
            </div>
        </div>
          
            
            <div className="classCrypto">
                {cryptos}
            </div>
        </div>
    }else{
        resultCryptos=<div>
         
            <div className="cookieCard">
                <p className="cookieHeading">Oops</p>
                <p className="cookieDescription">You don´t have cryptos</p>
                <Link to="/buy" className="acceptButton">
                    Buy Cryptos
                </Link>
            </div>

        </div>
    }
    return (
        <div >
                {resultCryptos}
        </div> 
    )
}
Wallet.propTypes={
    graphData: PropTypes.shape({     
        userPrincipalName: PropTypes.string.isRequired}).isRequired

}
export default Wallet