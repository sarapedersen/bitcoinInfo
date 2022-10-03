import React, { useEffect, useState } from 'react'
import axios from 'axios'
import _ from 'lodash'
import cntl from 'cntl'

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
        const startIndex = (pageNo - 1) * pageSize
        const paginatedInfo = _(info).slice(startIndex).take(pageSize).value()
        setPaginatedInfo(paginatedInfo)
    }

    return (
        <div className="flex flex-col mt-8 mx-auto">
            {!paginatedInfo ? ("nothing fetched") : (
                <table className="min-w-fit divide-y divide-gray-200 border">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className={headingCN}>Date</th>
                            <th className={headingCN}>High</th>
                            <th className={headingCN}>Low</th>
                            <th className={headingCN}>Open</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {
                            paginatedInfo.map((current, index) => (
                                <tr key={index}>
                                    <td className={dataCN}>{new Date(current.time * 1000).toLocaleDateString("no-NO", { month: "long", day: "numeric", year: "numeric" })}</td>
                                    <td className={dataCN}>$ {current.high}</td>
                                    <td className={dataCN}>$ {current.low}</td>
                                    <td className={dataCN}>$ {current.open}</td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            )}
            <nav className="m-auto">
                <ul className="flex m-4">
                    {
                        pages.map((page) => (
                            <li key={page} className={
                                page === currentPage ? (`bg-orange-300 ${pagelinkCN}`) : `bg-gray-500 ${pagelinkCN}`}
                                onClick={() => pagination(page)}>{page}</li>
                        ))
                    }
                </ul>
            </nav>
        </div>
    )
}

const headingCN = cntl`
    px-10
    py-2 
    text-xs 
    font-bold 
    text-gray-500
    `

const dataCN = cntl`
    px-10
    py-2
    text-xs
    text-left
    text-gray-800
    `

const pagelinkCN = cntl`
    text-white
    px-4
    py-2 
    mx-1 
    rounded-full
    cursor-pointer
    text-sm
    `
export default InfoTable