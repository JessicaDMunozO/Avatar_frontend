import React from 'react'

import axios from 'axios'

import '../../components/BuyCrypto/BuyCrypto.css'

import { useState } from 'react'
import { Link } from 'react-router-dom'

/**
 * Renders information about the user obtained from MS Graph
 * @param props 
 */
const BuyCrypto = (props) => {
    const baseURL = "http://localhost:4444/db/offers"
    let data = ""

    // Stored request response
    const [post, setPost] = React.useState(null)

    // GET request
    React.useEffect(() => {
        axios.get(baseURL).then((response) => {
            data = response.data
            setPost(data)
        })
    }, [])

    // Store state of the input
    const [search, setSearch] = useState('')

    const handleChange = (e) => {
        setSearch(e.target.value)
    }

    if (!post) return null

    let email = props.graphData.userPrincipalName

    let seller = ""
    let price = ""
    let crypto = ""
    let amount = ""

    // Input to filter offers
    const filterOffer =
        <div class="group">
            <svg class="icon" aria-hidden="true" viewBox="0 0 24 24">
                <g>
                    <path d="M21.53 20.47l-3.66-3.66C19.195 15.24 20 13.214 20 11c0-4.97-4.03-9-9-9s-9 4.03-9 9 4.03 9 9 9c2.215 0 4.24-.804 5.808-2.13l3.66 3.66c.147.146.34.22.53.22s.385-.073.53-.22c.295-.293.295-.767.002-1.06zM3.5 11c0-4.135 3.365-7.5 7.5-7.5s7.5 3.365 7.5 7.5-3.365 7.5-7.5 7.5-7.5-3.365-7.5-7.5z"></path>
                </g>
            </svg>
            <input placeholder="Seller / Crypto" type="search" value={search} onChange={handleChange} class="input" />
        </div>

    // Filtered offers depending the input
    let filterOffers = post.filter((offer) => offer.seller !== email).filter((offer) => offer.seller.toUpperCase().includes(search.toUpperCase()) || offer.cryptocurrency.toUpperCase().includes(search.toUpperCase())).map((filteredOffer) => (
        seller = filteredOffer.seller,
        price = filteredOffer.Price,
        crypto = filteredOffer.cryptocurrency,
        amount = filteredOffer.amount,

        <div class="cardOffer">
            <p class="seller">
                <span><strong >Seller: </strong> {seller} </span>
            </p>
            <ul class="lists">
                <li class="list">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><g stroke-width="0" id="SVGRepo_bgCarrier"></g><g stroke-linejoin="round" stroke-linecap="round" id="SVGRepo_tracerCarrier"></g><g id="SVGRepo_iconCarrier"> <path fill="#ffffff" d="M21.5821 5.54289C21.9726 5.93342 21.9726 6.56658 21.5821 6.95711L10.2526 18.2867C9.86452 18.6747 9.23627 18.6775 8.84475 18.293L2.29929 11.8644C1.90527 11.4774 1.89956 10.8443 2.28655 10.4503C2.67354 10.0562 3.30668 10.0505 3.70071 10.4375L9.53911 16.1717L20.1679 5.54289C20.5584 5.15237 21.1916 5.15237 21.5821 5.54289Z" clip-rule="evenodd" fill-rule="evenodd"></path> </g></svg>
                    <span><strong >Crypto: </strong> {crypto} </span>
                </li>
                <li class="list">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><g stroke-width="0" id="SVGRepo_bgCarrier"></g><g stroke-linejoin="round" stroke-linecap="round" id="SVGRepo_tracerCarrier"></g><g id="SVGRepo_iconCarrier"> <path fill="#ffffff" d="M21.5821 5.54289C21.9726 5.93342 21.9726 6.56658 21.5821 6.95711L10.2526 18.2867C9.86452 18.6747 9.23627 18.6775 8.84475 18.293L2.29929 11.8644C1.90527 11.4774 1.89956 10.8443 2.28655 10.4503C2.67354 10.0562 3.30668 10.0505 3.70071 10.4375L9.53911 16.1717L20.1679 5.54289C20.5584 5.15237 21.1916 5.15237 21.5821 5.54289Z" clip-rule="evenodd" fill-rule="evenodd"></path> </g></svg>
                    <span><strong >Amount: </strong> {amount} </span>
                </li>
                <li class="list">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><g stroke-width="0" id="SVGRepo_bgCarrier"></g><g stroke-linejoin="round" stroke-linecap="round" id="SVGRepo_tracerCarrier"></g><g id="SVGRepo_iconCarrier"> <path fill="#ffffff" d="M21.5821 5.54289C21.9726 5.93342 21.9726 6.56658 21.5821 6.95711L10.2526 18.2867C9.86452 18.6747 9.23627 18.6775 8.84475 18.293L2.29929 11.8644C1.90527 11.4774 1.89956 10.8443 2.28655 10.4503C2.67354 10.0562 3.30668 10.0505 3.70071 10.4375L9.53911 16.1717L20.1679 5.54289C20.5584 5.15237 21.1916 5.15237 21.5821 5.54289Z" clip-rule="evenodd" fill-rule="evenodd"></path> </g></svg>
                    <span><strong >Price: </strong> {price} </span>
                </li>
            </ul>
            <Link to="/payments" class="action">
                Buy
            </Link>
        </div >
    ))

    return (
        <div>
            <div class="filter">
                {filterOffer}
            </div>
            <div class="class-Buycrypto">
                {filterOffers}
            </div>
        </div>
    )
}

export default BuyCrypto