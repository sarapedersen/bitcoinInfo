import React, { useEffect, useState } from 'react'
import axios from 'axios'

const pageSize = 20

function Table() {
    const [info, setInfo] = useState()
    const [paginatedInfo, setPaginatedInfo] = useState()
    const [currentPage, setcurrentPage] = useState(1)

    useEffect(() => {
        axios.get('https://min-api.cryptocompare.com/data/v2/histoday?fsym=BTC&tsym=USD&limit=100&api_key=8ae55d463e1bf8d38b4a502ca47512f9b1dec21533ad9af7acb993e8ba952bc2')
            .then(res => {
                const data = res.data.Data.Data
                // console.log(data)
                setInfo(data)
                // setPaginatedInfo(data.slice(0).take(pageSize).value())
            })
    }, [])
    
    const pages = [1, 2, 3, 4, 5]

    return (
        <div>
            {!info ? ("nothing fetched") : (
                <table className="table">
                <thead>
                    <tr>
                        <th>Time</th>
                        <th>High</th>
                        <th>Low</th>
                        <th>Open</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        info.map((current, index) => (
                            <tr key={index}>
                                <td>{current.time}</td>
                                <td>{current.high}</td>
                                <td>{current.low}</td>
                                <td>{current.open}</td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
            )}
            <nav className="d-flex justify-content-center">
                <ul className="pagination">
                    <li className="page-link">1</li>
                    <li className="page-link">2</li>
                    <li className="page-link">3</li>
                    <li className="page-link">4</li>
                    <li className="page-link">5</li>
                </ul>
            </nav>
        </div>
    )
}

export default Table