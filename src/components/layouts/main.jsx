import { createContext, useEffect, useState } from 'react'
import logo from '../../assets/logox600.png'

export const LayoutContext = createContext(null)

const MainLayout = ({ children }) => {
    const [showFilter, setShowFilter] = useState(false)
    const toggleFilter = () => setShowFilter(prev => !prev)

    const [dateFrom, setDateFrom] = useState('1984-03-11')
    const [dateTo, setDateTo] = useState('1984-03-11')
    const [searchQuery, setSearchQuery] = useState('')
    const searchValues = () => {
        return { dateFrom, dateTo, searchQuery }
    }

    const classes = {
        searchBox: `shadow focus-within:shadow-lg border w-1/2 rounded-lg bg-white ${showFilter ? 'absolute pb-1' : 'relative'}`,
        searchInput: `flex py-1 px-2 ${showFilter && 'border-b border-gray-200'}`,
        filterBtn: 'bg-gray-300 rounded-lg text-gray-700 text-sm font-medium py-2 px-4',
        datePicker: 'border border-gray-300 p-1 rounded ml-3'
    }

    return (
        <LayoutContext.Provider value={searchValues}>
            <div className="w-screen h-screen bg-white/60 overflow-y-scroll flex flex-col">
                <div className="py-5 sticky top-0 flex items-start px-10 z-20">
                    <div className="flex-1">
                        <img style={{width: 200}} src={logo} alt="Ghibli Studios" className="" />
                    </div>
                    <div className="flex-1 flex justify-center relative">
                        <div className={classes.searchBox}>
                            <div className={classes.searchInput}>
                                <input type="search" placeholder="Search films by author, director" className="flex-grow rounded-l-lg outline-none"
                                        onChange={e => setSearchQuery(e.target.value)} value={searchQuery} />
                                <div className="ml-1 self-center">
                                    <button onClick={toggleFilter} className={classes.filterBtn}>Filter by</button>
                                </div>
                            </div>
                            {showFilter && (
                                <div className="bg-white w-full p-3 text-gray-700">
                                    <div className="font-bold mb-2">Release date</div>
                                    <div className="flex items-center">
                                        <div>
                                            <div className="py-1 mb-1">From</div>
                                            <div className="py-1">To</div>
                                        </div>
                                        <div>
                                            <input type="date" min="1984-03-11" onChange={e => setDateFrom(e.target.value)}
                                                value={dateFrom} className={`${classes.datePicker} ml-3`} />

                                            <input type="date" min={searchQuery.dateFrom} onChange={e => setDateTo(e.target.value)}
                                                value={dateTo} className={classes.datePicker} />
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                    <div className="flex-1 flex justify-end">
                        <button className="bg-blue-700 text-white text-sm font-bold rounded px-5 py-2">Publish</button>
                    </div>
                </div>
                <div className="p-10 flex-1">
                    {children}
                </div>
            </div>
        </LayoutContext.Provider>
    )
}

export default MainLayout
