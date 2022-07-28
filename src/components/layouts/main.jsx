import { useEffect, useMemo, useState } from 'react'
import logo from '../../assets/logox600.png'
import SearchContext from '../../contexts/SearchContext'
import Dialog from "../../components/dialog"


const MainLayout = ({ children }) => {
    const [showFilter, setShowFilter] = useState(false)
    const toggleFilter = () => setShowFilter(prev => !prev)

    const [showPublish, setShowPublish] = useState(false)

    const [dateFrom, setDateFrom] = useState('')
    const [dateTo, setDateTo] = useState('')
    const [searchQuery, setSearchQuery] = useState('')
    const isDateRangeActive = dateFrom && dateTo
    const searchParams = useMemo(() => ({dateFrom, dateTo, searchQuery}), [dateFrom, dateTo, searchQuery])

    const removeFilters = () => {
        setDateFrom('')
        setDateTo('')
        setSearchQuery('')
    }

    useEffect(() => {
        window.addEventListener('click', event => {   
            if (!document.getElementById('searchbox').contains(event.target)){
              setShowFilter(false)
            }
        })
    })

    const classes = {
        searchBox: `shadow focus-within:shadow-lg border w-3/4 rounded-lg bg-white ${showFilter ? 'absolute pb-1' : 'relative'}`,
        searchInput: `flex py-1 px-2 ${showFilter && 'border-b border-gray-200'}`,
        filterBtn: `rounded-lg text-sm font-medium py-2 px-4 border border-gray-300 ${isDateRangeActive ? 'bg-blue-600 text-white' : 'text-gray-700'}`,
        datePicker: 'border border-gray-300 p-1 rounded ml-3'
    }

    return (
        <div className="w-screen h-screen bg-white/60 overflow-y-scroll flex flex-col">
            <div className="py-5 sticky top-0 flex items-start px-10 z-20">
                <div className="flex-1" onMouse>
                    <img style={{width: 200}} src={logo} alt="Ghibli Studios" className="" />
                </div>
                <div className="flex-1 flex justify-center relative" id="searchbox">
                    <div className={classes.searchBox}>
                        <div className={classes.searchInput}>
                            <input type="search" placeholder="Search films by author, director" className="flex-grow rounded-l-lg outline-none"
                                    onChange={e => setSearchQuery(e.target.value)} value={searchQuery} />
                            <div className="px-1 self-center">
                                <button onClick={toggleFilter} className={classes.filterBtn}>
                                    {isDateRangeActive ? 'Filtering by date' : 'Select date'}
                                </button>
                            </div>
                            <button className="p-1 cursor-pointer" onClick={removeFilters}>
                                <i className="bx bx-x text-gray-400 text-xl align-middle" />
                            </button>
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
                                        <br />
                                        <input type="date" min={searchQuery.dateFrom} onChange={e => setDateTo(e.target.value)}
                                            value={dateTo} className={classes.datePicker} />
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
                <div className="flex-1 flex justify-end">
                    <button onClick={() => setShowPublish(true)} className="bg-blue-700 text-white text-sm font-bold rounded px-5 py-2">Publish</button>
                </div>
            </div>
            <div className="p-10 flex-1">
                <SearchContext.Provider value={searchParams}>
                    {children}
                </SearchContext.Provider>
            </div>
            <Dialog open={showPublish} width={500}>
                <div className="flex">
                    <div className="text-lg font-bold text-gray-700 flex-grow">Add new film</div>
                    <button className="cursor-pointer" onClick={() => setShowPublish(false)}>
                        <i className="bx bx-x self-center text-gray-400 text-xl" />
                    </button>
                </div>
                <div className="mt-5 border-2 border-gray-200 flex h-20 rounded-lg">
                    asdasd
                </div>
            </Dialog>
        </div>
    )
}

export default MainLayout
