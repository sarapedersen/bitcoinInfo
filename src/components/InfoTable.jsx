import React, { useEffect, useState } from 'react'
import axios from 'axios'
import _ from 'lodash'
import cntl from 'cntl'
import Info from './Info'

const pageSize = 20

function InfoTable() {
    const [info, setInfo] = useState([])
    const [paginatedInfo, setPaginatedInfo] = useState()
    const [currentPage, setcurrentPage] = useState(1)
    const [loading, setLoading] = useState(true)
    const [errorMessage, seterrorMessage] = useState(false)

    useEffect(() => {
        axios.get('https://min-api.cryptocompare.com/data/v2/histoday?fsym=BTC&tsym=USD&limit=100&api_key=8ae55d463e1bf8d38b4a502ca47512f9b1dec21533ad9af7acb993e8ba952bc2')
            .then(res => {
                const data = res.data.Data.Data
                setInfo(data)
                pagination(currentPage)
                setLoading(false)
                seterrorMessage(false)
            })
            .catch (error => {
                setLoading(false)
                seterrorMessage(true)
            })
    }, [])

    const totalPages = Math.ceil(info.length/pageSize)
    const pages = new Array(totalPages).fill(0)


    async function pagination(pageNo) {
        setcurrentPage(pageNo)
        const startIndex = (pageNo - 1) * pageSize
        const paginatedInfo = _(info).slice(startIndex).take(pageSize).value()
        setPaginatedInfo(paginatedInfo)
    }

    if (loading === true) return <Info text="Loading..."/>
    if (errorMessage === true) return <Info text="En feil har oppstått"/>

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
                        pages.map((_, index) => (
                            <li key={index} className={
                                (index+1) === currentPage ? (`bg-orange-300 ${pagelinkCN}`) : `bg-gray-500 ${pagelinkCN}`}
                                onClick={() => pagination(index+1)}>{index+1}</li>
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