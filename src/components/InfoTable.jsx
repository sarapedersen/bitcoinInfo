import React, { useEffect, useState } from 'react'
import axios from 'axios'
import _ from 'lodash'
import { Table } from "react-bootstrap"

const pageSize = 20

function InfoTable() {
    const [info, setInfo] = useState()
    const [paginatedInfo, setPaginatedInfo] = useState()
    const [currentPage, setcurrentPage] = useState(1)

    useEffect(() => {
        axios.get('https://min-api.cryptocompare.com/data/v2/histoday?fsym=BTC&tsym=USD&limit=100&api_key=8ae55d463e1bf8d38b4a502ca47512f9b1dec21533ad9af7acb993e8ba952bc2')
            .then(res => {
                const data = res.data.Data.Data
                // console.log(data)
                setInfo(data)
                setPaginatedInfo(_(data).slice(0).take(pageSize).value())
            })
    }, [])
    
    const pages = [1, 2, 3, 4, 5]

    function pagination(pageNo) {
        setcurrentPage(pageNo)
        const startIndex = (pageNo-1)*pageSize
        const paginatedInfo = _(info).slice(startIndex).take(pageSize).value()
        setPaginatedInfo(paginatedInfo)
    }

    return (
        <div className="w-50">
            {!paginatedInfo ? ("nothing fetched") : (
                <Table striped bordered className="min-w-max">
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>High</th>
                        <th>Low</th>
                        <th>Open</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        paginatedInfo.map((current, index) => (
                            <tr key={index}>
                                <td>{new Date(current.time*1000).toLocaleDateString("no-NO", {month: "long", day: "numeric", year: "numeric"})}</td>
                                <td>{current.high}</td>
                                <td>{current.low}</td>
                                <td>{current.open}</td>
                            </tr>
                        ))
                    }
                </tbody>
            </Table>
            )}
            <nav className="d-flex justify-content-center">
                <ul className="pagination">
                    {
                        pages.map((page) => (
                            <li key={page} className={
                                page === currentPage? "page-item active": "page-item"
                            }><p className="page-link btn" onClick={() => pagination(page)}>{page}</p></li>
                        ))
                    }
                </ul>
            </nav>
        </div>
    )
}

export default InfoTable